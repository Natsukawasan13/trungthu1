import React from 'react';

/**
 * Trợ lý AI Tết Trung Thu dễ thương do Long & Tuấn kiến tạo
 */
export default function AiRobotSvg({ className = "w-24 h-24" }) {
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_4px_16px_rgba(245,158,11,0.5)]">
        <defs>
          <radialGradient id="aiFace" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1e1b4b" />
            <stop offset="85%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#020617" />
          </radialGradient>
        </defs>

        {/* Vành tai nghe lồng đèn */}
        <circle cx="10" cy="50" r="7" fill="#dc2626" stroke="#fbbf24" strokeWidth="2" />
        <circle cx="90" cy="50" r="7" fill="#dc2626" stroke="#fbbf24" strokeWidth="2" />

        {/* Khung đầu bo tròn công nghệ */}
        <circle cx="50" cy="50" r="40" fill="url(#aiFace)" stroke="#f59e0b" strokeWidth="3" />

        {/* Chỏm đèn ông sao mini trên đỉnh đầu */}
        <line x1="50" y1="10" x2="50" y2="4" stroke="#f59e0b" strokeWidth="2" />
        <polygon 
          points="50,0 52,5 57,5 53,8 55,13 50,10 45,13 47,8 43,5 48,5" 
          fill="#ef4444" 
          stroke="#fef08a" 
          strokeWidth="0.8" 
        />

        {/* Đôi mắt màn hình LED xanh ngọc bích */}
        <circle cx="36" cy="46" r="7.5" fill="#38bdf8" />
        <circle cx="64" cy="46" r="7.5" fill="#38bdf8" />
        
        {/* Điểm sáng trong mắt */}
        <circle cx="34" cy="44" r="2.5" fill="#ffffff" />
        <circle cx="62" cy="44" r="2.5" fill="#ffffff" />

        {/* Má hồng điện tử */}
        <circle cx="28" cy="56" r="3.5" fill="#f43f5e" opacity="0.6" />
        <circle cx="72" cy="56" r="3.5" fill="#f43f5e" opacity="0.6" />

        {/* Nụ cười LED vàng cam */}
        <path d="M 38 64 Q 50 74 62 64" stroke="#fbbf24" strokeWidth="3.5" fill="none" strokeLinecap="round" />
      </svg>
    </div>
  );
}
