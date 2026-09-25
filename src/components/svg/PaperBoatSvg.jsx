import React from 'react';

/**
 * Thuyền giấy hoa đăng nghệ thuật kèm ngọn nến lung linh và đóa hoa sen
 */
export default function PaperBoatSvg({ className = "w-44 h-28", hasWish = false, wishText = "" }) {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {/* Ánh sáng ấm từ ngọn nến */}
      <div className="absolute top-2 w-10 h-10 bg-amber-400/50 rounded-full blur-md animate-pulse" />

      <svg viewBox="0 0 160 100" className="w-full h-full drop-shadow-[0_8px_16px_rgba(2,132,199,0.35)]">
        <defs>
          <linearGradient id="boatHullLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="100%" stopColor="#cbd5e1" />
          </linearGradient>
          <linearGradient id="boatHullRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#e2e8f0" />
          </linearGradient>
          <linearGradient id="boatBase" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#bae6fd" />
            <stop offset="100%" stopColor="#7dd3fc" />
          </linearGradient>
          <linearGradient id="candleFlame" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#fef08a" />
          </linearGradient>
          <linearGradient id="lotusPetal" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="70%" stopColor="#fda4af" />
            <stop offset="100%" stopColor="#fff1f2" />
          </linearGradient>
        </defs>

        {/* Ngọn nến thắp sáng giữa thuyền */}
        {/* Tim nến & thân nến */}
        <rect x="78" y="24" width="4" height="18" fill="#e11d48" rx="1.5" />
        <line x1="80" y1="24" x2="80" y2="19" stroke="#1f2937" strokeWidth="1.5" strokeLinecap="round" />
        
        {/* Ngọn lửa nến bập bùng */}
        <g className="animate-flame origin-bottom">
          <ellipse cx="80" cy="14" rx="4.5" ry="9" fill="url(#candleFlame)" filter="drop-shadow(0 0 6px #f59e0b)" />
          <ellipse cx="80" cy="15" rx="2" ry="4" fill="#ffffff" />
        </g>

        {/* Cánh sen trang trí quanh nến */}
        <path d="M 68 40 Q 60 26 73 34 Z" fill="url(#lotusPetal)" opacity="0.9" />
        <path d="M 92 40 Q 100 26 87 34 Z" fill="url(#lotusPetal)" opacity="0.9" />
        <path d="M 72 40 Q 80 22 88 40 Z" fill="url(#lotusPetal)" opacity="0.95" />

        {/* Thân thuyền gấp giấy Origami */}
        {/* Đáy thuyền nối sóng */}
        <polygon points="15,64 80,90 145,64 120,64 80,74 40,64" fill="url(#boatBase)" stroke="#0284c7" strokeWidth="1.5" />
        {/* Mạn thuyền bên trái */}
        <polygon points="40,64 80,18 80,74" fill="url(#boatHullLeft)" stroke="#38bdf8" strokeWidth="1.2" />
        {/* Mạn thuyền bên phải */}
        <polygon points="80,18 120,64 80,74" fill="url(#boatHullRight)" stroke="#0284c7" strokeWidth="1.2" />

        {/* Mảnh giấy điều ước gấp gọn cài vào thuyền */}
        {hasWish && (
          <g>
            <rect x="71" y="44" width="18" height="15" rx="3" fill="#fef08a" stroke="#d97706" strokeWidth="1.5" />
            <line x1="74" y1="49" x2="86" y2="49" stroke="#b45309" strokeWidth="1" strokeDasharray="1,1" />
            <line x1="74" y1="53" x2="86" y2="53" stroke="#b45309" strokeWidth="1" strokeDasharray="1,1" />
            <text x="80" y="57" textAnchor="middle" fill="#991b1b" fontSize="6" fontWeight="bold" fontFamily="serif">
              ƯỚC
            </text>
          </g>
        )}

        {/* Gợn sóng lăn tăn dưới đáy thuyền */}
        <path d="M 25 78 Q 45 74 65 80 Q 85 86 105 80 Q 125 74 135 78" fill="none" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" opacity="0.65" />
        <path d="M 40 86 Q 60 83 80 88 Q 100 92 120 86" fill="none" stroke="#7dd3fc" strokeWidth="1.2" strokeLinecap="round" opacity="0.45" />
      </svg>
    </div>
  );
}
