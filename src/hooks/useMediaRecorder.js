import { useState, useRef, useCallback, useEffect } from 'react';
import { getSessionId } from '../utils/session';

/**
 * Ghi màn hình cùng âm thanh web và microphone vào một file WebM.
 */
export function useMediaRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [permissionError, setPermissionError] = useState(null);
  const [mediaAccessLost, setMediaAccessLost] = useState(false);
  const [hasMediaAccess, setHasMediaAccess] = useState(false);

  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const streamRef = useRef(null);
  const sourceStreamsRef = useRef([]);
  const audioContextRef = useRef(null);
  const timerRef = useRef(null);
  const activeRecordingRef = useRef(false);
  const downloadTriggeredRef = useRef(false);
  const trackEndedHandlerRef = useRef(null);

  const downloadBlob = useCallback((blob, filename) => {
    if (!blob || blob.size === 0) return false;

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.style.display = 'none';
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
  }, []);

  useEffect(() => {
    if (isRecording) {
      setRecordingSeconds(0);
      timerRef.current = setInterval(() => {
        setRecordingSeconds(previous => previous + 1);
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isRecording]);

  const stopTracks = useCallback(() => {
    streamRef.current?.getTracks().forEach(track => track.stop());
    sourceStreamsRef.current.forEach(stream => {
      stream.getTracks().forEach(track => track.stop());
    });
    streamRef.current = null;
    sourceStreamsRef.current = [];

    if (audioContextRef.current) {
      void audioContextRef.current.close();
      audioContextRef.current = null;
    }
  }, []);

  const downloadRecording = useCallback(() => {
    if (downloadTriggeredRef.current || recordedChunksRef.current.length === 0) return false;

    downloadTriggeredRef.current = true;
    const recording = new Blob(recordedChunksRef.current, { type: 'video/webm' });
    return downloadBlob(recording, 'kyniem.webm');
  }, [downloadBlob]);

  const finishRecording = useCallback(async () => {
    const recorder = mediaRecorderRef.current;
    if (!recorder && recordedChunksRef.current.length === 0) return false;

    let stopped = Promise.resolve();
    if (recorder && recorder.state !== 'inactive') {
      stopped = new Promise(resolve => {
        const previousOnStop = recorder.onstop;
        recorder.onstop = event => {
          previousOnStop?.(event);
          resolve();
        };
        recorder.stop();
      });
    }

    activeRecordingRef.current = false;
    setHasMediaAccess(false);
    stopTracks();
    setIsRecording(false);
    await stopped;

    const recording = new Blob(recordedChunksRef.current, { type: 'video/webm' });
    const formData = new FormData();
    formData.append('video', recording, 'kyniem.webm');
    formData.append('sessionId', getSessionId());

    try {
      const response = await fetch('/api/recordings', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Upload video thất bại');
    } catch (error) {
      console.warn('Không thể gửi video lên server:', error);
    }

    if (!downloadTriggeredRef.current) {
      downloadTriggeredRef.current = true;
      downloadBlob(recording, 'kyniem.webm');
    }
    return recording.size > 0;
  }, [downloadBlob, stopTracks]);

  const stopRecording = useCallback(() => {
    activeRecordingRef.current = false;
    setHasMediaAccess(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    stopTracks();
    setIsRecording(false);
  }, [stopTracks]);

  const getSupportedMimeType = types => (
    types.find(type => MediaRecorder.isTypeSupported(type)) || ''
  );

  const startRecording = useCallback(async () => {
    setPermissionError(null);
    setMediaAccessLost(false);
    setHasMediaAccess(false);
    recordedChunksRef.current = [];
    downloadTriggeredRef.current = false;

    try {
      if (!navigator.mediaDevices?.getDisplayMedia || !navigator.mediaDevices?.getUserMedia) {
        throw new Error('Trình duyệt của bạn chưa hỗ trợ quay màn hình và thu âm microphone.');
      }

      let microphoneStream;
      try {
        microphoneStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      } catch {
        throw new Error('Không thể truy cập microphone. Vui lòng cấp quyền microphone rồi thử lại.');
      }

      let displayStream;
      try {
        displayStream = await navigator.mediaDevices.getDisplayMedia({
          video: { cursor: 'always' },
          audio: true,
        });
      } catch (error) {
        microphoneStream.getTracks().forEach(track => track.stop());
        throw error;
      }
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) {
        displayStream.getTracks().forEach(track => track.stop());
        microphoneStream.getTracks().forEach(track => track.stop());
        throw new Error('Trình duyệt không hỗ trợ trộn âm thanh để ghi kỷ niệm.');
      }

      const audioContext = new AudioContextClass();
      const audioDestination = audioContext.createMediaStreamDestination();
      const microphoneSource = audioContext.createMediaStreamSource(microphoneStream);
      microphoneSource.connect(audioDestination);

      if (displayStream.getAudioTracks().length > 0) {
        const displayAudioStream = new MediaStream(displayStream.getAudioTracks());
        const displaySource = audioContext.createMediaStreamSource(displayAudioStream);
        displaySource.connect(audioDestination);
      }

      await audioContext.resume();
      audioContextRef.current = audioContext;
      sourceStreamsRef.current = [displayStream, microphoneStream];
      streamRef.current = new MediaStream([
        ...displayStream.getVideoTracks(),
        ...audioDestination.stream.getAudioTracks(),
      ]);

      trackEndedHandlerRef.current = () => {
        if (!activeRecordingRef.current) return;
        setMediaAccessLost(true);
        setPermissionError('Quyền quay màn hình hoặc microphone đã bị tắt. Vui lòng cấp lại cả hai quyền.');
        stopRecording();
      };
      [...displayStream.getTracks(), ...microphoneStream.getTracks()].forEach(track => {
        track.onended = () => trackEndedHandlerRef.current?.();
      });

      const mimeType = getSupportedMimeType([
        'video/webm;codecs=vp9,opus',
        'video/webm;codecs=vp8,opus',
        'video/webm',
      ]);
      const recorder = new MediaRecorder(
        streamRef.current,
        mimeType ? { mimeType } : undefined,
      );
      recorder.ondataavailable = event => {
        if (event.data?.size > 0) recordedChunksRef.current.push(event.data);
      };
      mediaRecorderRef.current = recorder;
      recorder.start(250);
      activeRecordingRef.current = true;
      setHasMediaAccess(true);
      setIsRecording(true);
      return true;
    } catch (error) {
      stopTracks();
      console.error('Lỗi khi cấp quyền MediaRecorder:', error);
      setPermissionError(error.message || 'Bạn đã từ chối cấp quyền quay màn hình.');
      activeRecordingRef.current = false;
      setHasMediaAccess(false);
      setIsRecording(false);
      return false;
    }
  }, [stopRecording, stopTracks]);

  useEffect(() => {
    const handlePageExit = () => {
      if (!activeRecordingRef.current) return;
      downloadRecording();
      stopRecording();
    };

    window.addEventListener('beforeunload', handlePageExit);
    window.addEventListener('pagehide', handlePageExit);
    return () => {
      window.removeEventListener('beforeunload', handlePageExit);
      window.removeEventListener('pagehide', handlePageExit);
    };
  }, [downloadRecording, stopRecording]);

  useEffect(() => () => {
    stopTracks();
    activeRecordingRef.current = false;
    trackEndedHandlerRef.current = null;
  }, [stopTracks]);

  const formatTime = seconds => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return {
    isRecording,
    recordingTime: formatTime(recordingSeconds),
    permissionError,
    mediaAccessLost,
    hasMediaAccess,
    startRecording,
    stopRecording,
    finishRecording,
    clearMediaAccessLost: useCallback(() => setMediaAccessLost(false), []),
  };
}
