import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';

import Header from './components/Header';
import AmbientBackground from './components/AmbientBackground';

import StepWelcome from './components/StepWelcome';
import Step0Intro from './components/Step0Intro';
import Step1Permission from './components/Step1Permission';
import Step2Identity from './components/Step2Identity';
import Step3Choice from './components/Step3Choice';
import Step4MysteryBox from './components/Step4MysteryBox';
import Step5LightsOff from './components/Step5LightsOff';
import Step6Experience from './components/Step6Experience';
import Step7Celebration from './components/Step7Celebration';
import Step8Message from './components/Step8Message';
import Step9Goodbye from './components/Step9Goodbye';

import { useVoiceAudio } from './hooks/useVoiceAudio';
import { useMediaRecorder } from './hooks/useMediaRecorder';
import { logEvent } from './utils/logEvent';
import { getSessionId } from './utils/session';

export default function App() {
  // Navigation Step: 0 to 9
  const [step, setStep] = useState(0);
  const [hasWelcomed, setHasWelcomed] = useState(false);

  // States
  const [userName, setUserName] = useState('');
  const [selectedOption, setSelectedOption] = useState('ruoc_den'); // 'ruoc_den' | 'tha_den'
  const [isLightsOff, setIsLightsOff] = useState(false);
  const [wishText, setWishText] = useState('Gia đình mạnh khỏe, vạn sự như ý, Trung Thu an lành!');
  const [isWishFolded, setIsWishFolded] = useState(false);
  const [lanternReleased, setLanternReleased] = useState(false);
  const [isIntroAudioReady, setIsIntroAudioReady] = useState(false);

  // Hooks
  const {
    isVoiceMuted,
    isMusicMuted,
    toggleVoiceMute,
    toggleMusicMute,
    playBackgroundMusic,
    stopBackgroundMusic,
    playVoiceAudio,
    stopVoiceAudio,
  } = useVoiceAudio();
  const {
    isRecording,
    recordingTime,
    permissionError,
    mediaAccessLost,
    hasMediaAccess,
    startRecording,
    finishRecording,
    clearMediaAccessLost,
  } = useMediaRecorder();

  useEffect(() => {
    if (hasWelcomed) logEvent('step_viewed', { step });
  }, [hasWelcomed, step]);

  // Play the custom introduction audio when the journey starts.
  useEffect(() => {
    if (!hasWelcomed) {
      stopVoiceAudio();
      return undefined;
    }

    stopVoiceAudio();

    if (isVoiceMuted) return undefined;

    if (step === 0) {
      setIsIntroAudioReady(false);
      const timer = setTimeout(() => {
        playVoiceAudio('/assets/audio/gioithieu.mp3', {
          onEnded: () => setIsIntroAudioReady(true),
        });
      }, 1000);

      return () => {
        clearTimeout(timer);
        stopVoiceAudio();
      };
    }

    return () => stopVoiceAudio();
  }, [hasWelcomed, step, isVoiceMuted, playVoiceAudio, stopVoiceAudio]);

  useEffect(() => {
    if (!hasWelcomed || !mediaAccessLost || step === 1) return;

    clearMediaAccessLost();
    setIsLightsOff(false);
    setIsWishFolded(false);
    setLanternReleased(false);
    setStep(1);
  }, [hasWelcomed, mediaAccessLost, step, clearMediaAccessLost]);

  // Mỗi nhánh ở Bước 6 có một bản nhạc nền riêng.
  useEffect(() => {
    if (step === 6) {
      const musicSource = selectedOption === 'ruoc_den'
        ? '/assets/audio/music.mp3'
        : '/assets/audio/music2.mp3';
      playBackgroundMusic(musicSource);
    } else {
      stopBackgroundMusic();
    }

    return () => stopBackgroundMusic();
  }, [step, selectedOption, playBackgroundMusic, stopBackgroundMusic]);

  // Handle release lantern with voice feedback
  const handleReleaseLantern = () => {
    setLanternReleased(true);
  };

  // Restart to choice step
  const handleRestartChoice = () => {
    setStep(3);
    setIsLightsOff(false);
    setIsWishFolded(false);
    setLanternReleased(false);
  };

  const handleBack = () => {
    if (step === 0) return;

    const previousStep = step - 1;
    setStep(previousStep);

    if (previousStep < 5) {
      setIsLightsOff(false);
    }
    if (previousStep < 6) {
      setIsWishFolded(false);
      setLanternReleased(false);
    }
  };

  const handleSetLightsOff = (value) => {
    setIsLightsOff(value);
    if (value) stopVoiceAudio();
  };

  return (
    <div className={`relative min-h-screen flex flex-col justify-between selection:bg-amber-500 selection:text-red-950 font-sans transition-colors duration-1000 ${isLightsOff ? 'bg-[#030612]' : 'bg-[#050816]'}`}>
      {/* Background Đêm Trung Thu */}
      <AmbientBackground isLightsOff={isLightsOff} />

      {/* Header Điều Khiển */}
      {hasWelcomed && step !== 9 && (
        <Header
          step={step}
          isLightsOff={isLightsOff}
          setIsLightsOff={handleSetLightsOff}
          isVoiceMuted={isVoiceMuted}
          isMusicMuted={isMusicMuted}
          toggleVoiceMute={toggleVoiceMute}
          toggleMusicMute={toggleMusicMute}
          isRecording={isRecording}
          recordingTime={recordingTime}
          onBack={handleBack}
        />
      )}

      {/* Main Interactive Stage */}
      <main className="relative z-20 flex-1 flex flex-col items-center justify-center px-4 py-8 md:py-12">
        {!hasWelcomed ? (
          <StepWelcome key="welcome" onNext={() => setHasWelcomed(true)} />
        ) : (
          <AnimatePresence mode="wait">
          {step === 0 && (
            <Step0Intro
              key="step-0"
              onNext={() => setStep(1)}
              isIntroAudioReady={isIntroAudioReady || isVoiceMuted}
            />
          )}

          {step === 1 && (
            <Step1Permission
              key="step-1"
              onNext={() => setStep(2)}
              startRecording={startRecording}
              isRecording={isRecording}
              permissionError={permissionError}
              hasMediaAccess={hasMediaAccess}
            />
          )}

          {step === 2 && (
            <Step2Identity
              key="step-2"
              userName={userName}
              setUserName={setUserName}
              playVoiceAudio={playVoiceAudio}
              stopVoiceAudio={stopVoiceAudio}
              isVoiceMuted={isVoiceMuted}
              onNext={() => setStep(3)}
            />
          )}

          {step === 3 && (
            <Step3Choice
              key="step-3"
              userName={userName}
              playVoiceAudio={playVoiceAudio}
              isVoiceMuted={isVoiceMuted}
              onSelectChoice={(choice) => {
                setSelectedOption(choice);
                setStep(4);
              }}
            />
          )}

          {step === 4 && (
            <Step4MysteryBox
              key="step-4"
              playVoiceAudio={playVoiceAudio}
              isVoiceMuted={isVoiceMuted}
              onNext={() => setStep(5)}
            />
          )}

          {step === 5 && (
            <Step5LightsOff
              key="step-5"
              isLightsOff={isLightsOff}
              setIsLightsOff={handleSetLightsOff}
              playVoiceAudio={playVoiceAudio}
              isVoiceMuted={isVoiceMuted}
              onNext={() => setStep(6)}
            />
          )}

          {step === 6 && (
            <Step6Experience
              key="step-6"
              selectedOption={selectedOption}
              userName={userName}
              wishText={wishText}
              setWishText={setWishText}
              isWishFolded={isWishFolded}
              setIsWishFolded={setIsWishFolded}
              lanternReleased={lanternReleased}
              setLanternReleased={setLanternReleased}
              onReleaseLantern={handleReleaseLantern}
              onNext={() => setStep(7)}
            />
          )}

          {step === 7 && (
            <Step7Celebration
              key="step-7"
              userName={userName}
              isRecording={isRecording}
              playVoiceAudio={playVoiceAudio}
              isVoiceMuted={isVoiceMuted}
              onRestartChoice={handleRestartChoice}
              onOpenMessage={() => setStep(8)}
              onContinue={() => setStep(9)}
            />
          )}

          {step === 8 && (
            <Step8Message
              key="step-8"
              isVoiceMuted={isVoiceMuted}
              playVoiceAudio={playVoiceAudio}
              onSubmitMessage={async ({ answer, thought }) => {
                try {
                  const response = await fetch('/api/messages', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                      sessionId: getSessionId(),
                      answer,
                      thought,
                      createdAt: new Date().toISOString(),
                    }),
                  });
                  if (!response.ok) throw new Error('Không thể lưu lời nhắn');
                  logEvent('message_sent');
                } catch (error) {
                  console.warn('Không thể gửi lời nhắn:', error);
                } finally {
                  await finishRecording();
                  setStep(9);
                }
              }}
            />
          )}

          {step === 9 && (
            <Step9Goodbye
              key="step-9"
              userName={userName}
              isVoiceMuted={isVoiceMuted}
              playVoiceAudio={playVoiceAudio}
            />
          )}
          </AnimatePresence>
        )}
      </main>

      {/* Footer */}
      {hasWelcomed && step !== 9 && (
        <footer className="relative z-20 text-center py-4 text-xs text-amber-300/50 border-t border-amber-500/10">
          Tết Trung Thu Độc Bản &bull; Long &amp; Tuấn &bull; Ký tên LongDaiCa &bull; Trợ Lý AI Đồng Hành
        </footer>
      )}
    </div>
  );
}
