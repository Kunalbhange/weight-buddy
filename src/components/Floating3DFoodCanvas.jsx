import React, { useEffect, useState, useMemo } from 'react';

export const Floating3DFoodCanvas = () => {
  const [scrollY, setScrollY] = useState(0);

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

  const foodItems = useMemo(() => [
    { icon: '🥑', top: '8%', left: '2%', speed: 0.12, size: '1.8rem', delay: 0 },
    { icon: '🍊', top: '20%', right: '3%', speed: -0.15, size: '1.6rem', delay: 1 },
    { icon: '🥦', top: '40%', left: '1.5%', speed: 0.1, size: '1.5rem', delay: 2 },
    { icon: '🫐', top: '55%', right: '2%', speed: -0.13, size: '1.4rem', delay: 0.5 },
    { icon: '🥚', top: '72%', left: '3%', speed: 0.11, size: '1.5rem', delay: 1.5 },
    { icon: '🍋', top: '85%', right: '2.5%', speed: -0.09, size: '1.3rem', delay: 3 },
  ], []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 1,
      overflow: 'hidden'
    }}>
      {foodItems.map((item, idx) => {
        const translateY = scrollY * item.speed;
        return (
          <div
            key={idx}
            className="float-slow"
            style={{
              position: 'absolute',
              top: item.top,
              left: item.left,
              right: item.right,
              transform: `translateY(${translateY}px)`,
              fontSize: item.size,
              opacity: 0.25,
              willChange: 'transform',
              animationDelay: `${item.delay}s`,
              filter: 'blur(0.5px)',
              transition: 'transform 0.3s ease-out'
            }}
          >
            {item.icon}
          </div>
        );
      })}
    </div>
  );
};
