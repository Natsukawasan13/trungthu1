import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { UserCheck, ArrowRight } from 'lucide-react';
import { logEvent } from '../utils/logEvent';

const AUTHORIZED_NAMES = [
  'Minh Tuấn',
  'Nguyên',
  'Thảo Nguyên',
  'Nguyễn Thảo Nguyên',
];

const normalizeName = (name) => name
  .trim()
  .normalize('NFD')
  .replace(/[\u0300-\u036f]/g, '')
  .replace(/đ/g, 'd')
  .replace(/Đ/g, 'D')
  .replace(/\s+/g, ' ')
  .toLocaleLowerCase('vi-VN');

const TROLL_NAMES = ['Long', 'Trần Lê Gia Long', 'Gia Long', 'Long Trần', 'Tuấn'].map(normalizeName);

export default function Step2Identity({ userName, setUserName, onNext, playVoiceAudio, stopVoiceAudio, isVoiceMuted }) {
  const [inputValue, setInputValue] = useState(userName || '');
  const [error, setError] = useState('');
  const [isVoicePlaying, setIsVoicePlaying] = useState(!isVoiceMuted);
  const inputRef = useRef(null);
  const trollTimerRef = useRef(null);

  useEffect(() => {
    if (isVoiceMuted) {
      setIsVoicePlaying(false);
      stopVoiceAudio();
      return undefined;
    }

    setIsVoicePlaying(true);
    const timer = setTimeout(() => {
      playVoiceAudio('/assets/audio/nhapten.mp3', {
        onEnded: () => setIsVoicePlaying(false),
        onError: () => setIsVoicePlaying(false),
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      stopVoiceAudio();
    };
  }, [isVoiceMuted, playVoiceAudio, stopVoiceAudio]);

  useEffect(() => () => clearTimeout(trollTimerRef.current), []);

  const resetAfterTroll = () => {
    setInputValue('');
    setError('');
    setIsVoicePlaying(false);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isVoicePlaying && !isVoiceMuted) return;
    const trimmed = inputValue.trim();
    if (!trimmed) {
      setError('Vui lòng nhập tên hoặc biệt danh của bạn nhé!');
      return;
    }
    if (TROLL_NAMES.includes(normalizeName(trimmed))) {
      logEvent('troll_name_entered');
      if (isVoiceMuted) {
        resetAfterTroll();
        return;
      }

      setIsVoicePlaying(true);
      trollTimerRef.current = setTimeout(() => {
        playVoiceAudio('/assets/audio/troll.mp3', {
          onEnded: resetAfterTroll,
          onError: resetAfterTroll,
        });
      }, 1000);
      return;
    }
    if (!AUTHORIZED_NAMES.some((name) => normalizeName(name) === normalizeName(trimmed))) {
      logEvent('invalid_name');
      setError('bạn không thuộc diện được chỉ định');
      if (!isVoiceMuted) playVoiceAudio('/assets/audio/saiten.mp3');
      return;
    }
    logEvent('name_submitted', { name: trimmed });
    setUserName(trimmed);
    onNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-gradient-to-b from-[#380812]/95 via-[#23082b]/95 to-[#16072b]/95 border-2 border-amber-400/60 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md text-center"
    >
      {/* Icon Scroll */}
      <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-amber-400/20 border border-amber-300/60 flex items-center justify-center text-3xl shadow-[0_0_20px_rgba(251,191,36,0.3)]">
        📜
      </div>

      <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-200 mb-1">
        Đăng Ký Danh Tính
      </h2>

      <p className="text-xs text-amber-300/80 mb-6">
        Nhập tên hoặc danh xưng của bạn để nhận lời chúc và điều ước độc quyền đêm nay
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative text-left">
          <label className="block text-xs font-semibold text-amber-300 mb-1.5">
            Tên hoặc Biệt danh của bạn:
          </label>
          <div className="relative">
            <input
              type="text"
              ref={inputRef}
              value={inputValue}
              onChange={(e) => {
                setInputValue(e.target.value);
                if (error) setError('');
              }}
              placeholder="Nhập đúng tên"
              maxLength={30}
              disabled={isVoicePlaying && !isVoiceMuted}
              className="w-full px-4 py-3 bg-black/60 border-2 border-amber-500/50 rounded-2xl text-amber-100 placeholder-amber-400/40 text-sm focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-400/30 transition-all"
              autoFocus
            />
            <div className="absolute right-3.5 top-3.5 text-amber-400">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          {error && (
            <p className="text-xs text-rose-400 mt-1.5 font-medium pl-1">
              {error}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isVoicePlaying && !isVoiceMuted}
          className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-red-950 font-bold text-sm shadow-lg shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:pointer-events-none disabled:opacity-50"
        >
          <span>Khám Phá Hành Trình Diệu Kỳ</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </form>
    </motion.div>
  );
}
