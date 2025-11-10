'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';
import { useTheme } from '@/contexts/ThemeContext';

export default function HeroSection() {
  const numberRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    if (numberRef.current) {
      const handleScroll = () => {
        const scrollPos = window.scrollY;
        numberRef.current!.style.transform = `translateX(-${scrollPos * 0.5}px)`;
      };
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // Smooth scroll function
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  // Use toggleTheme from context

  return (
    <section
      className="relative flex flex-col min-h-screen overflow-x-hidden transition-colors duration-300"
      style={{
        backgroundColor: theme === 'dark' ? '#000000' : '#FFF8D4',
        color: theme === 'dark' ? '#FFF8D4' : '#000B58'
      }}
    >
      {/* 🔹 NAVIGATION BAR */}
      <nav className="relative z-20 flex flex-col px-4 sm:px-6 md:px-12 pt-8 pb-3 md:pt-6 lg:pt-16 animate-fadeIn"
      style={{
        paddingTop:'18px'
      }}>
        <div className="flex items-center justify-between w-full gap-3">
          {/* Logo */}
          <div
            className="text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-tight text-[#FFD93D] truncate shrink-0 max-md:text-xs max-md:mr-2 mobile-logo-spacing"
            style={{ 
              letterSpacing: '0.15em',
              marginLeft: '150px'
            }}
          >
            <span className="hidden lg:block">THARANY SIVAPASKARAN</span>
            <span className="block lg:hidden">THARANY S.</span>
          </div>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-3 lg:gap-4 xl:gap-6 2xl:gap-10 3xl:gap-14 text-xs lg:text-sm xl:text-base shrink-0 navbar-medium-screen">
            {['ABOUT ME', 'WORKS', 'CONTACT'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="transition-opacity duration-200 hover:opacity-60 cursor-pointer whitespace-nowrap"
                style={{ color: theme === 'dark' ? '#FFF8D4' : '#000B58' }}
              >
                [ {item.toUpperCase()} ]
              </button>
            ))}
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="lg:hidden flex items-center gap-3 relative z-50">
            <ThemeToggle />
            <button
              className="flex flex-col gap-1.5 p-2 rounded-lg hover:bg-(--text)/5 transition-colors duration-200 relative z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 bg-[#FFD93D] rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-[#FFD93D] rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-[#FFD93D] rounded-full transition-all duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
            </button>
          </div>

          {/* CTA (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 lg:gap-3 xl:gap-4 2xl:gap-6 shrink-0 navbar-cta-medium">
            <button
              onClick={() => scrollToSection('CONTACT')}
              className="flex items-center gap-1 lg:gap-1.5 xl:gap-2 text-xs lg:text-xs xl:text-sm 2xl:text-base font-medium tracking-wider border-b-2 border-[#FFD93D] text-[#FFD93D] pb-1 group hover:gap-2 xl:hover:gap-3 transition-all duration-300 cursor-pointer whitespace-nowrap"
            >
              LET&apos;S CONNECT
              <svg
                className="w-3 h-3 lg:w-3 lg:h-3 xl:w-4 xl:h-4 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* 🔹 MOBILE MENU OVERLAY */}
      <div
        className={`fixed top-20 left-0 right-0 bottom-0 z-40 flex flex-col items-center justify-center gap-10 transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: theme === 'dark' ? '#000000' : '#FFF8D4'
        }}
      >
        {['ABOUT ME', 'WORKS', 'CONTACT'].map((item) => (
          <button
            key={item}
            onClick={() => {
              scrollToSection(item);
              setIsMobileMenuOpen(false);
            }}
            className="text-2xl sm:text-3xl font-medium tracking-widest hover:opacity-70 cursor-pointer max-lg:text-xl max-lg:py-3"
             style={{
              paddingTop:'18px',
              color: theme === 'dark' ? '#FFF8D4' : '#000B58',
              textDecoration: 'none'
             }}>
            [ {item.toUpperCase()} ]
          </button>
        ))}
        <button
          onClick={() => {
            scrollToSection('CONTACT');
            setIsMobileMenuOpen(false);
          }}
          className="mt-6 flex items-center gap-2 text-base font-semibold tracking-wider group hover:gap-3 transition-all duration-300 cursor-pointer"
          style={{
            color: theme === 'dark' ? '#FFF8D4' : '#000B58',
            borderBottom: `2px solid ${theme === 'dark' ? '#FFF8D4' : '#000B58'}`
          }}
        >
          LET&apos;S CONNECT
          <svg
            className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* 🔹 HERO CONTENT - v4.0 with proper spacing */}
      <div className="relative z-10 flex-1 flex flex-col justify-end px-6 sm:px-10 md:px-20 lg:px-32 xl:px-40 pb-8 sm:pb-12 md:pb-16 lg:pb-20">
        <div className="flex flex-col lg:flex-row items-end justify-between mobile-hero-layout">
          {/* Text Section */}
          <div className="animate-slideInFromLeft space-y-4 sm:space-y-5 lg:space-y-6 flex-1 lg:max-w-3xl lg:mx-auto lg:mr-8 mobile-hero-spacing mobile-text-order"
          style={{
            marginLeft:'150px'
          }}>
            <h1 className="text-[32px] xs:text-[40px] sm:text-[52px] lg:text-[54px] xl:text-[90px] 2xl:text-[100px] font-bold leading-[1.1] max-w-5xl max-lg:text-[28px] max-lg:max-w-full small-tablet-hero-text"
            style={{ color: theme === 'dark' ? '#FFF8D4' : '#000B58' }}>
              Full Stack <br /> Developer
            </h1>

            <h2 className="text-base sm:text-lg lg:text-xl xl:text-2xl 2xl:text-3xl font-semibold max-lg:text-sm small-tablet-hero-subtitle"
            style={{ color: theme === 'dark' ? '#FFF8D4' : '#000B58' }}>
              MERN Stack
            </h2>

            <p className="text-base sm:text-lg lg:text-[1.05rem] xl:text-lg 2xl:text-xl max-w-3xl leading-relaxed opacity-95 max-lg:text-base max-lg:max-w-full max-lg:px-6 small-tablet-hero-description"
            style={{
              padding:'18px 18px 18px 18px',
              color: theme === 'dark' ? '#FFF8D4' : '#000B58',
              lineHeight: '2',
              fontWeight: 400,
              letterSpacing: '0.01em',
              background: theme === 'dark' ? 'rgba(0,0,0,0.7)' : 'rgba(255,248,212,0.7)',
              borderRadius: '12px'
            }}>
              I create engaging digital experiences with a focus on elegant design and robust functionality.<br />
              Passionate about building applications that make a difference.
            </p>

            {/* Buttons */}
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 pt-8 lg:pt-10 xl:pt-16 2xl:pt-24 max-lg:gap-4 max-lg:pt-6 max-lg:justify-center max-lg:items-center small-tablet-buttons">
              <button
                onClick={() => scrollToSection('WORKS')}
                className="group relative inline-flex items-center justify-center gap-4 overflow-hidden 
                         rounded-lg text-white 
                         bg-linear-to-r from-yellow-400 to-amber-500 
                         shadow-lg transition-all duration-500 ease-out 
                         hover:scale-105 hover:shadow-2xl
                         max-lg:gap-2 max-lg:text-sm"
                style={{ 
                  backgroundSize: '300% 100%',
                  animation: 'gradient 3s ease infinite'
                }}
              >
                <span className="relative z-10 flex items-center gap-4 font-bold tracking-wide max-lg:gap-2" 
                style={{
                  padding:'12px 25px'
                }}>
                  VIEW MY WORK
                  <svg
                    className="w-6 h-6 transition-all duration-700 group-hover:translate-x-3 group-hover:scale-125 max-lg:w-4 max-lg:h-4"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={3}
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </button>

              <button
                onClick={() => scrollToSection('CONTACT')}
                className="group relative text-sm sm:text-base lg:text-lg xl:text-xl font-bold  rounded-lg px-10 sm:px-12 lg:px-14 py-5 sm:py-6 lg:py-7 text-center transition-all duration-700 ease-out overflow-hidden border-3 border-[#FFD93D] text-[#FFD93D] hover:text-white hover:scale-105 active:scale-95 backdrop-blur-sm hover:border-[#FFE685] hover:shadow-[0_25px_80px_rgba(255,217,61,0.4)] bg-transparent hover:bg-[#FFD93D]/10 cursor-pointer max-lg:text-xs max-lg:px-6 max-lg:py-3 max-lg:border-2"
              style={{
                  padding:'12px 25px'
                }}>
                CONTACT ME
              </button>
            </div>
          </div>

          {/* Image Section */}
          <div className="animate-slideInFromRight flex justify-center lg:justify-end shrink-0 mobile-image-order">
            <div className="relative w-[220px] xs:w-[260px] sm:w-[300px] lg:w-[360px] xl:w-[440px] 2xl:w-[540px] aspect-3/4 overflow-hidden max-lg:w-[220px] max-lg:rounded-lg small-tablet-image">
              <Image
                src="/img4.png"
                alt="Tharany Sivapaskaran"
                fill
                sizes="(max-width: 475px) 180px, (max-width: 640px) 200px, (max-width: 1024px) 220px, (max-width: 1280px) 320px, (max-width: 1536px) 400px, 480px"
                className="object-cover"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
