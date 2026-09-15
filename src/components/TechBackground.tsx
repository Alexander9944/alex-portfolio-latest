'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const technologies = [
  'reactjs',
  'c-plus-plus',
  'css',
  'docker',
  'figma',
  'firebase',
  'github',
  'html',
  'javascript',
  'nextjs',
  'nodejs',
  'python',
  'typescript',
  'tailwind',
  'sass',
  'sql',
  'mongodb',
  'redux',
];

const TechBackground = () => {
  const [techIcons, setTechIcons] = useState<any[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const applyThemeFromRoot = () => {
      const isDark = document.documentElement.classList.contains('dark');
      setTheme(isDark ? 'dark' : 'light');
    };
    applyThemeFromRoot();

    const classObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          applyThemeFromRoot();
        }
      });
    });
    classObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    return () => classObserver.disconnect();
  }, []);

  useEffect(() => {
    // Generate icons for fixed viewport ambient background
    const icons: Array<{ name: string; x: number; y: number; size: number; duration: number; delay: number }> = [];
    const count = 18; // Clean number of background ambient icons

    for (let i = 0; i < count; i++) {
      const tech = technologies[i % technologies.length];
      icons.push({
        name: tech,
        x: Math.random() * 90 + 5, // 5% to 95% width
        y: Math.random() * 90 + 5, // 5% to 95% height
        size: 28 + Math.random() * 20, // 28-48px
        duration: 20 + Math.random() * 25,
        delay: Math.random() * 10,
      });
    }

    setTechIcons(icons);
  }, []);

  if (!mounted) return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none overflow-hidden"
      style={{ zIndex: 0 }}
    >
      {techIcons.map((icon, index) => (
        <motion.div
          key={index}
          initial={{
            left: `${icon.x}%`,
            top: `${icon.y}%`,
            opacity: 0,
          }}
          animate={{
            x: [0, 30, -30, 0],
            y: [0, -30, 30, 0],
            opacity: theme === 'dark' ? [0.1, 0.25, 0.15, 0.1] : [0.08, 0.18, 0.12, 0.08],
            rotate: [0, 180, 360],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: icon.delay,
          }}
          style={{
            position: 'absolute',
            width: `${icon.size}px`,
            height: `${icon.size}px`,
            willChange: 'transform, opacity',
            pointerEvents: 'none',
          }}
        >
          <Image
            src={`/svgs/${icon.name}.svg`}
            alt=""
            width={icon.size}
            height={icon.size}
            style={{
              width: '100%',
              height: '100%',
              filter:
                theme === 'dark'
                  ? 'invert(1) brightness(1.5) opacity(0.7)'
                  : 'brightness(0.3) opacity(0.5)',
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default TechBackground;
