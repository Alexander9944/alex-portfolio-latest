'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import GsapButton from './GsapButton';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

export default function Navbar() {
  const { theme } = useTheme();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('ABOUT ME');

  const navRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // GSAP Entrance & Scroll Animations
  useGSAP(() => {
    // Initial entrance timeline
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

    tl.fromTo(
      navRef.current,
      { y: -80, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 1.2 }
    )
      .fromTo(
        logoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.8 },
        '-=0.8'
      );

    if (linksRef.current?.children) {
      tl.fromTo(
        Array.from(linksRef.current.children),
        { opacity: 0, y: -15 },
        { opacity: 1, y: 0, stagger: 0.1, duration: 0.6 },
        '-=0.6'
      );
    }
  }, []);

  // Handle scroll shrink & active section indicator
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Check active section
      const sections = ['ABOUT ME', 'WORKS', 'CONTACT'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // GSAP Magnetic hover effect for items
  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.08,
      y: -2,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      x: 0,
      duration: 0.4,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(e.currentTarget, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // GSAP Mobile Menu Animation
  useEffect(() => {
    if (mobileMenuRef.current) {
      if (isMobileMenuOpen) {
        gsap.to(mobileMenuRef.current, {
          autoAlpha: 1,
          scale: 1,
          duration: 0.5,
          ease: 'power3.out',
        });
        gsap.fromTo(
          mobileMenuRef.current.querySelectorAll('.mobile-item'),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.1, duration: 0.6, ease: 'power3.out', delay: 0.1 }
        );
      } else {
        gsap.to(mobileMenuRef.current, {
          autoAlpha: 0,
          scale: 0.95,
          duration: 0.4,
          ease: 'power3.in',
        });
      }
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
      <nav
        ref={navRef}
        className={`pointer-events-auto w-full max-w-6xl transition-all duration-500 rounded-full px-6 py-3.5 flex items-center justify-between shadow-2xl border backdrop-blur-xl ${
          scrolled
            ? theme === 'dark'
              ? 'bg-[#000000]/85 border-[#FFD93D]/30 shadow-[#FFD93D]/5'
              : 'bg-[#FFF8D4]/90 border-[#000B58]/20 shadow-lg'
            : theme === 'dark'
              ? 'bg-black/40 border-white/10'
              : 'bg-white/40 border-black/10'
        }`}
      >
        {/* Logo */}
        <div ref={logoRef} className="flex items-center gap-3">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <span className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#FFD93D] to-amber-500 text-black font-extrabold flex items-center justify-center text-sm shadow-md group-hover:rotate-12 transition-transform duration-300">
              A
            </span>
            <span className="text-base md:text-lg font-bold tracking-[0.2em] text-[#FFD93D] group-hover:opacity-90 transition-opacity">
              ALEXANDER
            </span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <div ref={linksRef} className="hidden lg:flex items-center gap-8">
          {['ABOUT ME', 'WORKS', 'CONTACT'].map((item) => {
            const isActive = activeSection === item;
            return (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                className={`relative px-4 py-2 text-xs font-semibold tracking-[0.2em] transition-colors rounded-full ${
                  isActive
                    ? 'text-[#FFD93D]'
                    : theme === 'dark'
                      ? 'text-gray-300 hover:text-white'
                      : 'text-[#000B58] hover:text-black'
                }`}
              >
                {item}
                {isActive && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#FFD93D] shadow-[0_0_8px_#FFD93D]" />
                )}
              </button>
            );
          })}
        </div>

        {/* Right Action Controls */}
        <div className="hidden lg:flex items-center gap-4">
          <ThemeToggle />
          <GsapButton
            variant="primary"
            onClick={() => scrollToSection('CONTACT')}
            className="!px-5 !py-2.5 !text-xs"
          >
            LET&apos;S TALK ↗
          </GsapButton>
        </div>

        {/* Mobile Toggle */}
        <div className="lg:hidden flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-full border border-white/10 bg-white/5 text-[#FFD93D] cursor-pointer"
            aria-label="Toggle navigation menu"
          >
            <div className="w-5 flex flex-col items-end gap-1">
              <span
                className={`h-[2px] bg-[#FFD93D] transition-all duration-300 ${
                  isMobileMenuOpen ? 'w-5 rotate-45 translate-y-1.5' : 'w-5'
                }`}
              />
              <span
                className={`h-[2px] bg-[#FFD93D] transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : 'w-3'
                }`}
              />
              <span
                className={`h-[2px] bg-[#FFD93D] transition-all duration-300 ${
                  isMobileMenuOpen ? 'w-5 -rotate-45 -translate-y-1.5' : 'w-4'
                }`}
              />
            </div>
          </button>
        </div>
      </nav>

      {/* GSAP Animated Mobile Menu Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 invisible flex flex-col items-center justify-center gap-8 p-6 pointer-events-auto"
        style={{
          background: theme === 'dark' ? 'rgba(0,0,0,0.95)' : 'rgba(255,248,212,0.96)',
          backdropFilter: 'blur(20px)',
        }}
      >
        <button
          onClick={() => setIsMobileMenuOpen(false)}
          className="absolute top-6 right-6 p-3 rounded-full bg-white/10 text-white text-xl font-bold"
        >
          ✕
        </button>

        <div className="mobile-item text-xs tracking-[0.3em] font-bold text-[#FFD93D] mb-4">
          NAVIGATION
        </div>

        {['ABOUT ME', 'WORKS', 'CONTACT'].map((item) => (
          <button
            key={item}
            onClick={() => {
              scrollToSection(item);
              setIsMobileMenuOpen(false);
            }}
            className="mobile-item text-3xl md:text-4xl font-light tracking-widest hover:text-[#FFD93D] transition-colors"
          >
            {item}
          </button>
        ))}

        <div className="mobile-item pt-8">
          <button
            onClick={() => {
              scrollToSection('CONTACT');
              setIsMobileMenuOpen(false);
            }}
            className="px-8 py-4 rounded-full bg-[#FFD93D] text-black font-bold tracking-widest text-sm shadow-xl"
          >
            LET&apos;S TALK ↗
          </button>
        </div>
      </div>
    </header>
  );
}
