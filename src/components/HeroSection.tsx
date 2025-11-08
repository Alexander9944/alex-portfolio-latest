'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import ThemeToggle from './ThemeToggle';

export default function HeroSection() {
  const numberRef = useRef<HTMLDivElement>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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

  return (
    <section
      className="relative flex flex-col min-h-screen overflow-x-hidden transition-colors duration-300 bg-(--background) text-(--text)"
    >
      {/* 🔹 NAVIGATION BAR */}
      <nav className="relative z-20 flex flex-col px-4 sm:px-6 md:px-12 pt-8 pb-3 md:pt-6 animate-fadeIn">
        <div className="flex items-center justify-between w-full gap-3">
          {/* Logo */}
          <div
            className="text-sm sm:text-base md:text-lg lg:text-xl font-bold tracking-tight text-[#FFD93D] truncate shrink-0"
          >
            THARANY SIVAPASKARAN
          </div>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6 lg:gap-10 xl:gap-14 text-sm lg:text-base">
            {['about', 'works', 'services'].map((item) => (
              <a
                key={item}
                href={`#${item}`}
                className="transition-opacity duration-200 hover:opacity-60"
                style={{ color: '#000B58' }}
              >
                [ {item.toUpperCase()} ]
              </a>
            ))}
          </div>

          {/* Mobile: Theme Toggle + Menu Button */}
          <div className="md:hidden flex items-center gap-3">
            <ThemeToggle />
            <button
              className="flex flex-col gap-1.5 z-50 p-2 rounded-lg hover:bg-(--text)/5 transition-colors duration-200"
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
          <div className="hidden md:flex items-center gap-4">
            <a
              href="#contact"
              className="flex items-center gap-2 text-sm font-medium tracking-wider border-b-2 border-[#FFD93D] text-[#FFD93D] pb-1 group hover:gap-3 transition-all duration-300"
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
            </a>
            <ThemeToggle />
          </div>
        </div>
      </nav>

      {/* 🔹 MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-10 bg-black transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {['about', 'works', 'services'].map((item) => (
          <a
            key={item}
            href={`#${item}`}
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-2xl sm:text-3xl font-medium tracking-widest text-[#FFD93D] hover:opacity-70"
          >
            [ {item.toUpperCase()} ]
          </a>
        ))}
        <a
          href="#contact"
          className="mt-6 flex items-center gap-2 text-base font-semibold tracking-wider border-b-2 border-[#FFD93D] text-[#FFD93D] group hover:gap-3 transition-all duration-300"
          onClick={() => setIsMobileMenuOpen(false)}
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
        </a>
      </div>

      {/* 🔹 HERO CONTENT */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 sm:px-8 md:px-16 lg:px-20 py-8 sm:py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] gap-6 sm:gap-8 items-center max-w-7xl mx-auto w-full">
          {/* Text Section */}
          <div className="animate-slideInFromLeft space-y-3 sm:space-y-4">
            <h1 className="text-[32px] xs:text-[40px] sm:text-[52px] md:text-[64px] lg:text-[88px] xl:text-[110px] font-bold leading-[1.1] text-(--text)">
              Full Stack <br /> Developer
            </h1>

            <h2 className="text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold text-(--text)">
              MERN Stack
            </h2>

            <p className="text-xs sm:text-sm md:text-base lg:text-lg max-w-2xl leading-relaxed text-(--text) opacity-90">
              I create engaging digital experiences with a focus on elegant design and robust functionality.
              Passionate about building applications that make a difference.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4 sm:pt-6">
              <a
                href="#works"
                className="group relative text-xs sm:text-sm md:text-base font-semibold rounded-lg px-5 sm:px-6 py-2.5 sm:py-3 text-center transition-all duration-300 bg-linear-to-r from-[#FFD93D] to-[#FFE685] text-[#000B58] shadow-lg hover:shadow-2xl hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-2">
                  View My Work
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </a>

              <a
                href="#contact"
                className="group relative text-xs sm:text-sm md:text-base font-semibold rounded-lg px-5 sm:px-6 py-2.5 sm:py-3 text-center border-2 border-[#FFD93D] text-[#FFD93D] transition-all duration-300 hover:bg-[#FFD93D] hover:text-[#000B58] hover:-translate-y-1"
              >
                <span className="flex items-center justify-center gap-2">
                  Contact Me
                  <svg
                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:rotate-45"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </span>
              </a>
            </div>
          </div>

          {/* Image Section */}
          <div className="animate-slideInFromRight flex justify-center md:justify-end mt-6 sm:mt-8 md:mt-0">
            <div className="relative w-[180px] xs:w-[220px] sm:w-[260px] md:w-[320px] lg:w-[400px] xl:w-[480px] aspect-3/4 overflow-hidden rounded-lg shadow-xl">
              <Image
                src="/img4.png"
                alt="Tharany Sivapaskaran"
                fill
                sizes="(max-width: 475px) 180px, (max-width: 640px) 220px, (max-width: 768px) 260px, (max-width: 1024px) 320px, (max-width: 1280px) 400px, 480px"
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
