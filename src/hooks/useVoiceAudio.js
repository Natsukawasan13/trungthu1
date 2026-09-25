import { useState, useRef, useEffect, useCallback } from 'react';

/**
 * Hook quản lý giọng nói AI (SpeechSynthesis) và âm thanh không gian (Web Audio API)
 * Đảm bảo: Dùng useRef, dừng giọng cũ ngay khi giọng mới bắt đầu, hỗ trợ Global Mute
 */
export function useVoiceAudio() {
  const [isVoiceMuted, setIsVoiceMuted] = useState(false);
  const [isMusicMuted, setIsMusicMuted] = useState(false);
  const currentUtteranceRef = useRef(null);
  const voiceAudioRef = useRef(null);
  const audioContextRef = useRef(null);
  const musicAudioRef = useRef(null);
  const musicRequestedRef = useRef(false);
  const isMusicMutedRef = useRef(isMusicMuted);

  useEffect(() => {
    isMusicMutedRef.current = isMusicMuted;
  }, [isMusicMuted]);

  // Khởi tạo AudioContext nhẹ nhàng cho âm chuông lễ hội
  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        audioContextRef.current = new AudioCtx();
      }
    }
    return audioContextRef.current;
  }, []);

  // Tiếng chuông gió / khánh đồng vang nhẹ mở đầu mỗi lời dẫn
  const playChime = useCallback(() => {
    if (isVoiceMuted) return;
    try {
      const ctx = getAudioContext();
      if (!ctx) return;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const now = ctx.currentTime;
      // Nốt chuông pentatonic Trung Thu thanh thoát (G5, C6)
      const freqs = [783.99, 1046.5];
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.12);

        gain.gain.setValueAtTime(0.001, now + idx * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.08, now + idx * 0.12 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.12 + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + idx * 0.12);
        osc.stop(now + idx * 0.12 + 1);
      });
    } catch (e) {
      console.warn("AudioContext chime not allowed yet:", e);
    }
  }, [isVoiceMuted, getAudioContext]);

  const stopVoiceAudio = useCallback(() => {
    if (voiceAudioRef.current) {
      voiceAudioRef.current.pause();
      voiceAudioRef.current.currentTime = 0;
    }
  }, []);

  const playVoiceAudio = useCallback((source, { onEnded, onError } = {}) => {
    if (isVoiceMuted) return;

    if (!voiceAudioRef.current || voiceAudioRef.current.src !== new URL(source, window.location.href).href) {
      stopVoiceAudio();
      const audio = new Audio(source);
      audio.autoplay = true;
      audio.preload = 'auto';
      audio.playsInline = true;
      audio.loop = false;
      audio.volume = 1;
      voiceAudioRef.current = audio;
    }

    const audio = voiceAudioRef.current;
    const handleEnded = () => {
      onEnded?.();
    };
    audio.onended = handleEnded;
    audio.onerror = onError;
    audio.play().catch(() => {
      console.warn('Không thể tự động phát audio giới thiệu. Hãy bật giọng nói AI bằng nút trên header.');
    });
  }, [isVoiceMuted, stopVoiceAudio]);

  // Dừng tất cả giọng nói hiện tại
  const stopAllVoice = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    currentUtteranceRef.current = null;
    stopVoiceAudio();
  }, [stopVoiceAudio]);

  // Phát lời dẫn với quản lý useRef và auto-cancel voice cũ
  const speakText = useCallback((text) => {
    if (isVoiceMuted || !text) return;

    if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
      console.warn("SpeechSynthesis không được trình duyệt hỗ trợ");
      return;
    }

    // Dừng giọng cũ ngay lập tức trước khi phát giọng mới
    stopAllVoice();
    playChime();

    // Tạo utterance mới
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'vi-VN';
    utterance.rate = 0.96;
    utterance.pitch = 1.04;

    // Tìm kiếm giọng tiếng Việt tối ưu nếu có
    const voices = window.speechSynthesis.getVoices();
    const vietnameseVoice = voices.find(v => v.lang.includes('vi') || v.lang.includes('VN'));
    if (vietnameseVoice) {
      utterance.voice = vietnameseVoice;
    }

    currentUtteranceRef.current = utterance;

    // Tránh bug GC của một số trình duyệt với speechSynthesis
    utterance.onend = () => {
      currentUtteranceRef.current = null;
    };
    utterance.onerror = () => {
      currentUtteranceRef.current = null;
    };

    window.speechSynthesis.speak(utterance);
  }, [isVoiceMuted, stopAllVoice, playChime]);

  const playBackgroundMusic = useCallback((source) => {
    musicRequestedRef.current = true;

    if (!musicAudioRef.current || musicAudioRef.current.src !== new URL(source, window.location.href).href) {
      musicAudioRef.current?.pause();
      const audio = new Audio(source);
      audio.loop = true;
      audio.volume = 0.35;
      musicAudioRef.current = audio;
    }

    if (!isMusicMutedRef.current) {
      musicAudioRef.current.play().catch(() => {
        console.warn('Không thể tự động phát nhạc nền. Hãy bật âm thanh bằng nút trên header.');
      });
    }
  }, []);

  const stopBackgroundMusic = useCallback(() => {
    musicRequestedRef.current = false;
    if (musicAudioRef.current) {
      musicAudioRef.current.pause();
      musicAudioRef.current.currentTime = 0;
    }
  }, []);

  const toggleVoiceMute = useCallback(() => {
    setIsVoiceMuted(prev => {
      const next = !prev;
      if (next) {
        stopAllVoice();
      }
      return next;
    });
  }, [stopAllVoice]);

  const toggleMusicMute = useCallback(() => {
    setIsMusicMuted(prev => {
      const next = !prev;
      if (next) {
        musicAudioRef.current?.pause();
      } else if (musicRequestedRef.current) {
        musicAudioRef.current?.play().catch(() => {});
      }
      return next;
    });
  }, []);

  // Clean-up khi unmount
  useEffect(() => {
    return () => {
      stopAllVoice();
      stopBackgroundMusic();
      if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
        audioContextRef.current.close().catch(() => {});
      }
    };
  }, [stopAllVoice, stopBackgroundMusic]);

  return {
    isVoiceMuted,
    isMusicMuted,
    toggleVoiceMute,
    toggleMusicMute,
    speakText,
    stopAllVoice,
    playVoiceAudio,
    stopVoiceAudio,
    playChime,
    playBackgroundMusic,
    stopBackgroundMusic,
  };
}
