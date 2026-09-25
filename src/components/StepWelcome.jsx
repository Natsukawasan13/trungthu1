import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Headphones } from 'lucide-react';

export default function StepWelcome({ onNext }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md text-center"
    >
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="mb-8 font-serif text-5xl font-bold tracking-wide text-amber-200 drop-shadow-[0_0_18px_rgba(251,191,36,0.45)] md:text-6xl"
      >
        Xin chào
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: [0.65, 1, 0.65], y: 0 }}
        transition={{ delay: 0.35, duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        className="mb-6 flex items-center justify-center gap-2 text-base font-semibold text-amber-300"
      >
        <Headphones className="h-4 w-4" />
        <span>Đeo tai nghe vào để cảm nhận tốt hơn</span>
      </motion.p>

      <motion.button
        type="button"
        onClick={onNext}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.5 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.96 }}
        className="inline-flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 px-8 py-3.5 text-base font-bold text-red-950 shadow-lg shadow-amber-500/40"
      >
        <span>Gô</span>
        <ArrowRight className="h-5 w-5" />
      </motion.button>
    </motion.div>
  );
}
