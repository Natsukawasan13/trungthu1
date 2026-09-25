import React from 'react';

/**
 * Đầu lân ngũ sắc truyền thống (Múa Lân Tết Trung Thu)
 */
export default function LionDanceSvg({ className = "w-36 h-36" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 160 160" className="w-full h-full drop-shadow-[0_8px_20px_rgba(220,38,38,0.55)]">
        <defs>
          <radialGradient id="lionFaceGradient" cx="40%" cy="34%" r="72%">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="42%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </radialGradient>
          <linearGradient id="lionGoldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          <linearGradient id="lionFurGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#fde68a" />
            <stop offset="48%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#92400e" />
          </linearGradient>
          <filter id="lionEyeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        <ellipse cx="80" cy="151" rx="44" ry="5" fill="#050816" opacity="0.38" />
        <path d="M 80 11 L 70 34 L 90 34 Z" fill="url(#lionGoldGradient)" stroke="#991b1b" strokeWidth="2" />
        <circle cx="80" cy="15" r="5" fill="#ef4444" stroke="#fef08a" strokeWidth="1" />

        <path d="M 31 42 Q 18 20 35 15 Q 48 18 53 39 Z" fill="#dc2626" stroke="#fbbf24" strokeWidth="3" />
        <path d="M 129 42 Q 142 20 125 15 Q 112 18 107 39 Z" fill="#dc2626" stroke="#fbbf24" strokeWidth="3" />
        <path d="M 35 29 Q 41 23 47 33 M 125 29 Q 119 23 113 33" stroke="#fef08a" strokeWidth="2" fill="none" />

        <path d="M 23 58 Q 13 72 26 84 Q 14 99 31 108 Q 38 127 55 119 Q 68 137 80 124 Q 92 137 105 119 Q 122 127 129 108 Q 146 99 134 84 Q 147 72 137 58 Q 137 38 119 38 Q 110 19 94 29 Q 80 12 66 29 Q 50 19 41 38 Q 23 38 23 58 Z" fill="url(#lionFurGradient)" stroke="#fcd34d" strokeWidth="2.5" />

        <circle cx="80" cy="77" r="49" fill="url(#lionFaceGradient)" stroke="url(#lionGoldGradient)" strokeWidth="4" />
        <path d="M 38 51 Q 80 25 122 51" stroke="#fcd34d" strokeWidth="4" fill="none" opacity="0.8" />
        <path d="M 44 112 Q 80 139 116 112" stroke="#991b1b" strokeWidth="3" fill="none" opacity="0.8" />

        <circle cx="80" cy="48" r="13" fill="#38bdf8" opacity="0.35" filter="url(#lionEyeGlow)" />
        <circle cx="80" cy="48" r="10" fill="#38bdf8" stroke="#fef08a" strokeWidth="2.5" />
        <path d="M 80 41 L 80 55 M 73 48 L 87 48" stroke="#e0f2fe" strokeWidth="1.5" />
        <circle cx="80" cy="48" r="3" fill="#fff" />

        <path d="M 34 66 Q 49 51 64 64" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M 96 64 Q 111 51 126 66" stroke="#fbbf24" strokeWidth="6" strokeLinecap="round" fill="none" />
        <ellipse cx="52" cy="73" rx="18" ry="21" fill="#fff7ed" stroke="#fbbf24" strokeWidth="2.5" />
        <ellipse cx="108" cy="73" rx="18" ry="21" fill="#fff7ed" stroke="#fbbf24" strokeWidth="2.5" />
        <circle cx="53" cy="76" r="10" fill="#27204a" />
        <circle cx="107" cy="76" r="10" fill="#27204a" />
        <circle cx="49" cy="71" r="3.5" fill="#fff" />
        <circle cx="103" cy="71" r="3.5" fill="#fff" />
        <circle cx="56" cy="81" r="2" fill="#93c5fd" />
        <circle cx="110" cy="81" r="2" fill="#93c5fd" />

        <path d="M 80 68 Q 66 72 67 86 Q 80 96 93 86 Q 94 72 80 68 Z" fill="#dc2626" stroke="#fef08a" strokeWidth="2.5" />
        <circle cx="75" cy="78" r="3" fill="#fff" opacity="0.8" />
        <path d="M 40 101 Q 80 134 120 101 Q 113 133 80 140 Q 47 133 40 101 Z" fill="#17131f" stroke="#fbbf24" strokeWidth="2.5" />
        <path d="M 59 110 L 59 120 Q 65 124 70 117 L 70 111 Z M 90 111 L 90 117 Q 95 124 101 120 L 101 110 Z" fill="#fff7ed" />
        <path d="M 65 121 Q 80 132 95 121 Q 92 135 80 137 Q 68 135 65 121 Z" fill="#f43f5e" />
        <path d="M 49 130 Q 80 148 111 130" stroke="#f59e0b" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}
