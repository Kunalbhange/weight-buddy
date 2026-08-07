import React, { useEffect, useState } from 'react';

export const AestheticCoffee3D = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const moveX = (clientX / window.innerWidth - 0.5) * 20;
      const moveY = (clientY / window.innerHeight - 0.5) * 20;
      setMousePos({ x: moveX, y: moveY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const parallaxY = scrollY * 0.12;
  const rotateY = mousePos.x * 0.8;
  const rotateX = -mousePos.y * 0.8;

  return (
    <div style={{
      position: 'fixed',
      bottom: '3%',
      right: '2%',
      width: '320px',
      height: '420px',
      pointerEvents: 'none',
      zIndex: 1,
      perspective: '1200px',
      overflow: 'visible'
    }}>
      {/* 8D Floating Ambient Glow Ring */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        width: '260px',
        height: '260px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(217, 119, 6, 0.28) 0%, rgba(180, 83, 9, 0.1) 50%, transparent 75%)',
        transform: 'translate(-50%, -50%)',
        filter: 'blur(30px)',
        animation: 'coffeeGlowPulse 4s ease-in-out infinite'
      }} />

      {/* 3D Glass Coffee Cup Assembly */}
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: `translate3d(0, ${-parallaxY}px, 0) rotateY(${rotateY}deg) rotateX(${rotateX}deg)`,
        transition: 'transform 0.12s cubic-bezier(0.1, 0.9, 0.2, 1)'
      }}>
        {/* Steam Particles */}
        <div style={{ position: 'absolute', top: '15px', left: '45%', display: 'flex', gap: '8px' }}>
          <div className="coffee-steam steam-1" />
          <div className="coffee-steam steam-2" />
          <div className="coffee-steam steam-3" />
        </div>

        {/* 3D SVG Iced Latte Coffee Glass */}
        <svg
          viewBox="0 0 200 280"
          style={{
            width: '100%',
            height: '100%',
            filter: 'drop-shadow(0 24px 38px rgba(0, 0, 0, 0.45))'
          }}
        >
          <defs>
            {/* Glass Body Gradient */}
            <linearGradient id="glassGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.4)" />
              <stop offset="30%" stopColor="rgba(255, 255, 255, 0.12)" />
              <stop offset="70%" stopColor="rgba(255, 255, 255, 0.05)" />
              <stop offset="100%" stopColor="rgba(255, 255, 255, 0.25)" />
            </linearGradient>

            {/* Coffee Liquid Layer Gradient */}
            <linearGradient id="coffeeLiquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" /> {/* Creamy Foam Top */}
              <stop offset="15%" stopColor="#d97706" /> {/* Caramel Amber */}
              <stop offset="60%" stopColor="#78350f" /> {/* Espresso Rich Dark */}
              <stop offset="100%" stopColor="#451a03" /> {/* Deep Espresso */}
            </linearGradient>

            {/* Ice Cube Gloss Gradient */}
            <linearGradient id="iceGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255, 255, 255, 0.85)" />
              <stop offset="50%" stopColor="rgba(255, 255, 255, 0.35)" />
              <stop offset="100%" stopColor="rgba(217, 119, 6, 0.4)" />
            </linearGradient>
          </defs>

          {/* Straw */}
          <rect x="115" y="10" width="8" height="240" rx="4" fill="#fbbf24" transform="rotate(-12 115 10)" opacity="0.9" />

          {/* Glass Outer Outline Body */}
          <path
            d="M 35 60 L 165 60 L 145 250 C 145 260 130 268 100 268 C 70 268 55 260 55 250 Z"
            fill="url(#glassGrad)"
            stroke="rgba(255, 255, 255, 0.5)"
            strokeWidth="2.5"
          />

          {/* Inner Coffee Liquid Filling */}
          <path
            d="M 40 85 L 160 85 L 143 246 C 143 255 128 263 100 263 C 72 263 57 255 57 246 Z"
            fill="url(#coffeeLiquidGrad)"
            opacity="0.92"
          />

          {/* Creamy Foam Layer Top Ripple */}
          <ellipse cx="100" cy="85" rx="60" ry="12" fill="#fffbeb" opacity="0.9" />

          {/* Floating Ice Cubes */}
          <g className="ice-cube-float-1">
            <rect x="65" y="100" width="28" height="28" rx="6" fill="url(#iceGrad)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" />
          </g>

          <g className="ice-cube-float-2">
            <rect x="105" y="115" width="26" height="26" rx="5" fill="url(#iceGrad)" stroke="rgba(255,255,255,0.7)" strokeWidth="1.5" transform="rotate(18 105 115)" />
          </g>

          <g className="ice-cube-float-3">
            <rect x="75" y="150" width="24" height="24" rx="5" fill="url(#iceGrad)" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" transform="rotate(-12 75 150)" />
          </g>

          {/* Glass Highlight Reflections */}
          <path d="M 45 70 L 58 240" stroke="rgba(255, 255, 255, 0.6)" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
          <path d="M 155 70 L 144 240" stroke="rgba(255, 255, 255, 0.3)" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
    </div>
  );
};
