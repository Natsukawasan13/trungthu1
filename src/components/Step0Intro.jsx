import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight } from 'lucide-react';
import AiRobotSvg from './svg/AiRobotSvg';

export default function Step0Intro({ onNext, isIntroAudioReady }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg bg-gradient-to-b from-[#3b0b0b]/90 via-[#26081e]/95 to-[#160624]/95 border-2 border-amber-400/60 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md text-center transform transition-all"
    >
      {/* AI Avatar */}
      <div className="relative mx-auto w-24 h-24 mb-4">
        <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-400 to-red-600 animate-ping opacity-25" />
        <div className="relative w-full h-full rounded-full border-2 border-amber-300 bg-red-950/80 flex items-center justify-center overflow-hidden shadow-lg shadow-amber-500/40">
          <AiRobotSvg className="w-20 h-20" />
        </div>
        <span className="absolute bottom-0 right-0 bg-emerald-500 text-[10px] text-white px-2 py-0.5 rounded-full font-bold shadow-md animate-pulse">
          ONLINE
        </span>
      </div>

      {/* Badge */}
      <div className="inline-flex items-center space-x-1.5 bg-amber-400/10 border border-amber-400/40 rounded-full px-3.5 py-1 text-xs text-amber-300 font-semibold mb-3">
        <Sparkles className="w-3.5 h-3.5 text-amber-400" />
        <span>Trợ Lý AI Tết Đoàn Viên</span>
      </div>

      {/* Heading */}
      <h1 className="text-2xl md:text-3xl font-serif font-bold text-amber-200 mb-4 leading-relaxed">
        Đêm Hội Trăng Rằm Cùng AI
      </h1>

      {/* Message Quote */}
      <div className="bg-black/45 border border-amber-500/30 rounded-2xl p-4 md:p-5 mb-6 text-sm text-amber-100/90 leading-relaxed text-left font-medium relative shadow-inner">
        <p className="italic">
          &ldquo;Chào bạn tôi là AI được tạo ra bởi <strong className="text-amber-300 font-bold">Long</strong> và <strong className="text-amber-300 font-bold">Tuấn</strong>, tôi được giao nhiệm vụ là sẽ đồng hành cùng với bạn trong buổi tối Trung Thu ngày hôm nay, trước khi vào tiết mục chính bạn hãy cho phép tôi mở chế độ quay và micro để quay lại những kỷ niệm ngày hôm nay bạn nhé.&rdquo;
        </p>
        <p className="mt-3 border-t border-amber-500/20 pt-3 text-[11px] leading-relaxed text-amber-300/75">
          (Chú ý, tôi được tạo ra dựa trên dữ liệu tính cách của Long và Tuấn nên những lời nói và cách hành xử có thể sẽ không giống những AI bạn thấy trước đó.)
        </p>
      </div>

      {/* Action Button */}
      <button
        onClick={onNext}
        disabled={!isIntroAudioReady}
        className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 text-red-950 font-bold text-base shadow-lg shadow-amber-500/40 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        <span>{isIntroAudioReady ? 'Tôi Đồng Ý' : 'Đang phát lời chào...'}</span>
        <ArrowRight className="w-5 h-5 text-red-950" />
      </button>
    </motion.div>
  );
}
