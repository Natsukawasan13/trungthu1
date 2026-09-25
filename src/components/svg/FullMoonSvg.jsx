import React from 'react';

/**
 * Trăng tròn rực rỡ với nhiều lớp hào quang phát sáng
 */
export default function FullMoonSvg({ className = "w-28 h-28", isLightsOff = false }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Hào quang tỏa rộng khi tắt đèn */}
      <div 
        className={`absolute rounded-full transition-all duration-1000 ${
          isLightsOff 
            ? 'w-44 h-44 bg-amber-300/35 blur-2xl animate-pulse' 
            : 'w-32 h-32 bg-yellow-200/20 blur-xl'
        }`} 
      />
      <div 
        className={`absolute rounded-full transition-all duration-1000 ${
          isLightsOff 
            ? 'w-36 h-36 bg-amber-400/30 blur-lg' 
            : 'w-28 h-28 bg-amber-200/15 blur-md'
        }`} 
      />

      {/* Đĩa mặt trăng SVG chính xác */}
      <svg 
        viewBox="0 0 100 100" 
        className={`w-full h-full relative z-10 transition-transform duration-700 ${isLightsOff ? 'scale-110 drop-shadow-[0_0_35px_rgba(251,191,36,0.95)]' : 'drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]'}`}
      >
        <defs>
          <radialGradient id="moonGlow" cx="40%" cy="40%" r="60%">
            <stop offset="0%" stopColor="#fffdf0" />
            <stop offset="45%" stopColor="#fef08a" />
            <stop offset="80%" stopColor="#fde047" />
            <stop offset="100%" stopColor="#eab308" />
          </radialGradient>
          <filter id="moonCrater" x="0" y="0" width="100%" height="100%">
            <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="3" result="noise" />
            <feColorMatrix type="matrix" values="0 0 0 0 0.85  0 0 0 0 0.7  0 0 0 0 0.3  0 0 0 0.18 0" />
            <feComposite in2="SourceGraphic" in="gl" operator="in" />
          </filter>
        </defs>

        {/* Mặt trăng */}
        <circle cx="50" cy="50" r="46" fill="url(#moonGlow)" />
        
        {/* Họa tiết vết chân chim / miệng núi lửa mờ ảo truyền thống */}
        <circle cx="34" cy="38" r="8" fill="#ca8a04" opacity="0.18" />
        <circle cx="62" cy="42" r="11" fill="#ca8a04" opacity="0.14" />
        <circle cx="48" cy="65" r="14" fill="#ca8a04" opacity="0.16" />
        <circle cx="30" cy="58" r="6" fill="#ca8a04" opacity="0.12" />
        <ellipse cx="68" cy="62" rx="7" ry="5" fill="#ca8a04" opacity="0.15" />
        
        {/* Bóng hình cây đa & Chú Cuội mờ ảo */}
        <path 
          d="M 45 74 Q 48 55 52 48 Q 50 42 46 45 Q 40 40 47 35 Q 56 32 60 40 Q 66 38 64 45 Q 70 48 64 54 Q 60 68 56 74 Z" 
          fill="#a16207" 
          opacity="0.22" 
        />
      </svg>
    </div>
  );
}
