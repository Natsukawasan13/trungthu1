import React from 'react';
import matechImage from '../../assets/matech.png';

/**
 * Em bé mặc áo dài truyền thống tay cầm lồng đèn ông sao cán tre
 */
export default function KidLanternSvg({ className = "w-32 h-52" }) {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      <svg viewBox="0 0 180 240" className="w-full h-full drop-shadow-[0_5px_14px_rgba(239,68,68,0.3)]">
        <defs>
          <radialGradient id="kidFaceGradient" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#ffedd5" />
            <stop offset="100%" stopColor="#fed7aa" />
          </radialGradient>
          <linearGradient id="aoDaiGradient" x1="15%" y1="0%" x2="90%" y2="100%">
            <stop offset="0%" stopColor="#f43f5e" />
            <stop offset="45%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#7f1d1d" />
          </linearGradient>
          <linearGradient id="lanternPaperGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="38%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#dc2626" />
          </linearGradient>
          <filter id="lanternGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="5" />
          </filter>
          <clipPath id="frogFaceClip" clipPathUnits="userSpaceOnUse">
            <path d="M 49 82 Q 51 58 75 56 Q 99 58 101 82 Q 99 107 75 110 Q 51 107 49 82 Z" />
          </clipPath>
        </defs>

        <ellipse cx="78" cy="227" rx="36" ry="6" fill="#050816" opacity="0.4" />

        <path d="M 76 132 L 132 43" stroke="#6b3f1d" strokeWidth="5" strokeLinecap="round" />
        <path d="M 76 132 L 132 43" stroke="#d6a15d" strokeWidth="1.4" strokeLinecap="round" />
        <circle cx="132" cy="43" r="34" fill="#fbbf24" opacity="0.22" filter="url(#lanternGlow)" />
        <circle cx="132" cy="43" r="28" fill="none" stroke="#a16207" strokeWidth="2.5" />
        <circle cx="132" cy="43" r="24" fill="none" stroke="#fcd34d" strokeWidth="1" strokeDasharray="4 3" />
        <path d="M 132 13 L 140 34 L 163 34 L 145 47 L 152 70 L 132 56 L 112 70 L 119 47 L 101 34 L 124 34 Z" fill="url(#lanternPaperGradient)" stroke="#991b1b" strokeWidth="2.2" strokeLinejoin="round" />
        <path d="M 132 18 L 132 66 M 106 34 L 158 52 M 106 52 L 158 34" stroke="#b45309" strokeWidth="1" opacity="0.5" />
        <circle cx="132" cy="43" r="7" fill="#ef4444" stroke="#fef08a" strokeWidth="1.5" />
        <circle cx="129.5" cy="40.5" r="2.2" fill="#fff" />
        <path d="M 132 70 L 132 83 M 126 69 L 121 81 M 138 69 L 143 81" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" />

        <path d="M 45 86 Q 45 60 71 54 Q 98 55 102 85 L 96 103 L 51 103 Z" fill="#17132f" />
        <path d="M 48 70 Q 52 45 75 45 Q 99 46 102 70 L 94 80 Q 84 68 73 70 Q 60 69 52 80 Z" fill="#29234f" />
        <path d="M 51 77 Q 56 57 75 57 Q 94 57 99 77 Q 89 70 76 71 Q 63 70 51 77 Z" fill="#29234f" />
        <image
          href={matechImage}
          x="49"
          y="56"
          width="52"
          height="54"
          preserveAspectRatio="xMidYMid slice"
          clipPath="url(#frogFaceClip)"
        />
        <path d="M 51 82 Q 51 59 75 56 Q 99 59 101 82" stroke="#c2410c" strokeWidth="1.2" fill="none" opacity="0.7" />

        <path d="M 49 111 Q 75 104 101 111 L 111 177 Q 75 189 39 177 Z" fill="url(#aoDaiGradient)" stroke="#701a22" strokeWidth="1.5" />
        <path d="M 75 110 L 75 179 M 53 120 Q 75 132 97 120" stroke="#fda4af" strokeWidth="1.2" opacity="0.5" fill="none" />
        <path d="M 56 110 Q 75 122 94 110" stroke="#fcd34d" strokeWidth="3" fill="none" />
        <path d="M 43 143 Q 75 151 107 143" stroke="#f59e0b" strokeWidth="8" opacity="0.95" />
        <rect x="69" y="140" width="12" height="13" rx="2" fill="#fcd34d" stroke="#b45309" strokeWidth="1" />

        <path d="M 52 119 Q 41 124 38 143 Q 45 149 54 142 L 66 128 Z" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="1.2" />
        <path d="M 95 119 Q 106 119 111 132 Q 107 139 99 137 L 88 127 Z" fill="#c02636" stroke="#7f1d1d" strokeWidth="1.2" />
        <circle cx="39" cy="143" r="6" fill="url(#kidFaceGradient)" />
        <circle cx="104" cy="135" r="6" fill="url(#kidFaceGradient)" />

        <path d="M 51 177 L 68 177 L 66 214 L 49 214 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 82 177 L 99 177 L 101 214 L 84 214 Z" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
        <path d="M 45 211 Q 57 207 70 214 Q 66 224 48 223 Q 40 221 45 211 Z" fill="#991b1b" />
        <path d="M 80 214 Q 92 207 105 212 Q 109 220 99 223 Q 84 224 80 214 Z" fill="#991b1b" />
      </svg>
    </div>
  );
}
