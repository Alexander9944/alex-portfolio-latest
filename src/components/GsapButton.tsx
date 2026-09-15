'use client';

import React, { useRef } from 'react';
import gsap from 'gsap';

interface GsapButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  href?: string;
  target?: string;
  rel?: string;
}

export default function GsapButton({
  children,
  variant = 'primary',
  className = '',
  onClick,
  href,
  target,
  rel,
  ...props
}: GsapButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | HTMLAnchorElement>(null);
  const shimmerRef = useRef<HTMLSpanElement>(null);

  // Magnetic hover mouse move effect
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, {
      x: x * 0.22,
      y: y * 0.22,
      scale: 1.05,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  // Mouse enter effect with shimmer sweep
  const handleMouseEnter = () => {
    if (shimmerRef.current) {
      gsap.fromTo(
        shimmerRef.current,
        { x: '-100%', opacity: 0.8 },
        { x: '100%', opacity: 0, duration: 0.75, ease: 'power2.out' }
      );
    }
  };

  // Elastic spring rebound on mouse leave
  const handleMouseLeave = () => {
    if (!buttonRef.current) return;
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.6,
      ease: 'elastic.out(1.1, 0.4)',
    });
  };

  // Base styling per variant
  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-[#FFD93D] text-black font-extrabold shadow-[0_0_20px_rgba(255,217,61,0.3)] hover:shadow-[0_0_30px_rgba(255,217,61,0.6)] hover:bg-[#ffe169] border border-[#FFD93D]';
      case 'secondary':
        return 'bg-white/10 text-white font-bold backdrop-blur-md border border-white/20 hover:border-[#FFD93D] hover:text-[#FFD93D] hover:bg-white/15 shadow-lg';
      case 'outline':
        return 'border border-[#FFD93D] text-[#FFD93D] font-bold hover:bg-[#FFD93D]/15 shadow-md';
      default:
        return 'bg-[#FFD93D] text-black font-bold';
    }
  };

  const baseClasses = `relative inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-xs md:text-sm tracking-widest uppercase transition-colors duration-300 cursor-pointer overflow-hidden group select-none ${getVariantClasses()} ${className}`;

  if (href) {
    return (
      <a
        ref={buttonRef as React.RefObject<HTMLAnchorElement>}
        href={href}
        target={target}
        rel={rel}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={baseClasses}
      >
        {/* Shimmer Sweep Effect */}
        <span
          ref={shimmerRef}
          className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none transform -skew-x-12 opacity-0"
        />
        <span className="relative z-10 flex items-center gap-2">{children}</span>
      </a>
    );
  }

  return (
    <button
      ref={buttonRef as React.RefObject<HTMLButtonElement>}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={baseClasses}
      {...props}
    >
      {/* Shimmer Sweep Effect */}
      <span
        ref={shimmerRef}
        className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none transform -skew-x-12 opacity-0"
      />
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </button>
  );
}
