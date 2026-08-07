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

  const foodItems = [
    { icon: '🥑', name: 'Avocado', top: '12%', left: '5%', speed: 0.25, size: '2.6rem', depth: '20px' },
    { icon: '🥩', name: 'Lean Protein', top: '28%', right: '6%', speed: -0.3, size: '2.8rem', depth: '40px' },
    { icon: '🥣', name: 'Oats & Fiber', top: '45%', left: '4%', speed: 0.2, size: '2.5rem', depth: '15px' },
    { icon: '🥚', name: 'Egg White', top: '62%', right: '5%', speed: -0.22, size: '2.4rem', depth: '30px' },
    { icon: '🥦', name: 'Broccoli', top: '78%', left: '6%', speed: 0.28, size: '2.7rem', depth: '25px' },
    { icon: '🫐', name: 'Berries', top: '92%', right: '7%', speed: -0.18, size: '2.5rem', depth: '35px' }
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
              filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.12))',
              opacity: 0.85,
              willChange: 'transform'
            }}
            className="float-slow"
          >
            <div style={{
              background: 'rgba(255, 255, 255, 0.85)',
              backdropFilter: 'blur(10px)',
              padding: '0.4rem 0.7rem',
              borderRadius: '20px',
              border: '1.5px solid rgba(226, 232, 240, 0.9)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.35rem',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)'
            }}>
              <span>{item.icon}</span>
              <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0f172a', letterSpacing: '0.04em' }}>
                {item.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};
