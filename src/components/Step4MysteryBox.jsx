import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Gift } from 'lucide-react';
import confetti from 'canvas-confetti';
import GiftBoxSvg from './svg/GiftBoxSvg';
import { logEvent } from '../utils/logEvent';

export default function Step4MysteryBox({ onNext, playVoiceAudio, isVoiceMuted }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isVoicePlaying, setIsVoicePlaying] = useState(!isVoiceMuted);

  useEffect(() => {
    if (isVoiceMuted) {
      setIsVoicePlaying(false);
      return undefined;
    }

    setIsVoicePlaying(true);
    const timer = setTimeout(() => {
      playVoiceAudio('/assets/audio/moqua.mp3', {
        onEnded: () => setIsVoicePlaying(false),
        onError: () => setIsVoicePlaying(false),
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [isVoiceMuted, playVoiceAudio]);

  const handleOpenBox = () => {
    if (!isOpen && !isVoicePlaying) {
      logEvent('gift_opened');
      setIsOpen(true);
      // Bắn pháo hoa confetti chúc mừng
      try {
        confetti({
          particleCount: 50,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#fbbf24', '#f59e0b', '#ef4444', '#fde047'],
        });
      } catch (e) {
        console.warn("Confetti error", e);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-gradient-to-b from-[#3a091a]/95 via-[#23082a]/95 to-[#130722]/95 border-2 border-amber-400/60 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md text-center"
    >
      <div className="inline-flex items-center space-x-1.5 bg-amber-400/10 border border-amber-400/40 rounded-full px-3 py-1 text-xs text-amber-300 font-semibold mb-3">
        <Gift className="w-3.5 h-3.5 text-amber-400" />
        <span>Quà Tặng Từ Cung Trăng</span>
      </div>

      <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-200 mb-2">
        Hộp Quà Bí Mật
      </h2>

      <p className="text-xs text-amber-200/80 mb-6 leading-relaxed">
        Bạn vừa nhận được một hộp quà đặc biệt từ <strong>Chú Cuội &amp; Chị Hằng</strong>. Hãy nhấp trực tiếp vào hộp quà để mở điều kỳ diệu nhé!
      </p>

      {/* Interactive Gift Box */}
      <div
        className={`relative py-4 flex flex-col items-center justify-center ${isVoicePlaying ? 'cursor-not-allowed opacity-60' : 'cursor-pointer'}`}
        onClick={handleOpenBox}
        aria-disabled={isVoicePlaying}
      >
        <motion.div
          animate={isOpen ? { scale: [1, 1.1, 1] } : { rotate: [-2, 2, -2] }}
          transition={isOpen ? { duration: 0.4 } : { repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
          className="relative"
        >
          <GiftBoxSvg className="w-32 h-32 md:w-36 md:h-36" isOpen={isOpen} />
        </motion.div>

        {!isOpen && (
          <p className="mt-3 text-xs font-semibold text-amber-300 animate-pulse bg-black/40 px-3 py-1 rounded-full border border-amber-500/30">
            {isVoicePlaying ? '🔊 Đang phát lời dẫn...' : '👉 Nhấp vào hộp quà để mở nắp 👈'}
          </p>
        )}
      </div>

      {/* Revealed Gifts Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: 15 }}
            animate={{ opacity: 1, height: 'auto', y: 0 }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-3 mt-4"
          >
            <div className="bg-gradient-to-r from-red-950/80 to-amber-950/80 border border-amber-400/40 rounded-2xl p-3.5 text-left text-xs space-y-1.5 shadow-inner">
              <div className="flex items-center space-x-2 text-amber-300 font-bold">
                <Sparkles className="w-4 h-4 text-amber-400" />
                <span>Chúc mừng bạn đã nhận được:</span>
              </div>
              <p className="text-amber-100/90 pl-6">
                🥮 01 Bánh Nướng Thập Cẩm Trứng Muối Hoàng Kim
              </p>
              <p className="text-amber-100/90 pl-6">
                🥮 01 Bánh Dẻo Hạt Sen Trà Xanh Thanh Khiết
              </p>
              <p className="text-amber-100/90 pl-6">
                🏮 01 Chiếc Đèn Kéo Quân Phát Sáng Ước Nguyện
              </p>
            </div>

            <button
              onClick={onNext}
              className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-red-950 font-bold text-sm shadow-lg shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
            >
              <span>Tiến Vào Nghi Thức Đêm Trăng</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
