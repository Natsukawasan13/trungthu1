import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Circle, RotateCcw, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';

export default function Step7Celebration({
  userName,
  isRecording,
  playVoiceAudio,
  isVoiceMuted,
  onRestartChoice,
  onOpenMessage,
  onContinue,
}) {
  const normalizedUserName = (userName || '')
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('vi-VN');
  const showPersonalMessage = ['nguyen', 'thao nguyen', 'nguyen thao nguyen']
    .includes(normalizedUserName);
  useEffect(() => {
    if (isVoiceMuted) return undefined;

    const timer = setTimeout(() => {
      playVoiceAudio('/assets/audio/loichuc.mp3');
    }, 1000);

    return () => clearTimeout(timer);
  }, [isVoiceMuted, playVoiceAudio]);

  // Bắn pháo hoa rực rỡ khi hoàn thành hành trình
  useEffect(() => {
    try {
      const end = Date.now() + 2 * 1000;
      const frame = () => {
        confetti({
          particleCount: 3,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#fbbf24', '#f59e0b', '#dc2626'],
        });
        confetti({
          particleCount: 3,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#fbbf24', '#f59e0b', '#dc2626'],
        });
        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    } catch (e) {
      console.warn("Confetti error", e);
    }
  }, []);

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#ef4444', '#fde047'],
      });
    } catch (e) {
      console.warn("Confetti error", e);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg letter-paper border-4 border-amber-600/50 rounded-3xl p-6 md:p-8 shadow-2xl text-center text-amber-950 relative overflow-hidden animate-float-gentle"
    >
      {/* Con dấu đỏ cổ truyền Đoàn Viên */}
      <div className="absolute top-4 right-4 w-16 h-16 rounded-full border-2 border-red-700/60 p-1 flex items-center justify-center text-[10px] text-red-800 font-bold uppercase rotate-12 pointer-events-none select-none shadow-sm">
        <div className="w-full h-full rounded-full border border-dashed border-red-700/50 flex flex-col items-center justify-center font-festive leading-tight">
          <span>Đoàn</span>
          <span>Viên</span>
        </div>
      </div>

      {/* Biểu tượng lễ hội */}
      <div className="text-3xl mb-1 cursor-pointer select-none" onClick={triggerConfetti} title="Nhấp để tung hoa!">
        🥮 🏮 🥮
      </div>

      <h1 className="text-2xl md:text-3xl font-serif font-bold text-red-900 tracking-wide mb-1">
        CHÚC MỪNG TẾT TRUNG THU
      </h1>

      <p className="text-xs text-amber-800 font-semibold uppercase tracking-widest mb-4">
        Đêm Rằm Tháng Tám &bull; Kỷ Niệm Yêu Thương
      </p>

      {/* Nội dung bức thư chúc mừng */}
      <div className="bg-white/60 border border-amber-400/40 rounded-2xl p-5 mb-5 text-left text-sm leading-relaxed text-amber-950 font-medium space-y-3 font-serif shadow-inner">
        <p>
          Thân gửi <strong>{userName || 'Bạn Thân Yêu'}</strong>,
        </p>
        <p>
          Nhân dịp Tết Trung Thu trăng tròn vành vạnh, chúc bạn cùng gia đình luôn dồi dào sức khỏe, bình an, vạn sự hanh thông và luôn ngập tràn tiếng cười rạng rỡ.
        </p>
        <p>
          Mong rằng những ước nguyện chân thành bạn vừa gửi gắm theo ánh đèn ông sao và ngọn hoa đăng đêm nay sẽ đều sớm trở thành hiện thực ngọt ngào nhất!
        </p>

        {/* Chữ ký nghệ thuật */}
        <div className="pt-2 text-right">
          <p className="text-xs text-amber-900 italic">Thân ái,</p>
          <p className="text-2xl md:text-3xl font-script font-bold text-red-900 tracking-wider">
            LongDaiCa
          </p>
          <p className="text-[11px] text-amber-800 font-sans font-semibold">
            &amp; Tuán hay nói
          </p>
        </div>
      </div>

      {/* Các nút hành động */}
      <div className="space-y-3">
        <div className="w-full py-3.5 px-6 rounded-2xl bg-red-900/10 border border-red-700/20 text-red-900 font-bold text-sm flex items-center justify-center space-x-2">
          <Circle className={`w-3.5 h-3.5 fill-red-600 text-red-600 ${isRecording ? 'animate-pulse' : ''}`} />
          <span>{isRecording ? 'Đang quay kỷ niệm...' : 'File kyniem.webm sẽ tự tải khi bạn rời trang'}</span>
        </div>

        <button
          type="button"
          onClick={showPersonalMessage ? onOpenMessage : onContinue}
          className="w-full rounded-2xl border border-red-700/30 bg-white/30 px-5 py-3 text-sm font-bold text-red-900 transition hover:bg-white/50 active:scale-95"
        >
          {showPersonalMessage ? 'Lời nhắn của tôi 💌' : 'Tiếp'}
        </button>

        {/* Nút quay lại trải nghiệm nhánh khác */}
        <div className="flex items-center justify-center space-x-4 pt-1">
          <button
            onClick={onRestartChoice}
            className="flex items-center space-x-1.5 text-xs text-red-900/80 hover:text-red-950 underline font-semibold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khám phá lại nhánh trải nghiệm khác</span>
          </button>

          <button
            onClick={triggerConfetti}
            className="flex items-center space-x-1.5 text-xs text-amber-900 hover:text-amber-950 font-semibold transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-600" />
            <span>Bắn Pháo Hoa 🎉</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
}
