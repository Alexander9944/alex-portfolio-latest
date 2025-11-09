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
  const [documentHeight, setDocumentHeight] = useState(0);

  useEffect(() => {
    setMounted(true);

    // Debounced document height updater (captures dynamic content changes)
    let heightTimer: number | null = null;
    const updateDocumentHeight = () => {
      if (heightTimer) window.clearTimeout(heightTimer);
      // debounce to avoid thrash during heavy DOM changes
      heightTimer = window.setTimeout(() => {
        setDocumentHeight(Math.max(
          document.body.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.clientHeight,
          document.documentElement.scrollHeight,
          document.documentElement.offsetHeight,
          window.innerHeight * 4 // Minimum 4 viewport heights
        ));
        heightTimer = null;
      }, 120);
    };

    // initial measurement
    updateDocumentHeight();

    // update on resize
    window.addEventListener('resize', updateDocumentHeight);

    // also observe DOM changes to capture async content and route changes
    const bodyObserver = new MutationObserver(() => {
      updateDocumentHeight();
    });
    bodyObserver.observe(document.body, { childList: true, subtree: true });

    // Check for dark mode and watch for theme class changes
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

    return () => {
      classObserver.disconnect();
      bodyObserver.disconnect();
      window.removeEventListener('resize', updateDocumentHeight);
      if (heightTimer) window.clearTimeout(heightTimer);
    };
  }, []);
  
  useEffect(() => {
    if (documentHeight === 0) return;
    
    // Create tech icons distributed across the entire document height
    const icons: Array<{ name: string; x: number; y: number; size: number; duration: number; delay: number }> = [];
    
    // Calculate how many sections we need based on document height
    const viewportHeight = window.innerHeight;
    const sectionsNeeded = Math.ceil(documentHeight / viewportHeight);
    const iconsPerSection = 15; // More icons per section
    
    // Distribute icons across the entire document height
    for (let section = 0; section < sectionsNeeded; section++) {
      for (let i = 0; i < iconsPerSection; i++) {
        const tech = technologies[Math.floor(Math.random() * technologies.length)];
        
        // Calculate Y position based on document sections
        const sectionStart = (section / sectionsNeeded) * 100;
        const sectionEnd = ((section + 1) / sectionsNeeded) * 100;
        
        icons.push({
          name: tech,
          x: Math.random() * 100, // Random X position (0-100% of viewport width)
          y: sectionStart + Math.random() * (sectionEnd - sectionStart), // Y position across document height
          size: 30 + Math.random() * 25, // Size: 30-55px
          duration: 20 + Math.random() * 25, // Animation: 20-45s
          delay: Math.random() * 15, // Delay: 0-15s
        });
      }
    }
    
    // Add extra random icons for organic feel
    for (let i = 0; i < 30; i++) {
      const tech = technologies[Math.floor(Math.random() * technologies.length)];
      icons.push({
        name: tech,
        x: Math.random() * 100,
        y: Math.random() * 100, // Distributed across full document height
        size: 25 + Math.random() * 30, // Size: 25-55px
        duration: 15 + Math.random() * 30, // Animation: 15-45s
        delay: Math.random() * 20,
      });
    }
    
    setTechIcons(icons);
  }, [documentHeight]);

  if (!mounted) {
    return null;
  }

  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: `${documentHeight}px`,
      pointerEvents: 'none',
      zIndex: 999,
      overflow: 'hidden'
    }}>
      {techIcons.map((icon, index) => {
        const xPos = (icon.x / 100) * window.innerWidth;
        const yPos = (icon.y / 100) * documentHeight;
        
        return (
          <motion.div
            key={index}
            initial={{ 
              x: xPos, 
              y: yPos, 
              opacity: 0 
            }}
            animate={{
              x: [
                xPos, 
                Math.max(50, Math.min(window.innerWidth - 50, xPos + (Math.random() - 0.5) * 200)), 
                Math.max(50, Math.min(window.innerWidth - 50, xPos + (Math.random() - 0.5) * 150)), 
                xPos
              ],
              y: [
                yPos, 
                Math.max(50, Math.min(documentHeight - 50, yPos + (Math.random() - 0.5) * 200)), 
                Math.max(50, Math.min(documentHeight - 50, yPos + (Math.random() - 0.5) * 150)), 
                yPos
              ],
              opacity: [0.2, 0.5, 0.3, 0.2],
              rotate: [0, 180, 360],
              scale: [1, 1.1, 0.9, 1]
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
              willChange: 'transform, opacity',
              mixBlendMode: 'screen',
              pointerEvents: 'none'
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
              filter: theme === 'dark' 
                ? 'invert(1) brightness(1.3) contrast(1.2)' 
                : 'brightness(0.3) contrast(1.3) sepia(0.2)',
              opacity: theme === 'dark' ? 0.7 : 0.6
            }}
            />
          </motion.div>
        );
      })}
    </div>
  );
};

export default TechBackground;
