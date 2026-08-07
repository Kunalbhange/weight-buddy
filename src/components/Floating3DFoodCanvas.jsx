import React, { useEffect, useState } from 'react';

export const Floating3DFoodCanvas = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Pure 3D Floating Food Icons Only (No Text Info Boxes)
  const foodItems = [
    { icon: '🥑', top: '10%', left: '3%', speed: 0.28, size: '3.2rem', depth: '40px' },
    { icon: '🥩', top: '22%', right: '4%', speed: -0.32, size: '3.5rem', depth: '60px' },
    { icon: '🥣', top: '38%', left: '4%', speed: 0.22, size: '3.0rem', depth: '30px' },
    { icon: '🥤', top: '52%', right: '5%', speed: -0.26, size: '3.2rem', depth: '50px' },
    { icon: '🥦', top: '68%', left: '3%', speed: 0.3, size: '3.4rem', depth: '35px' },
    { icon: '🫐', top: '82%', right: '4%', speed: -0.2, size: '3.1rem', depth: '45px' },
    { icon: '🥚', top: '92%', left: '5%', speed: 0.25, size: '3.0rem', depth: '25px' }
  ];

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      pointerEvents: 'none',
      zIndex: 1,
      overflow: 'hidden',
      perspective: '1200px'
    }}>
      {foodItems.map((item, idx) => {
        const translateY = scrollY * item.speed;
        const rotateDeg = (scrollY * 0.15 * (idx % 2 === 0 ? 1 : -1)) % 360;

        return (
          <div
            key={idx}
            style={{
              position: 'absolute',
              top: item.top,
              left: item.left,
              right: item.right,
              transform: `translate3d(0, ${translateY}px, ${item.depth}) rotate3d(1, 1, 0, ${rotateDeg}deg)`,
              transition: 'transform 0.1s cubic-bezier(0.1, 1, 0.1, 1)',
              fontSize: item.size,
              opacity: 0.9,
              willChange: 'transform',
              filter: 'drop-shadow(0 14px 28px rgba(0, 0, 0, 0.18))'
            }}
            className="float-slow"
          >
            <span>{item.icon}</span>
          </div>
        );
      })}
    </div>
  );
};
