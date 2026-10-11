import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: -100, y: -100 });
  const [isHoveringLink, setIsHoveringLink] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    // Only activate cursor for fine pointer devices (desktop mouse) and if user hasn't requested reduced motion
    const pointerQuery = window.matchMedia('(pointer: fine)');
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const checkSupport = () => {
      setIsDesktop(pointerQuery.matches && !motionQuery.matches);
    };

    checkSupport();
    pointerQuery.addEventListener('change', checkSupport);
    motionQuery.addEventListener('change', checkSupport);

    const onMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const onMouseEnterWindow = () => setIsVisible(true);
    const onMouseLeaveWindow = () => setIsVisible(false);

    // Track clickable element hover
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.closest('a') ||
        target.closest('button') ||
        target.closest('input') ||
        target.closest('textarea') ||
        target.closest('[role="button"]') ||
        target.closest('.interactive-target')
      ) {
        setIsHoveringLink(true);
      } else {
        setIsHoveringLink(false);
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    document.body.addEventListener('mouseenter', onMouseEnterWindow);
    document.body.addEventListener('mouseleave', onMouseLeaveWindow);

    return () => {
      pointerQuery.removeEventListener('change', checkSupport);
      motionQuery.removeEventListener('change', checkSupport);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      document.body.removeEventListener('mouseenter', onMouseEnterWindow);
      document.body.removeEventListener('mouseleave', onMouseLeaveWindow);
    };
  }, [isVisible]);

  if (!isDesktop || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Inner precise dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9999] h-2 w-2 rounded-full bg-electric-blue mix-blend-screen"
        animate={{
          x: mousePosition.x - 4,
          y: mousePosition.y - 4,
          scale: isHoveringLink ? 0 : 1,
          opacity: 1,
        }}
        transition={{ type: 'spring', stiffness: 1200, damping: 50, mass: 0.1 }}
      />

      {/* Outer trailing aura ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[9998] rounded-full border border-electric-blue/50 bg-electric-blue/10 backdrop-blur-[1px]"
        animate={{
          x: mousePosition.x - (isHoveringLink ? 24 : 16),
          y: mousePosition.y - (isHoveringLink ? 24 : 16),
          width: isHoveringLink ? 48 : 32,
          height: isHoveringLink ? 48 : 32,
          borderColor: isHoveringLink ? 'rgba(0, 240, 255, 0.8)' : 'rgba(139, 92, 246, 0.5)',
          backgroundColor: isHoveringLink ? 'rgba(0, 240, 255, 0.15)' : 'rgba(139, 92, 246, 0.05)',
        }}
        transition={{ type: 'spring', stiffness: 350, damping: 25, mass: 0.2 }}
      />
    </>
  );
};
