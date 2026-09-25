import React, { useEffect, useState } from 'react';
import { Send, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { logEvent } from '../utils/logEvent';

export default function Step8Message({ isVoiceMuted, playVoiceAudio, onSubmitMessage }) {
  const [answer, setAnswer] = useState(null);
  const [thought, setThought] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isReading, setIsReading] = useState(false);
  const [isVoiceSequenceComplete, setIsVoiceSequenceComplete] = useState(false);

  useEffect(() => {
    if (!answer || answer !== 'yes' || isVoiceMuted) {
      setIsReading(false);
      setIsVoiceSequenceComplete(true);
      return undefined;
    }

    setIsReading(true);
    setIsVoiceSequenceComplete(false);
    let endTimer;
    const finishVoiceSequence = () => {
      setIsReading(false);
      setIsVoiceSequenceComplete(true);
    };

    const timer = setTimeout(() => {
      playVoiceAudio('/assets/audio/doc.mp3', {
        onEnded: () => {
          endTimer = setTimeout(() => {
            playVoiceAudio('/assets/audio/end.mp3', {
              onEnded: finishVoiceSequence,
              onError: finishVoiceSequence,
            });
          }, 1000);
        },
        onError: finishVoiceSequence,
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearTimeout(endTimer);
    };
  }, [answer, isVoiceMuted, playVoiceAudio]);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsSubmitted(true);
    logEvent('message_sent', { answer, thought });
    await onSubmitMessage({ answer, thought });
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.92, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -20 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-lg rounded-3xl border-2 border-amber-400/60 bg-gradient-to-b from-[#3a0a1a]/95 via-[#230829]/95 to-[#120824]/95 p-6 text-center shadow-2xl md:p-8"
    >
      <div className="mb-3 text-4xl">💌</div>
      <h1 className="mb-2 text-2xl font-serif font-bold text-amber-200">
        Lời nhắn của tôi
      </h1>
      <p className="mb-6 text-sm leading-relaxed text-amber-100/90">
        À, lời chúc trên tôi trích từ một quyển sách mà tôi từng đọc. Mà lúc trước tôi định rủ em đi chơi Trung Thu, sợ em bận quá nên thôi, hahaha.
      </p>

      {answer === null ? (
        <div className="rounded-2xl border border-amber-400/30 bg-black/30 p-4">
          <p className="mb-4 text-sm font-semibold text-amber-200">
            Bạn có muốn tôi đọc cái này không?
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setAnswer('yes')}
              className="rounded-2xl bg-amber-400 px-4 py-3 font-bold text-red-950 transition hover:bg-amber-300 active:scale-95"
            >
              Có
            </button>
            <button
              type="button"
              onClick={() => setAnswer('no')}
              className="rounded-2xl border border-amber-400/60 bg-red-900/70 px-4 py-3 font-bold text-amber-200 transition hover:bg-red-800 active:scale-95"
            >
              Không
            </button>
          </div>
        </div>
      ) : (
        <div className="mb-5 rounded-2xl border border-amber-400/30 bg-black/30 p-4 text-sm text-amber-200">
          {answer === 'yes' && isReading ? (
            <span className="flex items-center justify-center gap-2">
              <Volume2 className="h-4 w-4 animate-pulse" />
              Đang chuẩn bị đọc lời nhắn...
            </span>
          ) : answer === 'yes' ? (
            'Mình đã đọc lời nhắn cho bạn rồi.'
          ) : (
            'Được rồi, mình để bạn đọc nhé.'
          )}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-5 space-y-3 text-left">
        <label htmlFor="message-thought" className="block text-xs font-semibold text-amber-300">
          Suy nghĩ của bạn
        </label>
        <textarea
          id="message-thought"
          value={thought}
          onChange={event => setThought(event.target.value)}
          rows={4}
          placeholder="Viết vài dòng gửi lại nhé..."
          className="w-full resize-none rounded-2xl border-2 border-amber-500/40 bg-black/50 px-4 py-3 text-sm text-amber-100 placeholder-amber-400/40 focus:border-amber-400 focus:outline-none"
        />
        <button
          type="submit"
          disabled={answer === null || (answer === 'yes' && !isVoiceSequenceComplete)}
          className="flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-500 to-yellow-500 px-5 py-3.5 text-sm font-bold text-red-950 shadow-lg shadow-amber-500/30 transition hover:scale-[1.02] active:scale-95 disabled:pointer-events-none disabled:opacity-50"
        >
          <Send className="h-4 w-4" />
          {isSubmitted ? 'Đã gửi lời nhắn' : 'Gửi lời nhắn'}
        </button>
      </form>
    </motion.div>
  );
}
