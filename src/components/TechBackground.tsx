'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

// List of technology SVGs
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
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Check for dark mode
    const isDark = document.documentElement.classList.contains('dark');
    setTheme(isDark ? 'dark' : 'light');

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          const isDark = document.documentElement.classList.contains('dark');
          setTheme(isDark ? 'dark' : 'light');
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });

    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    // Create tech icons with random positions
    const icons = technologies.map((tech) => {
      return {
        name: tech,
        x: Math.random() * 100, // Random X position (0-100%)
        y: Math.random() * 100, // Random Y position (0-100%)
        size: 30 + Math.random() * 20, // Random size between 30-50px
        duration: 20 + Math.random() * 40, // Random animation duration
        delay: Math.random() * 5 // Random delay
      };
    });
    
    setTechIcons(icons);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      pointerEvents: 'none',
      zIndex: 1,
      overflow: 'hidden'
    }}>
      {techIcons.map((icon, index) => (
        <motion.div
          key={index}
          initial={{ 
            x: `${icon.x}vw`, 
            y: `${icon.y}vh`, 
            opacity: 0 
          }}
          animate={{
            x: [`${icon.x}vw`, `${icon.x + 10}vw`, `${icon.x - 5}vw`, `${icon.x}vw`],
            y: [`${icon.y}vh`, `${icon.y - 10}vh`, `${icon.y + 5}vh`, `${icon.y}vh`],
            opacity: [0.2, 0.3, 0.2]
          }}
          transition={{
            duration: icon.duration,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
            delay: icon.delay
          }}
          style={{
            position: 'absolute',
            width: `${icon.size}px`,
            height: `${icon.size}px`,
          }}
        >
          <Image 
            src={`/svgs/${icon.name}.svg`} 
            alt={icon.name}
            width={icon.size}
            height={icon.size}
            style={{
              width: '100%',
              height: '100%',
              filter: theme === 'dark' ? 'invert(1) brightness(1.5)' : 'brightness(0.5)',
              opacity: theme === 'dark' ? 0.4 : 0.3
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default TechBackground;
