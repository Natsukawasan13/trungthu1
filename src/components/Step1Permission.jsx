import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Video, Mic, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Step1Permission({ onNext, startRecording, isRecording, permissionError, hasMediaAccess }) {
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (hasMediaAccess) onNext();
  }, [hasMediaAccess, onNext]);

  const handleGrantPermission = async () => {
    setIsProcessing(true);
    const success = await startRecording();
    setIsProcessing(false);
    if (!success) return;
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md bg-gradient-to-b from-[#3a0a1a]/95 via-[#200829]/95 to-[#120824]/95 border-2 border-amber-400/60 rounded-3xl p-6 md:p-8 shadow-2xl backdrop-blur-md text-center"
    >
      {/* Icon Camera & Mic */}
      <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-tr from-red-900 to-amber-900 border border-amber-400/50 flex items-center justify-center text-3xl shadow-inner shadow-amber-500/30">
        <Video className="w-8 h-8 text-amber-300 animate-pulse" />
      </div>

      <h2 className="text-xl md:text-2xl font-serif font-bold text-amber-200 mb-2">
        Cấp Quyền Ghi Hình &amp; Âm Thanh
      </h2>

      <p className="text-xs text-amber-200/80 mb-6 leading-relaxed">
        Hãy cấp quyền <strong>Micro</strong> và <strong>Quay màn hình</strong>. Nếu muốn ghi cả âm thanh web, hãy chọn tab này và bật <strong>Chia sẻ âm thanh</strong>.
      </p>

      {/* Feature Highlights */}
      <div className="space-y-2.5 mb-6 text-left text-xs bg-black/40 p-4 rounded-2xl border border-amber-500/25">
        <div className="flex items-center space-x-2.5 text-amber-300">
          <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Ghi lại trọn vẹn lời chúc, ngọn hoa đăng và tiếng cười</span>
        </div>
        <div className="flex items-center space-x-2.5 text-amber-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>Video WebM lưu trữ an toàn ngay trên máy bạn (Blob)</span>
        </div>
        <div className="flex items-center space-x-2.5 text-amber-300">
          <Mic className="w-4 h-4 text-rose-400 shrink-0" />
          <span>Tự động thu âm lời chúc chân thành gửi gắm</span>
        </div>
      </div>

      {/* Permission Error Message */}
      {permissionError && (
        <div className="mb-4 p-3 bg-red-950/80 border border-red-500/50 rounded-xl text-xs text-red-200 text-left flex items-start space-x-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <span>{permissionError}</span>
        </div>
      )}

      {/* Actions */}
      <div className="space-y-3">
        <button
          onClick={handleGrantPermission}
          disabled={isProcessing || isRecording}
          className="w-full py-3.5 px-5 rounded-2xl bg-gradient-to-r from-red-600 via-amber-500 to-yellow-400 text-red-950 font-bold text-sm shadow-lg shadow-amber-500/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center space-x-2 disabled:opacity-60"
        >
          <span>{isProcessing ? 'Đang kích hoạt...' : 'Bắt Đầu Cấp Quyền & Ghi Hình 🎥'}</span>
        </button>

        {/* <button
          onClick={onNext}
          className="w-full py-2 px-4 rounded-xl text-xs text-amber-300/80 hover:text-amber-200 underline transition-colors"
        >
          (Bỏ qua để xem trải nghiệm trực tiếp)
        </button> */}
      </div>
    </motion.div>
  );
}
