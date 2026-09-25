import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Moon, ArrowRight, Hand } from 'lucide-react';
import { logEvent } from '../utils/logEvent';

export default function Step5LightsOff({ isLightsOff, setIsLightsOff, onNext, playVoiceAudio, isVoiceMuted }) {
  const [isVoicePlaying, setIsVoicePlaying] = useState(!isVoiceMuted);

  useEffect(() => {
    if (isVoiceMuted || isLightsOff) {
      setIsVoicePlaying(false);
      return undefined;
    }

    setIsVoicePlaying(true);
    const timer = setTimeout(() => {
      playVoiceAudio('/assets/audio/tatden.mp3', {
        onEnded: () => setIsVoicePlaying(false),
        onError: () => setIsVoicePlaying(false),
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [isLightsOff, isVoiceMuted, playVoiceAudio]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-gradient-to-b from-[#33091b]/95 via-[#1f0727]/95 to-[#0f041d]/95 border-2 border-amber-400/60 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md text-center relative overflow-hidden"
    >
      {/* Icon Candle / Moon */}
      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-400/20 border border-amber-400/60 flex items-center justify-center text-3xl shadow-[0_0_25px_rgba(251,191,36,0.4)]">
        {isLightsOff ? '🌕' : '🕯️'}
      </div>

      <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-200 mb-2">
        Chuẩn Bị Khung Cảnh Huyền Ảo
      </h2>

      <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed mb-6 font-medium">
        {isLightsOff ? (
          <span className="text-emerald-300 font-bold block bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-2xl">
            🎉 Tuyệt vời! Bạn đã tắt đèn thành công. Ánh trăng và ngọn lửa lồng đèn đang phát sáng lung linh!
          </span>
        ) : (
          <span>
            &ldquo;Đêm đã về khuya rồi. Bạn hãy nhìn lên <strong>góc trên bên phải</strong>, bấm vào chiếc công tắc <strong>Tắt Đèn 🌙</strong> để chiêm ngưỡng điều kỳ diệu phát sáng rực rỡ nhất!&rdquo;
          </span>
        )}
      </p>

      {/* SVG Bàn tay chỉ nút hoạt họa */}
      {!isLightsOff && (
        <div className="flex flex-col items-center justify-center my-3 p-2 bg-black/40 rounded-2xl border border-amber-500/20">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-amber-300 animate-pulse">
              Tắt đèn bên góc phải phía trên cùng màn hình
            </span>
          </div>
          <span className="text-[11px] text-amber-200/70 mt-1">
            (Bấm nút &ldquo;Tắt Đèn 🌙&rdquo; ở thanh Menu góc trên)
          </span>
        </div>
      )}

      {/* Status Badge */}
      <div className="p-3.5 rounded-2xl bg-black/50 border border-amber-500/30 flex items-center justify-center space-x-3 mb-6">
        <div className={`w-3.5 h-3.5 rounded-full ${isLightsOff ? 'bg-emerald-400 shadow-[0_0_12px_#34d399]' : 'bg-red-500 animate-ping'}`} />
        <span className="text-xs font-semibold text-amber-200">
          Trạng thái không gian: {isLightsOff ? 'Đã tắt đèn (Lung linh huyền ảo)' : 'Đang bật đèn'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="space-y-2.5">
        {!isLightsOff ? (
          <button
            onClick={() => {
              logEvent('lights_off');
              setIsLightsOff(true);
            }}
            disabled={isVoicePlaying}
            className="w-full py-3 px-5 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-500 text-red-950 font-bold text-xs shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:pointer-events-none disabled:opacity-50"
          >
            <Moon className="w-4 h-4 text-red-950" />
            <span>{isVoicePlaying ? '🔊 Đang phát lời dẫn...' : 'Tắt Đèn Ngay Tại Đây'}</span>
          </button>
        ) : (
          <button
            onClick={onNext}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-400 text-emerald-950 font-bold text-sm shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
          >
            <span>Bùng Cháy Ngọn Lửa &amp; Tiến Vào Trải Nghiệm</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        )}
      </div>
    </motion.div>
  );
}
