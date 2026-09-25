import React from 'react';
import { Volume2, VolumeX, Music2, Music, Moon, Sun, Video, ArrowLeft } from 'lucide-react';

export default function Header({
  step,
  isLightsOff,
  setIsLightsOff,
  isVoiceMuted,
  isMusicMuted,
  toggleVoiceMute,
  toggleMusicMute,
  isRecording,
  recordingTime,
  onBack,
}) {
  return (
    <header className="relative z-50 flex items-center justify-between px-4 md:px-8 py-3.5 bg-black/40 backdrop-blur-md border-b border-amber-500/20 transition-all duration-500">
      {/* Brand & Step Badge */}
      <div className="flex items-center space-x-3">
        <div className="flex items-center space-x-2 bg-gradient-to-r from-red-950/80 to-amber-950/80 border border-amber-400/40 px-3 py-1.5 rounded-full shadow-lg">
          <span className="text-xl animate-bounce">🌕</span>
          <span className="font-serif font-bold text-amber-200 text-sm tracking-wide hidden sm:inline">
            Đêm Hội Trăng Rằm
          </span>
        </div>

        <div className="flex items-center space-x-2">
          {/* Back to the previous step */}
          <button
            type="button"
            onClick={onBack}
            disabled={step === 0}
            aria-label="Quay lại bước trước"
            title={step === 0 ? 'Đây là bước đầu tiên' : 'Quay lại bước trước'}
            className="p-1.5 rounded-full border border-amber-500/30 text-amber-300 transition-all hover:bg-amber-500/20 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>

          {/* Step Indicator */}
          <div className="text-[11px] font-semibold text-amber-300/80 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-full">
            Bước {step + 1} / 10
          </div>
        </div>
      </div>

      {/* Center Recording Status */}
      {/* {isRecording && (
        <div className="flex items-center space-x-2 bg-red-950/90 border border-red-500/60 px-3 py-1 rounded-full shadow-[0_0_15px_rgba(239,68,68,0.5)] animate-pulse">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <Video className="w-3.5 h-3.5 text-red-400" />
          <span className="text-xs font-mono font-bold text-red-200">
            REC {recordingTime}
          </span>
        </div>
      )} */}

      {/* Right Controls: Lights & Audio */}
      <div className="flex items-center space-x-2.5">
        {/* Lights Off / On Toggle Button */}
        <div className="relative">
          <button
            id="header-light-switch"
            onClick={() => setIsLightsOff(!isLightsOff)}
            className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-full text-xs font-bold transition-all duration-300 ${
              isLightsOff
                ? 'bg-amber-400 text-red-950 shadow-[0_0_20px_#fbbf24] hover:bg-amber-300'
                : 'bg-black/50 text-amber-200 border border-amber-500/40 hover:bg-amber-500/20'
            }`}
            title={isLightsOff ? "Bật lại đèn" : "Tắt đèn để ngắm trăng sáng"}
          >
            {isLightsOff ? (
              <>
                <Sun className="w-3.5 h-3.5 text-red-900" />
                <span>Bật Đèn</span>
              </>
            ) : (
              <>
                <Moon className="w-3.5 h-3.5 text-amber-300" />
                <span>Tắt Đèn 🌙</span>
              </>
            )}
          </button>
        </div>

        {/* Music mute / unmute button */}
        <button
          onClick={toggleMusicMute}
          className={`p-2 rounded-full border transition-all duration-300 ${
            isMusicMuted
              ? 'bg-red-900/60 border-red-500/40 text-gray-300 hover:bg-red-800/80'
              : 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/35 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
          }`}
          aria-label={isMusicMuted ? 'Bật nhạc nền' : 'Tắt nhạc nền'}
          title={isMusicMuted ? 'Bật nhạc nền' : 'Tắt nhạc nền'}
        >
          {isMusicMuted ? <Music className="w-4 h-4" /> : <Music2 className="w-4 h-4" />}
        </button>

        {/* AI voice mute / unmute button */}
        <button
          onClick={toggleVoiceMute}
          className={`p-2 rounded-full border transition-all duration-300 ${
            isVoiceMuted
              ? 'bg-red-900/60 border-red-500/40 text-gray-300 hover:bg-red-800/80'
              : 'bg-amber-500/20 border-amber-500/40 text-amber-300 hover:bg-amber-500/35 shadow-[0_0_10px_rgba(245,158,11,0.3)]'
          }`}
          aria-label={isVoiceMuted ? 'Bật giọng nói AI' : 'Tắt giọng nói AI'}
          title={isVoiceMuted ? 'Bật giọng nói AI' : 'Tắt giọng nói AI'}
        >
          {isVoiceMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      </div>
    </header>
  );
}
