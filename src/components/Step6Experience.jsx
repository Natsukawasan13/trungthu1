import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, Edit3, Flame } from 'lucide-react';
import StarLanternSvg from './svg/StarLanternSvg';
import KidLanternSvg from './svg/KidLanternSvg';
import LionDanceSvg from './svg/LionDanceSvg';
import PaperBoatSvg from './svg/PaperBoatSvg';
import { logEvent } from '../utils/logEvent';

export default function Step6Experience({
  selectedOption,
  userName,
  wishText,
  setWishText,
  isWishFolded,
  setIsWishFolded,
  lanternReleased,
  setLanternReleased,
  onReleaseLantern,
  onNext,
}) {
  const [drumBeat, setDrumBeat] = useState(false);
  const [lanternIntro, setLanternIntro] = useState('waiting');
  const onNextRef = useRef(onNext);

  useEffect(() => {
    onNextRef.current = onNext;
  }, [onNext]);

  useEffect(() => {
    if (!lanternReleased) return undefined;

    const timer = setTimeout(() => onNextRef.current(), 2000);
    return () => clearTimeout(timer);
  }, [lanternReleased]);

  useEffect(() => {
    if (lanternIntro !== 'lighting') return undefined;

    const timer = setTimeout(() => setLanternIntro('festival'), 2200);
    return () => clearTimeout(timer);
  }, [lanternIntro]);

  // Hiệu ứng tiếng trống lân tùng dinh dinh
  const handleDrumTrigger = () => {
    setDrumBeat(true);
    setTimeout(() => setDrumBeat(false), 300);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-xl bg-gradient-to-b from-[#27091e]/95 via-[#160624]/95 to-[#0b0318]/95 border-2 border-amber-400/60 rounded-3xl p-5 md:p-7 shadow-2xl backdrop-blur-md text-center"
    >
      {/* ======================================================== */}
      {/* NHÁNH 1: RƯỚC ĐÈN ÔNG SAO (2D Animated Stage: Em bé & Múa Lân) */}
      {/* ======================================================== */}
      {selectedOption === 'ruoc_den' && (
        <div className="space-y-4">
          <AnimatePresence mode="wait">
            {lanternIntro !== 'festival' ? (
              <motion.div
                key="lantern-intro"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 0.5 }}
                className="flex min-h-[30rem] flex-col items-center justify-center rounded-2xl border border-amber-400/40 bg-gradient-to-b from-[#0e0624] via-[#1a0724] to-[#2b0816] px-5 py-8 shadow-inner"
              >
                <p className="mb-6 text-xs font-bold uppercase tracking-wider text-amber-300">
                  🏮 Thắp sáng đêm hội
                </p>

                <motion.div
                  initial={{ scale: 1.25, opacity: 0.45 }}
                  animate={
                    lanternIntro === 'lighting'
                      ? { scale: [1.25, 1.35, 1.2, 0.35], opacity: [0.45, 0.8, 1, 0] }
                      : { scale: 1, opacity: 0.7 }
                  }
                  transition={{ duration: 2.2, ease: 'easeInOut' }}
                  className="relative flex h-48 w-48 items-center justify-center"
                >
                  <StarLanternSvg
                    className="h-44 w-44"
                    isGlowing={lanternIntro === 'lighting'}
                  />
                </motion.div>

                <motion.button
                  type="button"
                  onClick={() => setLanternIntro('lighting')}
                  disabled={lanternIntro === 'lighting'}
                  whileHover={lanternIntro === 'waiting' ? { scale: 1.08 } : undefined}
                  whileTap={lanternIntro === 'waiting' ? { scale: 0.94 } : undefined}
                  className="mt-5 flex flex-col items-center rounded-2xl border border-amber-400/40 bg-black/30 px-5 py-3 text-amber-200 transition-colors hover:bg-amber-500/10 disabled:cursor-wait"
                >
                  <motion.span
                    animate={
                      lanternIntro === 'lighting'
                        ? { scale: [1, 1.3, 1], opacity: [0.55, 1, 1] }
                        : { scale: 1, opacity: 0.65 }
                    }
                    transition={{ duration: 0.8, repeat: lanternIntro === 'lighting' ? 2 : Infinity }}
                    className="relative mb-1 text-amber-300"
                  >
                    <Flame className="h-8 w-8 fill-amber-400 drop-shadow-[0_0_12px_#fbbf24]" />
                  </motion.span>
                  <span className="text-xs font-bold">
                    {lanternIntro === 'lighting' ? 'Đèn đang bừng sáng...' : 'Chạm vào ngọn nến'}
                  </span>
                </motion.button>
              </motion.div>
            ) : (
              <motion.div
                key="festival-stage"
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7 }}
                className="space-y-4"
              >
                <div className="flex items-center justify-between border-b border-amber-500/30 pb-2">
                  <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                    🏮 Đêm Hội Rước Đèn &amp; Múa Lân
                  </span>
                  <span className="text-[11px] bg-red-900/60 text-amber-200 px-2.5 py-0.5 rounded-full border border-red-500/40">
                    Tùng dinh dinh, cắc tùng dinh dinh
                  </span>
                </div>

                {/* Sân khấu đêm hội hoạt họa 2D */}
                <div className="relative w-full h-72 rounded-2xl overflow-hidden border border-amber-400/40 bg-gradient-to-b from-[#0e0624] via-[#1a0724] to-[#2b0816] flex flex-col justify-end p-4 shadow-inner">
            {/* Trăng vàng trên sân khấu */}
            <div className="absolute top-4 right-6 w-16 h-16 rounded-full bg-yellow-300 shadow-[0_0_35px_#fde047] flex items-center justify-center">
              <div className="w-12 h-12 rounded-full bg-amber-100 opacity-90" />
            </div>

            {/* Mây mờ lững lờ trôi */}
            <motion.div
              animate={{ x: [-20, 20, -20] }}
              transition={{ repeat: Infinity, duration: 8, ease: 'easeInOut' }}
              className="absolute top-8 right-12 text-2xl opacity-60 pointer-events-none"
            >
              ☁️
            </motion.div>

            {/* Đom đóm phát sáng */}
            <div className="absolute top-12 left-10 w-2 h-2 rounded-full bg-yellow-300 animate-ping" />
            <div className="absolute top-24 left-36 w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" style={{ animationDelay: '1.2s' }} />

            {/* Các nhân vật 2D hoạt họa: Em bé & Đầu lân */}
            <div className="relative z-10 flex items-end justify-around px-2 pb-2">
              {/* Em bé rước đèn */}
              <motion.div
                initial={{ x: -90, opacity: 0 }}
                animate={{
                  x: [-90, -64, -42, -18, 6, 28],
                  y: [8, -2, 6, -2, 4, 0],
                  rotate: [-4, 3, -3, 2, -1, 0],
                  opacity: [0, 1, 1, 1, 1, 1],
                }}
                transition={{ duration: 3.8, delay: 0.35, ease: 'easeInOut' }}
                className="cursor-pointer"
                title="Em bé rước đèn ông sao"
              >
                <KidLanternSvg className="w-28 h-44 md:w-32 md:h-48" />
              </motion.div>

              {/* Đầu lân múa rộn rã */}
              <motion.div
                animate={
                  drumBeat
                    ? { scale: [1, 1.25, 0.95, 1], y: [0, -24, 0] }
                    : { y: [0, -14, 0], rotate: [-4, 4, -4] }
                }
                transition={
                  drumBeat
                    ? { duration: 0.3 }
                    : { repeat: Infinity, duration: 2, ease: 'easeInOut' }
                }
                onClick={handleDrumTrigger}
                className="cursor-pointer flex flex-col items-center"
                title="Nhấp để gõ trống lân tung hoa!"
              >
                <LionDanceSvg className="w-28 h-28 md:w-32 md:h-32" />
                <span className="mt-1 text-[10px] bg-amber-400 text-red-950 font-bold px-2 py-0.5 rounded-full shadow">
                  Gõ trống lân 🥁
                </span>
              </motion.div>
            </div>

            {/* Thảm cỏ lễ hội */}
            <div className="absolute bottom-0 inset-x-0 h-4 bg-gradient-to-t from-emerald-950 to-transparent opacity-80" />
                </div>

                <p className="text-xs text-amber-200/80 italic">
                  &ldquo;Ước nguyện của {userName || 'bạn'} theo dòng sông trăng trôi xa, mang bình an, yêu thương và những điều tốt lành về bên gia đình.&rdquo;
                </p>

                {/* Nút sang bước 7 */}
                <button
                  onClick={onNext}
                  className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-red-950 font-bold text-sm shadow-lg shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
                >
                  <span>Tiếp Tục &bull; Nhận Thư Chúc Mừng</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* ======================================================== */}
      {/* NHÁNH 2: THẢ ĐÈN HOA ĐĂNG (Framer Motion Gấp Giấy & Thuyền Trôi Sóng) */}
      {/* ======================================================== */}
      {selectedOption !== 'ruoc_den' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-sky-500/30 pb-2">
            <span className="text-xs font-bold text-sky-300 uppercase tracking-wider">
              🪷 Thả Hoa Đăng Gửi Gắm Ước Nguyện
            </span>
            <span className="text-[11px] bg-sky-900/60 text-sky-200 px-2.5 py-0.5 rounded-full border border-sky-500/40">
              Dòng sông trăng huyền thoại
            </span>
          </div>

          {/* GIAI ĐOẠN 1: Soạn thảo điều ước & Gấp giấy Origami bằng Framer Motion */}
          {!isWishFolded ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="space-y-3"
            >
              <div className="relative p-4 md:p-5 rounded-2xl bg-gradient-to-b from-[#fef3c7] via-[#fffbeb] to-[#fde68a] text-amber-950 shadow-xl border-2 border-amber-600/40 text-left">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-serif font-bold text-red-900 uppercase tracking-wide">
                    📜 Mảnh Giấy Ước Nguyện Đêm Rằm
                  </span>
                  <Edit3 className="w-4 h-4 text-amber-800" />
                </div>

                <label className="block text-[11px] text-amber-900/80 mb-1 font-medium">
                  Hãy viết điều ước chân thành nhất của bạn vào đây:
                </label>

                <textarea
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  rows={3}
                  maxLength={160}
                  className="w-full p-2.5 bg-white/70 border border-amber-400 rounded-xl text-amber-950 font-serif text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all resize-none shadow-inner"
                  placeholder="Gia đình mạnh khỏe, công việc hanh thông, luôn an yên và ngập tràn tiếng cười..."
                />

                <div className="flex justify-between items-center mt-2 text-[10px] text-amber-800">
                  <span>Người gửi: <strong>{userName || 'Bạn Thân Yêu'}</strong></span>
                  <span>{wishText.length}/160 ký tự</span>
                </div>
              </div>

              {/* Nút bấm gấp giấy hoa đăng */}
              <button
                onClick={() => {
                  logEvent('wish_submitted', { wishText });
                  setIsWishFolded(true);
                }}
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-sky-500 via-teal-500 to-emerald-500 text-white font-bold text-sm shadow-lg shadow-sky-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2"
              >
                <span>Gấp Giấy Hoa Đăng &amp; Thả Lên Sông</span>
                <Sparkles className="w-4 h-4" />
              </button>
            </motion.div>
          ) : (
            /* GIAI ĐOẠN 2: Dòng sông nước trôi lững lờ với thuyền hoa đăng bồng bềnh */
            <div className="space-y-4">
              {/* Dòng sông 2D có sóng lượn */}
              <div className="relative w-full h-64 rounded-2xl overflow-hidden border border-sky-400/40 bg-gradient-to-b from-[#0a102b] via-[#091b36] to-[#041d30] flex flex-col justify-end p-4 shadow-inner">
                {/* Trăng rằm phản chiếu đáy nước */}
                <div className="absolute top-3 right-6 w-14 h-14 rounded-full bg-yellow-200/90 shadow-[0_0_30px_#fde047]" />
                <div className="absolute top-18 right-8 w-10 h-1 rounded-full bg-yellow-200/30 blur-[2px]" />

                {/* Hoa sen nổi lờ lững */}
                <motion.div
                  animate={{ y: [0, -4, 0], x: [0, 6, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                  className="absolute bottom-6 left-6 text-2xl opacity-80"
                >
                  🪷
                </motion.div>
                <motion.div
                  animate={{ y: [0, -3, 0], x: [0, -5, 0] }}
                  transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
                  className="absolute bottom-8 right-12 text-xl opacity-75"
                >
                  🪷
                </motion.div>

                {/* Sóng nước chuyển động lượn sóng */}
                <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-sky-950/90 via-sky-900/40 to-transparent pointer-events-none" />

                {/* Thuyền hoa đăng Origami trôi bồng bềnh (Framer Motion) */}
                <motion.div
                  initial={{ x: -100, opacity: 0, scale: 0.8 }}
                  animate={
                    lanternReleased
                      ? {
                          x: [0, 90, 240],
                          y: [0, -6, 2, -4],
                          scale: [1, 0.86, 0.62],
                          opacity: [1, 0.72, 0],
                          rotate: [-2, 3, -1, 1],
                        }
                      : {
                          x: 0,
                          y: [0, -8, 2, 0],
                          rotate: [-2, 2, -2],
                          opacity: 1,
                          scale: 1,
                        }
                  }
                  transition={
                    lanternReleased
                      ? { duration: 2, ease: 'easeInOut' }
                      : { repeat: Infinity, duration: 3.5, ease: 'easeInOut' }
                  }
                  className="relative z-15 flex flex-col items-center mx-auto"
                >
                  <PaperBoatSvg className="w-36 h-24 md:w-44 md:h-28" hasWish={true} wishText={wishText} />
                </motion.div>

                {/* Điều ước hiển thị dưới dạng gợn sáng */}
                <div className="relative z-20 text-[11px] text-sky-200/90 bg-black/60 px-3 py-1 rounded-full border border-sky-400/30 mx-auto mt-2 max-w-sm truncate">
                  💌 Ước: &ldquo;{wishText}&rdquo;
                </div>
              </div>

              {/* Nút hành động */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => {
                    logEvent('lantern_released');
                    onReleaseLantern();
                  }}
                  disabled={lanternReleased}
                  className="py-3 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-1.5 disabled:cursor-wait disabled:opacity-60"
                >
                  <span>{lanternReleased ? '🌊 Đèn đang trôi...' : '🌊 Xác Nhận Thả Đèn'}</span>
                </button>

                <button
                  onClick={() => {
                    setIsWishFolded(false);
                    setLanternReleased(false);
                  }}
                  className="py-3 px-3 rounded-xl bg-white/10 border border-amber-400/40 text-amber-200 font-bold text-xs hover:bg-white/20 transition-all flex items-center justify-center space-x-1.5"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Ghi Lại Ước Nguyện</span>
                </button>
              </div>

            </div>
          )}
        </div>
      )}
    </motion.div>
  );
}
