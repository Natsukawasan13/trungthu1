import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Step9Goodbye({ userName, isVoiceMuted, playVoiceAudio }) {
  const normalizedUserName = (userName || '')
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/Đ/g, 'D')
    .replace(/\s+/g, ' ')
    .toLocaleLowerCase('vi-VN');
  const isNguyenName = ['nguyen', 'thao nguyen', 'nguyen thao nguyen']
    .includes(normalizedUserName);

  useEffect(() => {
    if (isVoiceMuted) return undefined;

    const timer = setTimeout(() => {
      const voiceFile = isNguyenName ? 'final.mp3' : 'end2.mp3';
      playVoiceAudio(`/assets/audio/${voiceFile}`);
    }, 1000);

    return () => clearTimeout(timer);
  }, [isNguyenName, isVoiceMuted, playVoiceAudio]);

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
