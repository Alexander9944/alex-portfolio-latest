'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';
import Navbar from './Navbar';
import GsapButton from './GsapButton';
import { useTheme } from '@/contexts/ThemeContext';

export default function HeroSection() {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Parallax effects
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Mouse move effect for background
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative flex flex-col min-h-screen overflow-hidden selection:bg-[#FFD93D] selection:text-black"
      style={{
        background: theme === 'dark' ? 'radial-gradient(circle at 50% 50%, #1a1a1a 0%, #000000 100%)' : '#FFF8D4',
        color: theme === 'dark' ? '#ededed' : '#000B58'
      }}
    >
      {/* Background Ambient Spotlights */}
      {theme === 'dark' && (
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-600/10 blur-[120px]"
            animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          />
          <motion.div 
            className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#FFD93D]/5 blur-[120px]"
            animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          />
        </div>
      )}

      {/* 🔹 NAVIGATION BAR */}
      <Navbar />

      {/* 🔹 HERO CONTENT */}
      <div className="relative z-10 flex-1 flex flex-col justify-center container-custom pt-36 pb-20 md:pt-48 md:pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Section */}
          <motion.div 
            className="lg:col-span-7 flex flex-col gap-6"
            style={{ y: y1, opacity }}
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
               <h2 className="text-[#FFD93D] text-lg md:text-xl tracking-[0.3em] font-medium mb-4">
                 FULL STACK DEVELOPER
               </h2>
            </motion.div>
            
            <div className="overflow-hidden">
              <motion.h1 
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight tracking-tight"
                style={{ fontFamily: 'var(--font-geist-sans)' }} // Clean sans-serif for sleek look
              >
                Create.<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD93D] to-[#ffb700] p-1">
                  Innovate.
                </span><br />
                Deploy.
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              className="text-lg md:text-xl max-w-xl leading-relaxed opacity-80"
              style={{ fontWeight: 300 }}
            >
              Crafting immersive digital experiences with MERN Stack. 
              Bridging the gap between conceptual elegance and technical robustness.
            </motion.p>

            <div className="flex flex-wrap gap-6 pt-8">
              <GsapButton variant="primary" onClick={() => scrollToSection('WORKS')}>
                VIEW PROJECTS ↗
              </GsapButton>
              
              <GsapButton variant="outline" onClick={() => scrollToSection('CONTACT')}>
                CONTACT ME
              </GsapButton>
            </div>
          </motion.div>

          {/* Visual/Image Section */}
          <motion.div 
            className="lg:col-span-5 relative mt-16 lg:mt-28"
            style={{ y: y2 }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="relative w-full aspect-[4/5] max-w-[360px] sm:max-w-[395px] mx-auto lg:ml-auto lg:mr-0"
            >
              {/* Decorative Frame */}
              <motion.div 
                className="relative z-10 w-full h-full overflow-hidden bg-gray-800 glass-panel rounded-full"
                animate={{ 
                  y: [0, -20, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  y: { duration: 6, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 8, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                <Image
                  src="/img4.png"
                  alt="Alexander Abraham"
                  fill
                  className="object-cover opacity-90 hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-full" />
                
                {/* Spinning Border Effect */}
                <div className="absolute inset-0 border-2 border-[#FFD93D]/30 rounded-full animate-spin-slow-reverse" style={{ animationDuration: '30s' }} />
              </motion.div>
            </motion.div>
          </motion.div>

        </div>
      </div>
      
      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-[10px] tracking-[0.3em] opacity-60">SCROLL</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-[#FFD93D] to-transparent" />
      </motion.div>
    </section>
  );
}
