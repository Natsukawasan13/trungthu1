import React from 'react';

/**
 * Bàn tay chỉ ngón trỏ hoạt họa chỉ hướng người dùng đến công tắc tắt đèn
 */
export default function PointingHandSvg({ className = "w-16 h-16", direction = "up" }) {
  // Rotate based on direction
  const rotationMap = {
    up: "-rotate-45",
    upRight: "rotate-0",
    right: "rotate-45",
    down: "rotate-135",
    left: "-rotate-135",
  };

  const rotClass = rotationMap[direction] || "-rotate-45";

  return (
    <div className={`relative flex items-center justify-center animate-point ${className} ${rotClass}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_12px_rgba(245,158,11,0.6)]">
        <defs>
          <linearGradient id="handSkin" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="40%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <radialGradient id="sparkleHand" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#fbbf24" />
          </radialGradient>
        </defs>

        {/* Ngôi sao lấp lánh phát ra từ đầu ngón trỏ */}
        <polygon 
          points="88,8 90,16 98,18 90,20 88,28 86,20 78,18 86,16" 
          fill="url(#sparkleHand)" 
          className="animate-spin origin-[88px_18px]" 
          style={{ animationDuration: '4s' }}
        />

        {/* Cổ tay áo lễ hội đỏ thêu vàng */}
        <rect x="12" y="52" width="22" height="34" rx="4" fill="#991b1b" stroke="#fbbf24" strokeWidth="2" transform="rotate(-30 20 60)" />
        <rect x="22" y="48" width="6" height="32" rx="2" fill="#fbbf24" transform="rotate(-30 20 60)" />

        {/* Bàn tay nắm đấm & ngón trỏ vươn dài */}
        {/* Lòng bàn tay nắm */}
        <ellipse cx="48" cy="54" rx="16" ry="14" fill="url(#handSkin)" stroke="#b45309" strokeWidth="2" />

        {/* Các ngón gập lại (ngón út, nhẫn, giữa) */}
        <rect x="42" y="52" width="16" height="8" rx="4" fill="url(#handSkin)" stroke="#b45309" strokeWidth="1.5" />
        <rect x="46" y="58" width="15" height="8" rx="4" fill="url(#handSkin)" stroke="#b45309" strokeWidth="1.5" />
        <rect x="48" y="64" width="14" height="8" rx="4" fill="url(#handSkin)" stroke="#b45309" strokeWidth="1.5" />

        {/* Ngón cái gập ôm lấy các ngón */}
        <path d="M 36 50 Q 42 42 50 48 Q 50 56 42 58 Z" fill="url(#handSkin)" stroke="#b45309" strokeWidth="1.5" />

        {/* Ngón trỏ chỉ thẳng dứt khoát về phía trước / góc trên */}
        <path 
          d="M 52 46 L 80 22 C 84 18 88 22 84 26 L 58 52 Z" 
          fill="url(#handSkin)" 
          stroke="#b45309" 
          strokeWidth="2" 
          strokeLinejoin="round" 
        />

        {/* Móng tay ngón trỏ */}
        <ellipse cx="80" cy="22" rx="2.5" ry="3.5" fill="#fef3c7" opacity="0.8" transform="rotate(35 80 22)" />
      </svg>
    </div>
  );
}
