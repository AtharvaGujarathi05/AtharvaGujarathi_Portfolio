import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  href?: string;
  target?: string;
  rel?: string;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  strength?: number;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  className = '',
  onClick,
  href,
  target,
  rel,
  variant = 'primary',
  strength = 24,
}) => {
  const buttonRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (prefersReducedMotion || !buttonRef.current) return;
    const { clientX, clientY } = e;
    const { left, top, width, height } = buttonRef.current.getBoundingClientRect();
    const x = (clientX - (left + width / 2)) * (strength / 100);
    const y = (clientY - (top + height / 2)) * (strength / 100);
    setPosition({ x, y });
  };

  const handleMouseLeave = () => {
    setPosition({ x: 0, y: 0 });
  };

  const variantStyles = {
    primary:
      'bg-gradient-to-r from-electric-blue via-electric-sky to-electric-violet text-black font-semibold shadow-glow-blue hover:shadow-glow-combo border border-transparent',
    secondary:
      'bg-white/5 hover:bg-white/10 text-white border border-white/10 hover:border-electric-blue/40 shadow-sm backdrop-blur-md',
    outline:
      'bg-transparent hover:bg-electric-blue/10 text-electric-blue border border-electric-blue/40 hover:border-electric-blue shadow-none',
    ghost:
      'bg-transparent hover:bg-white/5 text-slate-300 hover:text-white border-transparent',
  };

  const content = (
    <motion.div
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, mass: 0.2 }}
      className={`relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl transition-all duration-300 cursor-pointer text-sm tracking-wide select-none group ${variantStyles[variant]} ${className}`}
    >
      {/* Subtle shine effect */}
      <span className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out pointer-events-none" />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.div>
  );

  if (href) {
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        onClick={onClick}
        className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue/80 rounded-xl"
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-block focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue/80 rounded-xl bg-transparent border-0 p-0"
    >
      {content}
    </button>
  );
};
