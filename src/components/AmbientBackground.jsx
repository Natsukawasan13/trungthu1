import React, { useMemo } from 'react';
import FullMoonSvg from './svg/FullMoonSvg';
import StarLanternSvg from './svg/StarLanternSvg';

export default function AmbientBackground({ isLightsOff }) {
  // Sinh ngẫu nhiên các đốm sáng lấp lánh (sao đêm, đom đóm)
  const sparkles = useMemo(() => {
    return Array.from({ length: 35 }).map((_, i) => ({
      id: i,
      top: `${Math.random() * 95}%`,
      left: `${Math.random() * 98}%`,
      size: `${Math.random() * 3 + 2}px`,
      delay: `${Math.random() * 4}s`,
      duration: `${Math.random() * 3 + 2}s`,
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 transition-colors duration-1000">
      {/* Lớp nền trời đêm huyền ảo */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isLightsOff 
            ? 'bg-[#02040d]' 
            : 'bg-gradient-to-b from-[#050816] via-[#0d122b] to-[#1a0c24]'
        }`} 
      />

      {/* Mặt trăng rằm treo trên cao */}
      <div className="absolute top-6 right-6 md:top-12 md:right-16 transition-all duration-1000">
        <FullMoonSvg 
          className="w-32 h-32 md:w-44 md:h-44" 
          isLightsOff={isLightsOff} 
        />
      </div>

      {/* Lồng đèn lơ lửng bồng bềnh ở hậu cảnh */}
      <div className="absolute top-24 left-10 opacity-70 animate-float-slow">
        <StarLanternSvg className="w-16 h-16 md:w-20 md:h-20" isGlowing={isLightsOff} />
      </div>

      <div className="absolute bottom-28 right-12 opacity-60 animate-float-gentle" style={{ animationDelay: '1.5s' }}>
        <StarLanternSvg className="w-14 h-14 md:w-16 md:h-16" isGlowing={isLightsOff} />
      </div>

      <div className="absolute top-1/2 left-4 opacity-50 animate-float-slow hidden md:block" style={{ animationDelay: '3s' }}>
        <StarLanternSvg className="w-12 h-12" isGlowing={isLightsOff} />
      </div>

      {/* Dải sao lấp lánh và đom đóm */}
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="sparkle"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            animationDuration: s.duration,
            backgroundColor: isLightsOff ? '#fde047' : '#ffffff',
          }}
        />
      ))}

      {/* Lớp phủ bóng tối khi bật chế độ tắt đèn */}
      <div 
        className={`absolute inset-0 bg-black transition-opacity duration-1000 pointer-events-none ${
          isLightsOff ? 'opacity-40' : 'opacity-0'
        }`} 
      />
    </div>
  );
}
