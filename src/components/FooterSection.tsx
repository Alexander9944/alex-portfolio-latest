'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import GsapButton from './GsapButton';
import { useTheme } from '@/contexts/ThemeContext';

export default function FooterSection() {
  const { theme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState('');

  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const socialContainerRef = useRef<HTMLDivElement>(null);

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Alexander9944' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/alexander-abraham-5814251b7/' },
    { name: 'Instagram', url: 'https://www.instagram.com/alexander.1388/' },
  ];

  // Update Live Chennai/IST Time
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Kolkata',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // GSAP Entrance Animations
  useGSAP(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 85%',
          },
        }
      );
    }
  }, []);

  // GSAP Magnetic button physics
  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1.06,
      y: -3,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLElement>) => {
    gsap.to(e.currentTarget, {
      scale: 1,
      y: 0,
      x: 0,
      duration: 0.4,
      ease: 'elastic.out(1, 0.4)',
    });
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(e.currentTarget, {
      x: x * 0.2,
      y: y * 0.2,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const copyEmail = () => {
    navigator.clipboard.writeText('Anderalex789@gmail.com');
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="CONTACT"
      ref={footerRef}
      className="relative pt-32 pb-12 overflow-hidden border-t"
      style={{
        background: theme === 'dark' ? '#040407' : '#FFF8D4',
        color: theme === 'dark' ? '#ededed' : '#000B58',
        borderColor: theme === 'dark' ? 'rgba(255, 255, 255, 0.08)' : 'rgba(0, 11, 88, 0.1)',
      }}
    >
      {/* Background Gradients & Glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFD93D] to-transparent opacity-60" />
        <div
          className={`absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full blur-[140px] opacity-15 ${
            theme === 'dark' ? 'bg-[#FFD93D]' : 'bg-amber-400'
          }`}
        />
        <div
          className={`absolute top-[10%] left-[-10%] w-[400px] h-[400px] rounded-full blur-[120px] opacity-10 ${
            theme === 'dark' ? 'bg-blue-600' : 'bg-indigo-400'
          }`}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-24 items-start">
          
          {/* Left Column: Call to Action */}
          <div className="lg:col-span-7 space-y-8">
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-[#FFD93D]/30 bg-[#FFD93D]/10 backdrop-blur-md">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-bold tracking-widest text-[#FFD93D] uppercase">
                AVAILABLE FOR NEW OPPORTUNITIES
              </span>
            </div>

            <h2
              ref={titleRef}
              className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1.1] tracking-tight"
            >
              Let&apos;s make something{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD93D] via-amber-400 to-yellow-500">
                amazing together.
              </span>
            </h2>

            {/* Email Copy Card */}
            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={copyEmail}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                className={`group relative px-6 py-4 rounded-full border transition-all duration-300 flex items-center gap-4 cursor-pointer backdrop-blur-md shadow-xl ${
                  theme === 'dark'
                    ? 'border-white/15 bg-white/5 hover:border-[#FFD93D] hover:bg-white/10'
                    : 'border-black/15 bg-black/5 hover:border-[#FFD93D] hover:bg-black/10'
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-[#FFD93D] text-black font-bold flex items-center justify-center text-lg group-hover:scale-110 transition-transform">
                  ✉
                </div>
                <div className="text-left">
                  <p className="text-xs opacity-60 uppercase tracking-widest font-semibold">
                    GET IN TOUCH
                  </p>
                  <p className="text-lg md:text-xl font-bold text-[#FFD93D]">
                    Anderalex789@gmail.com
                  </p>
                </div>
                <span className="ml-2 px-3 py-1 rounded-full text-xs font-bold bg-[#FFD93D]/20 text-[#FFD93D]">
                  {copied ? 'COPIED! 📋' : 'COPY'}
                </span>
              </button>
            </div>
          </div>

          {/* Right Column: Social Links & Live Time */}
          <div className="lg:col-span-5 flex flex-col justify-between h-full space-y-12">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-[#FFD93D] uppercase mb-6">
                CONNECT & FOLLOW
              </p>
              <div ref={socialContainerRef} className="flex flex-wrap gap-4">
                {socialLinks.map((link) => (
                  <GsapButton
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="secondary"
                    className="!px-6 !py-3 !text-xs"
                  >
                    {link.name} ↗
                  </GsapButton>
                ))}
              </div>
            </div>

            {/* Live Location & Local Time Widget */}
            <div className={`p-6 rounded-2xl border backdrop-blur-md space-y-2 ${
              theme === 'dark' ? 'border-white/10 bg-white/5' : 'border-black/10 bg-black/5'
            }`}>
              <div className="flex justify-between items-center text-xs tracking-widest uppercase opacity-60">
                <span>LOCATION</span>
                <span>LOCAL TIME (IST)</span>
              </div>
              <div className="flex justify-between items-center text-lg md:text-xl font-bold">
                <span>Chennai, India 🇮🇳</span>
                <span className="font-mono text-[#FFD93D]">{localTime || '12:00:00 PM'}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar with Back to Top */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-sm opacity-70">
          <p>© {new Date().getFullYear()} Alexander Abraham. All rights reserved.</p>

          <div className="flex items-center gap-8">
            <span className="hidden md:inline font-medium">Built with Next.js & GSAP</span>
            <GsapButton
              variant="outline"
              onClick={scrollToTop}
              className="!px-5 !py-2 !text-xs"
            >
              BACK TO TOP ↑
            </GsapButton>
          </div>
        </div>
      </div>
    </footer>
  );
}
