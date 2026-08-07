import React, { useEffect, useState, useMemo } from 'react';

export const Floating3DFoodCanvas = ({ activeTab }) => {
  const [scrollY, setScrollY] = useState(0);
  const isFrontPage = activeTab === 'landing';

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Use much larger sizes and varying rotations for a 3D realistic feel
  const foodItems = useMemo(() => [
    { icon: '🥑', top: '15%', left: '4%', speed: 0.15, size: '5rem', delay: 0, rotate: '-15deg' },
    { icon: '🍊', top: '25%', right: '5%', speed: -0.18, size: '4.5rem', delay: 1, rotate: '10deg' },
    { icon: '🥦', top: '45%', left: '3%', speed: 0.12, size: '4rem', delay: 2, rotate: '-5deg' },
    { icon: '🫐', top: '60%', right: '4%', speed: -0.15, size: '3.5rem', delay: 0.5, rotate: '20deg' },
    { icon: '🥚', top: '75%', left: '6%', speed: 0.14, size: '4.2rem', delay: 1.5, rotate: '-10deg' },
    { icon: '🍋', top: '88%', right: '6%', speed: -0.11, size: '3.8rem', delay: 3, rotate: '15deg' },
  ], []);

  // If not on the front page, make them subtle. If on front page, make them pop.
  const baseOpacity = isFrontPage ? 0.9 : 0.15;
  const baseFilter = isFrontPage 
    ? 'drop-shadow(0px 20px 15px rgba(0,0,0,0.3)) saturate(1.3) contrast(1.1)' 
    : 'blur(1px)';
  const baseZIndex = isFrontPage ? 0 : 0; 
  // We keep zIndex 0 so it stays behind the main content which has zIndex 2

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: baseZIndex,
      overflow: 'hidden',
      transition: 'opacity 0.5s ease'
    }}>
      <style>
        {`
          @keyframes realisticFloat {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
        `}
      </style>
      
      {foodItems.map((item, idx) => {
        const translateY = scrollY * item.speed;
        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              top: item.top,
              left: item.left,
              right: item.right,
              fontSize: isFrontPage ? item.size : '2rem', // Shrink when not on front page
              opacity: baseOpacity,
              filter: baseFilter,
              transform: `translateY(${translateY}px) rotate(${item.rotate})`,
              willChange: 'transform',
              transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {/* The inner div handles the continuous bobbing animation */}
            <div style={{
              animation: `realisticFloat ${4 + idx}s ease-in-out infinite`,
              animationDelay: `${item.delay}s`,
              display: 'inline-block'
            }}>
              {item.icon}
            </div>
          </div>
        );
      })}
    </div>
  );
};
