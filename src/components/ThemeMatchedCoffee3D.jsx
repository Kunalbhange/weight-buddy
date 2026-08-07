import React, { useEffect, useState } from 'react';

export const ThemeMatchedCoffee3D = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Liquid slosh wave calculation based on scroll
  const waveOffset = Math.sin(scrollY * 0.008) * 12;
  const cupTilt = Math.sin(scrollY * 0.004) * 8;
  const cupTranslateY = scrollY * 0.08;

  return (
    <div style={{
      position: 'fixed',
      right: '4%',
      top: '25%',
      width: '260px',
      height: '360px',
      pointerEvents: 'none',
      zIndex: 1,
      perspective: '1000px',
      opacity: 0.85
    }}>
      {/* Warm Gold Glow Aura */}
      <div style={{
        position: 'absolute',
        top: '40%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '200px',
        height: '200px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(217, 119, 6, 0.22) 0%, rgba(251, 191, 36, 0.08) 55%, transparent 75%)',
        filter: 'blur(35px)',
        animation: 'coffeeGlowPulse 4s ease-in-out infinite'
      }} />

      {/* 3D Theme-Matched Coffee Glass Vessel */}
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transform: `translateY(${-cupTranslateY}px) rotate(${cupTilt}deg)`,
        transition: 'transform 0.15s cubic-bezier(0.1, 0.9, 0.2, 1)'
      }}>
        {/* Steam Animation */}
        <div style={{ position: 'absolute', top: '10px', left: '42%', display: 'flex', gap: '10px', zIndex: 2 }}>
          <div className="coffee-steam steam-1" style={{ background: 'linear-gradient(to top, rgba(251, 191, 36, 0.5), transparent)' }} />
          <div className="coffee-steam steam-2" style={{ background: 'linear-gradient(to top, rgba(217, 119, 6, 0.5), transparent)' }} />
          <div className="coffee-steam steam-3" style={{ background: 'linear-gradient(to top, rgba(251, 191, 36, 0.5), transparent)' }} />
        </div>

        {/* Crisp Vector Glass & Fluid Coffee Liquid */}
        <svg viewBox="0 0 200 280" style={{ width: '100%', height: '100%', filter: 'drop-shadow(0 16px 30px rgba(0,0,0,0.35))' }}>
          <defs>
            <linearGradient id="themeGlassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.35)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.08)" />
              <stop offset="100%" stopColor="rgba(217, 119, 6, 0.2)" />
            </linearGradient>

            <linearGradient id="themeLiquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fde047" /> {/* Gold Foam */}
              <stop offset="20%" stopColor="#d97706" /> {/* Warm Amber */}
              <stop offset="100%" stopColor="#451a03" /> {/* Rich Espresso */}
            </linearGradient>
          </defs>

          {/* Straw matching gold theme */}
          <rect x="112" y="15" width="7" height="230" rx="3.5" fill="#fbbf24" transform="rotate(-10 112 15)" opacity="0.9" />

          {/* Glass Contour */}
          <path
            d="M 40 60 L 160 60 L 142 245 C 142 254 128 262 100 262 C 72 262 58 254 58 245 Z"
            fill="url(#themeGlassGrad)"
            stroke="rgba(217, 119, 6, 0.4)"
            strokeWidth="2"
          />

          {/* Fluid Liquid Wave Sloshing Motion */}
          <path
            d={`M 44 95 Q 100 ${95 + waveOffset} 156 95 L 140 242 C 140 250 126 258 100 258 C 74 258 60 250 60 242 Z`}
            fill="url(#themeLiquidGrad)"
            opacity="0.9"
          />

          {/* Floating Gold Foam Top */}
          <ellipse cx="100" cy={95 + waveOffset * 0.5} rx="54" ry="10" fill="#fef08a" opacity="0.85" />

          {/* Floating Theme Ice Cubes */}
          <g className="ice-cube-float-1">
            <rect x="68" y="110" width="24" height="24" rx="5" fill="rgba(255,255,255,0.7)" stroke="#fbbf24" strokeWidth="1" />
          </g>
          <g className="ice-cube-float-2">
            <rect x="106" y="125" width="22" height="22" rx="4" fill="rgba(255,255,255,0.6)" stroke="#d97706" strokeWidth="1" transform="rotate(15 106 125)" />
          </g>

          {/* Glass Edge Highlights */}
          <path d="M 48 70 L 60 235" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="2.5" strokeLinecap="round" opacity="0.6" />
        </svg>

        {/* Floating Coffee Beans */}
        <div style={{
          position: 'absolute',
          bottom: '20px',
          left: '10px',
          fontSize: '1.2rem',
          transform: `translateY(${waveOffset * 0.8}px)`,
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
        }}>
          🫘
        </div>
        <div style={{
          position: 'absolute',
          top: '40px',
          right: '5px',
          fontSize: '1.1rem',
          transform: `translateY(${-waveOffset * 0.6}px)`,
          filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))'
        }}>
          🫘
        </div>
      </div>
    </div>
  );
};
