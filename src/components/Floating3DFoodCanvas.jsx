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

  // Rich Color-Graded 3D Floating Nutrient Food Items
  const foodItems = [
    { 
      icon: '🥑', 
      name: 'Avocado', 
      tag: 'Healthy Fats', 
      top: '12%', 
      left: '4%', 
      speed: 0.28, 
      size: '2.4rem', 
      depth: '40px',
      bg: 'linear-gradient(135deg, #10b981 0%, #047857 100%)',
      textColor: '#ffffff',
      shadow: '0 12px 30px rgba(16, 185, 129, 0.45)',
      border: '1.5px solid rgba(255, 255, 255, 0.4)'
    },
    { 
      icon: '🥩', 
      name: 'Lean Protein', 
      tag: 'Muscle Recovery', 
      top: '26%', 
      right: '4%', 
      speed: -0.32, 
      size: '2.5rem', 
      depth: '60px',
      bg: 'linear-gradient(135deg, #f43f5e 0%, #be123c 100%)',
      textColor: '#ffffff',
      shadow: '0 12px 30px rgba(244, 63, 94, 0.45)',
      border: '1.5px solid rgba(255, 255, 255, 0.4)'
    },
    { 
      icon: '🥣', 
      name: 'Oats & Fiber', 
      tag: 'Slow Carbs', 
      top: '42%', 
      left: '3%', 
      speed: 0.22, 
      size: '2.3rem', 
      depth: '30px',
      bg: 'linear-gradient(135deg, #d97706 0%, #92400e 100%)',
      textColor: '#ffffff',
      shadow: '0 12px 30px rgba(217, 119, 6, 0.45)',
      border: '1.5px solid rgba(255, 255, 255, 0.4)'
    },
    { 
      icon: '🥤', 
      name: 'Whey Protein', 
      tag: 'Fast Digestion', 
      top: '58%', 
      right: '5%', 
      speed: -0.26, 
      size: '2.4rem', 
      depth: '50px',
      bg: 'linear-gradient(135deg, #0284c7 0%, #0369a1 100%)',
      textColor: '#ffffff',
      shadow: '0 12px 30px rgba(2, 132, 199, 0.45)',
      border: '1.5px solid rgba(255, 255, 255, 0.4)'
    },
    { 
      icon: '🥦', 
      name: 'Super Greens', 
      tag: 'Micronutrients', 
      top: '74%', 
      left: '5%', 
      speed: 0.3, 
      size: '2.5rem', 
      depth: '35px',
      bg: 'linear-gradient(135deg, #059669 0%, #064e3b 100%)',
      textColor: '#ffffff',
      shadow: '0 12px 30px rgba(5, 150, 105, 0.45)',
      border: '1.5px solid rgba(255, 255, 255, 0.4)'
    },
    { 
      icon: '🫐', 
      name: 'Berries', 
      tag: 'Antioxidants', 
      top: '88%', 
      right: '6%', 
      speed: -0.2, 
      size: '2.3rem', 
      depth: '45px',
      bg: 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
      textColor: '#ffffff',
      shadow: '0 12px 30px rgba(99, 102, 241, 0.45)',
      border: '1.5px solid rgba(255, 255, 255, 0.4)'
    }
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
        const rotateDeg = (scrollY * 0.12 * (idx % 2 === 0 ? 1 : -1)) % 360;

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
              opacity: 0.95,
              willChange: 'transform'
            }}
            className="float-slow"
          >
            <div style={{
              background: item.bg,
              padding: '0.55rem 0.9rem',
              borderRadius: '22px',
              border: item.border,
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              boxShadow: item.shadow,
              backdropFilter: 'blur(12px)'
            }}>
              <span style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>{item.icon}</span>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontSize: '0.78rem', fontWeight: 900, color: item.textColor, letterSpacing: '-0.01em', lineHeight: 1.1 }}>
                  {item.name}
                </span>
                <span style={{ fontSize: '0.6rem', fontWeight: 800, color: 'rgba(255,255,255,0.85)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
                  {item.tag}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
