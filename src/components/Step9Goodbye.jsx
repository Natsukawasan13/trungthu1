import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Step9Goodbye({ isVoiceMuted, playVoiceAudio }) {
  useEffect(() => {
    if (isVoiceMuted) return undefined;

    const timer = setTimeout(() => {
      playVoiceAudio('/assets/audio/final.mp3');
    }, 1000);

    return () => clearTimeout(timer);
  }, [isVoiceMuted, playVoiceAudio]);

  return (
    <motion.h1
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center font-serif text-4xl font-bold tracking-wide text-amber-200 md:text-6xl"
    >
      Hẹn gặp lại
    </motion.h1>
  );
}
