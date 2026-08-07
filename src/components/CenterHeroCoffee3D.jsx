import React, { useEffect, useState } from 'react';

export const CenterHeroCoffee3D = () => {
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e) => {
      const moveX = (e.clientX / window.innerWidth - 0.5) * 30;
      const moveY = (e.clientY / window.innerHeight - 0.5) * 30;
      setMousePos({ x: moveX, y: moveY });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // 4D Motion calculations based on scroll position and cursor
  const scrollRotation = (scrollY * 0.18) % 360;
  const scrollTilt = Math.sin(scrollY * 0.005) * 15;
  const scrollScale = 1 + Math.sin(scrollY * 0.003) * 0.08;
  const translateY = Math.sin(scrollY * 0.004) * 25;

  const totalRotateY = scrollRotation + mousePos.x;
  const totalRotateX = scrollTilt - mousePos.y;

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 'clamp(320px, 45vw, 540px)',
      height: 'clamp(320px, 45vw, 540px)',
      pointerEvents: 'none',
      zIndex: 1,
      perspective: '1500px',
      display: 'flex',
      alignItems: 'center',
      justify: 'center'
    }}>
      {/* 4D AMBIENT AMBER ESPRESSO GLOW ORB */}
      <div style={{
        position: 'absolute',
        width: '80%',
        height: '80%',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(217, 119, 6, 0.35) 0%, rgba(180, 83, 9, 0.15) 55%, transparent 75%)',
        filter: 'blur(45px)',
        animation: 'coffeeGlowPulse 4s ease-in-out infinite',
        transform: `scale(${scrollScale})`
      }} />

      {/* RISING STEAM PARTICLES */}
      <div style={{
        position: 'absolute',
        top: '8%',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '14px',
        zIndex: 3
      }}>
        <div className="coffee-steam steam-1" style={{ width: '8px', height: '35px' }} />
        <div className="coffee-steam steam-2" style={{ width: '10px', height: '45px' }} />
        <div className="coffee-steam steam-3" style={{ width: '8px', height: '38px' }} />
      </div>

      {/* 4D HYPER-REALISTIC ANIMATED COFFEE MUG CONTAINER */}
      <div style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        transformStyle: 'preserve-3d',
        transform: `translate3d(0, ${translateY}px, 0) rotateY(${totalRotateY}deg) rotateX(${totalRotateX}deg) scale(${scrollScale})`,
        transition: 'transform 0.15s cubic-bezier(0.1, 0.9, 0.2, 1)'
      }}>
        {/* REALISTIC GRAPHIC IMAGE MUG */}
        <img
          src="/assets/realistic_coffee_mug.png"
          alt="Realistic Aesthetic 3D Coffee Mug"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            filter: 'drop-shadow(0 30px 50px rgba(0, 0, 0, 0.65)) opacity(0.82)',
            mixBlendMode: 'screen'
          }}
        />

        {/* DYNAMIC SCROLL COFFEE SPLASH DROPLETS */}
        <div style={{
          position: 'absolute',
          top: '30%',
          left: '15%',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: '#d97706',
          boxShadow: '0 0 12px #fbbf24',
          transform: `translate3d(${Math.sin(scrollY * 0.01) * 20}px, ${Math.cos(scrollY * 0.01) * 15}px, 40px)`,
          opacity: 0.8
        }} />

        <div style={{
          position: 'absolute',
          top: '40%',
          right: '18%',
          width: '10px',
          height: '10px',
          borderRadius: '50%',
          background: '#fbbf24',
          boxShadow: '0 0 10px #d97706',
          transform: `translate3d(${Math.cos(scrollY * 0.01) * -22}px, ${Math.sin(scrollY * 0.01) * 18}px, 50px)`,
          opacity: 0.85
        }} />
      </div>
    </div>
  );
};
