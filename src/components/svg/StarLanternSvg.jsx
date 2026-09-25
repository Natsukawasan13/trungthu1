import React from 'react';

/**
 * Lồng đèn ông sao năm cánh truyền thống
 */
export default function StarLanternSvg({ className = "w-20 h-20", isGlowing = true }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {isGlowing && (
        <div className="absolute inset-0 bg-amber-400/30 rounded-full blur-md animate-pulse" />
      )}
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_12px_rgba(245,158,11,0.7)]">
        <defs>
          <radialGradient id="starGlass" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="85%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </radialGradient>
        </defs>

        {/* Khung tre tròn giữ form ngôi sao */}
        <circle cx="50" cy="50" r="38" fill="none" stroke="#b45309" strokeWidth="2.5" />
        <circle cx="50" cy="50" r="35" fill="none" stroke="#f59e0b" strokeWidth="1" strokeDasharray="3,3" />

        {/* Các que nan tre chống khung hình chóp */}
        <line x1="50" y1="12" x2="50" y2="88" stroke="#92400e" strokeWidth="1.2" opacity="0.6" />
        <line x1="14" y1="38" x2="86" y2="62" stroke="#92400e" strokeWidth="1.2" opacity="0.6" />
        <line x1="14" y1="62" x2="86" y2="38" stroke="#92400e" strokeWidth="1.2" opacity="0.6" />

        {/* Ngôi sao 5 cánh giấy kính bóng đỏ viền vàng */}
        <polygon 
          points="50,10 59,38 88,38 64,56 73,84 50,66 27,84 36,56 12,38 41,38" 
          fill="url(#starGlass)" 
          stroke="#ef4444" 
          strokeWidth="2.5" 
          strokeLinejoin="round" 
        />

        {/* Tâm đèn tròn - nơi cắm nến */}
        <circle cx="50" cy="50" r="10" fill="#fef08a" stroke="#dc2626" strokeWidth="2" />
        <circle cx="50" cy="50" r="5" fill="#ef4444" />
        <circle cx="50" cy="50" r="2" fill="#ffffff" />

        {/* Tua rua 3 màu rực rỡ dưới đáy */}
        <path d="M 50 88 L 50 98" stroke="#dc2626" strokeWidth="2" strokeLinecap="round" />
        <path d="M 46 87 L 42 96" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />
        <path d="M 54 87 L 58 96" stroke="#10b981" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
}
