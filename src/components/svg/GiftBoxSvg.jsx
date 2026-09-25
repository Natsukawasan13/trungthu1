import React from 'react';

/**
 * Hộp quà Tết Trung Thu thắt nơ vàng hoàng kim
 */
export default function GiftBoxSvg({ className = "w-28 h-28", isOpen = false }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_10px_20px_rgba(153,27,27,0.5)]">
        <defs>
          <linearGradient id="boxBody" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="50%" stopColor="#b91c1c" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </linearGradient>
          <linearGradient id="ribbonGold" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>

        {/* Thân hộp quà */}
        <rect x="22" y="44" width="56" height="46" rx="6" fill="url(#boxBody)" stroke="#fbbf24" strokeWidth="2" />
        
        {/* Ruy băng vàng dọc thân */}
        <rect x="44" y="44" width="12" height="46" fill="url(#ribbonGold)" stroke="#b45309" strokeWidth="0.5" />

        {/* Họa tiết hoa văn mây Trung Thu trên thân hộp */}
        <circle cx="34" cy="65" r="4" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.6" />
        <circle cx="66" cy="65" r="4" fill="none" stroke="#f59e0b" strokeWidth="1" opacity="0.6" />

        {/* Nắp hộp quà (mở hoặc đóng) */}
        <g className={`transition-all duration-500 origin-[20px_40px] ${isOpen ? '-translate-y-8 -rotate-12' : ''}`}>
          {/* Vành nắp hộp */}
          <rect x="18" y="32" width="64" height="15" rx="4" fill="url(#boxBody)" stroke="#fbbf24" strokeWidth="2" />
          {/* Ruy băng ngang nắp */}
          <rect x="44" y="32" width="12" height="15" fill="url(#ribbonGold)" stroke="#b45309" strokeWidth="0.5" />

          {/* Chiếc nơ vàng bồng bềnh trên đỉnh */}
          {/* Cánh nơ trái */}
          <path d="M 50 32 C 30 18 25 30 50 32 Z" fill="url(#ribbonGold)" stroke="#b45309" strokeWidth="1" />
          {/* Cánh nơ phải */}
          <path d="M 50 32 C 70 18 75 30 50 32 Z" fill="url(#ribbonGold)" stroke="#b45309" strokeWidth="1" />
          {/* Tâm nơ tròn */}
          <circle cx="50" cy="32" r="4" fill="#fbbf24" stroke="#d97706" strokeWidth="1" />
          {/* Dải ruy băng rủ */}
          <path d="M 48 34 Q 38 42 42 46" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
          <path d="M 52 34 Q 62 42 58 46" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" fill="none" />
        </g>
      </svg>
    </div>
  );
}
