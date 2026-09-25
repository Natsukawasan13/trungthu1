import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import StarLanternSvg from './svg/StarLanternSvg';
import PaperBoatSvg from './svg/PaperBoatSvg';
import { logEvent } from '../utils/logEvent';

const normalizeName = (name) => name
  .trim()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd')
  .replace(/Đ/g, 'D')
  .replace(/\s+/g, ' ')
  .toLocaleLowerCase('vi-VN');

const SPECIAL_NAMES = ['Nguyên', 'Thảo Nguyên', 'Nguyễn Thảo Nguyên'].map(normalizeName);

export default function Step3Choice({ userName, onSelectChoice, playVoiceAudio, isVoiceMuted }) {
  const isSpecialName = SPECIAL_NAMES.includes(normalizeName(userName || ''));
  const [isGreetingPopupOpen, setIsGreetingPopupOpen] = useState(isSpecialName);
  const [greetingAnswer, setGreetingAnswer] = useState(null);
  const [isVoicePlaying, setIsVoicePlaying] = useState(!isVoiceMuted);

  useEffect(() => {
    if (isVoiceMuted) {
      setIsVoicePlaying(false);
      return undefined;
    }

    const source = isGreetingPopupOpen
      ? '/assets/audio/hoiten.mp3'
      : greetingAnswer
        ? `/assets/audio/xungho${greetingAnswer}.mp3`
        : isSpecialName
          ? null
          : '/assets/audio/luachon.mp3';
    if (!source) return undefined;

    setIsVoicePlaying(true);
    const timer = setTimeout(() => {
      playVoiceAudio(source, {
        onEnded: () => setIsVoicePlaying(false),
        onError: () => setIsVoicePlaying(false),
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [greetingAnswer, isGreetingPopupOpen, isSpecialName, isVoiceMuted, playVoiceAudio]);

  const handleGreetingAnswer = (answer) => {
    logEvent('greeting_answered', { answer });
    setIsGreetingPopupOpen(false);
    setGreetingAnswer(answer);
    if (isVoiceMuted) setIsVoicePlaying(false);
  };

  const handleSelectChoice = (choice) => {
    if (isGreetingPopupOpen || isVoicePlaying) return;
    logEvent('choice_selected', { choice });
    onSelectChoice(choice);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg bg-gradient-to-b from-[#380b1e]/95 via-[#23092b]/95 to-[#120626]/95 border-2 border-amber-400/60 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md text-center"
    >
      <div className="text-3xl mb-2">🌕 🎋</div>

      <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-200 mb-2">
        Chào {userName || 'Bạn Thân Yêu'}!
      </h2>

      <p className="text-xs md:text-sm text-amber-100/90 leading-relaxed mb-6 font-medium">
        Đêm nay ánh trăng rằm sáng soi muôn nơi. Bạn muốn cùng hòa vào tiếng trống lân rộn rã hay thả đèn hoa đăng gửi gắm ước nguyện bình an?
      </p>

      {/* 2 Interactive Choice Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Choice 1: Rước Đèn Ông Sao */}
        <button
          onClick={() => handleSelectChoice('ruoc_den')}
          disabled={isGreetingPopupOpen || isVoicePlaying}
          className="group relative bg-gradient-to-b from-red-950/70 to-red-900/50 hover:from-red-900/90 hover:to-amber-950/90 border-2 border-red-500/40 hover:border-amber-400 rounded-2xl p-5 text-left transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-red-600/30 flex flex-col items-center justify-between disabled:pointer-events-none disabled:opacity-50"
        >
          <div className="w-16 h-16 mb-2 flex items-center justify-center transform group-hover:rotate-12 transition-transform">
            <StarLanternSvg className="w-14 h-14" isGlowing={true} />
          </div>
          <div className="text-center">
            <h3 className="text-base font-serif font-bold text-amber-200 group-hover:text-amber-300">
              Rước Đèn Ông Sao
            </h3>
            <p className="text-[11px] text-amber-200/70 mt-1">
              Âm vang tiếng trống tùng dinh dinh và màn múa lân rộn ràng
            </p>
          </div>
          <span className="mt-3 px-3 py-1 bg-red-800/80 border border-amber-400/40 rounded-full text-[11px] text-amber-300 font-semibold group-hover:bg-amber-400 group-hover:text-red-950 transition-colors">
            Khám phá 🏮
          </span>
        </button>

        {/* Choice 2: Thả Đèn Hoa Đăng */}
        <button
          onClick={() => handleSelectChoice('tha_den')}
          disabled={isGreetingPopupOpen || isVoicePlaying}
          className="group relative bg-gradient-to-b from-blue-950/70 to-sky-900/50 hover:from-sky-900/90 hover:to-indigo-950/90 border-2 border-sky-500/40 hover:border-amber-400 rounded-2xl p-5 text-left transition-all duration-300 hover:scale-105 active:scale-95 shadow-xl hover:shadow-sky-600/30 flex flex-col items-center justify-between disabled:pointer-events-none disabled:opacity-50"
        >
          <div className="w-20 h-16 mb-2 flex items-center justify-center transform group-hover:-translate-y-1 transition-transform">
            <PaperBoatSvg className="w-20 h-14" hasWish={true} />
          </div>
          <div className="text-center">
            <h3 className="text-base font-serif font-bold text-sky-200 group-hover:text-sky-300">
              Thả Đèn Hoa Đăng
            </h3>
            <p className="text-[11px] text-sky-200/70 mt-1">
              Gấp giấy hoa đăng, viết ước nguyện thả trôi êm đềm trên sông trăng
            </p>
          </div>
          <span className="mt-3 px-3 py-1 bg-sky-800/80 border border-amber-400/40 rounded-full text-[11px] text-sky-300 font-semibold group-hover:bg-amber-400 group-hover:text-red-950 transition-colors">
            Khám phá 🪷
          </span>
        </button>
      </div>

      {isGreetingPopupOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="w-full max-w-sm rounded-3xl border-2 border-amber-400/70 bg-gradient-to-b from-[#3a0a1a] via-[#230829] to-[#120824] p-6 text-center shadow-2xl"
          >
            <div className="mb-3 text-4xl">🌙</div>
            <h3 className="mb-6 text-xl font-serif font-bold text-amber-200">
              Bạn là con gái hả?
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleGreetingAnswer(1)}
                disabled={isVoicePlaying && !isVoiceMuted}
                className="rounded-2xl bg-amber-400 px-4 py-3 font-bold text-red-950 transition hover:bg-amber-300 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
              >
                Đúng
              </button>
              <button
                type="button"
                onClick={() => handleGreetingAnswer(2)}
                disabled={isVoicePlaying && !isVoiceMuted}
                className="rounded-2xl border border-amber-400/60 bg-red-900/70 px-4 py-3 font-bold text-amber-200 transition hover:bg-red-800 active:scale-95 disabled:pointer-events-none disabled:opacity-50"
              >
                Sai
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
