'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme or default to light
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark';
    const isDark = savedTheme === 'dark' || document.documentElement.classList.contains('dark');
    const currentTheme = isDark ? 'dark' : 'light';
    setTheme(currentTheme);
    
    // Apply the theme immediately
    if (currentTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    
    // Apply theme to document
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <motion.div
      onClick={toggleTheme}
      initial="initial"
      animate={theme === 'light' ? "light" : "dark"}
      whileHover="hover"
      whileTap="tap"
      variants={{
        hover: { scale: 1.05 },
        tap: { scale: 0.95 },
      }}
      style={{
        position: 'relative',
        width: 'clamp(60px, 8vw, 70px)',
        height: 'clamp(32px, 4vw, 36px)',
        borderRadius: '34px',
        cursor: 'pointer',
        background: theme === 'dark' 
          ? 'linear-gradient(to bottom, #87CEEB, #E0F6FF)' 
          : 'linear-gradient(to bottom, #000814, #001D3D)',
        boxShadow: theme === 'dark'
          ? '0 4px 15px rgba(135, 206, 235, 0.5), inset 0 -2px 5px rgba(0,0,0,0.1)'
          : '0 4px 15px rgba(0, 0, 0, 0.8), inset 0 -2px 5px rgba(255,255,255,0.05)',
        overflow: 'hidden',
        transition: 'background 0.5s ease, box-shadow 0.5s ease',
        flexShrink: 0,
      }}
    >
      {/* Background transition overlay */}
      <motion.div
        variants={{
          initial: { opacity: 0 },
          light: { opacity: 1 },
          dark: { opacity: 0 }
        }}
        transition={{ duration: 0.7 }}
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 70% 50%, #203A43 0%, #0F2027 100%)',
          zIndex: 0
        }}
      />

      {/* Clouds - only in dark mode (to switch to light) */}
      {[...Array(3)].map((_, i) => (
        <motion.div
          key={`cloud-${i}`}
          variants={{
            initial: { opacity: theme === 'dark' ? 0.8 : 0, x: `${i * 20}%` },
            light: { opacity: 0, x: `${i * 20}%` },
            dark: { 
              opacity: 0.8, 
              x: [`${i * 20}%`, `${i * 20 + 10}%`, `${i * 20}%`],
            },
          }}
          transition={{ 
            opacity: { duration: 0.5 },
            x: { repeat: Infinity, duration: 10 + i * 5, ease: "easeInOut", repeatType: "mirror" }
          }}
          style={{
            position: 'absolute',
            width: `${14 + i * 2}px`,
            height: `${6 + i}px`,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.9)',
            filter: 'blur(1px)',
            top: `${8 + (i * 5)}px`,
            left: `${10 + (i * 15)}px`,
            zIndex: 1
          }}
        />
      ))}

      {/* Sun with rays - shows in dark mode (to switch to light) */}
      <motion.div
        variants={{
          initial: { scale: 1, opacity: 1 },
          light: { scale: 0.5, opacity: 0 },
          dark: { scale: 1, opacity: 1, rotate: [0, 180, 360] },
          hover: { scale: 1.1 }
        }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20,
          rotate: { repeat: Infinity, duration: 20, ease: "linear" }
        }}
        style={{
          position: 'absolute',
          top: '2px',
          left: '7px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'linear-gradient(to right, #FFD700, #FFA500)',
          boxShadow: '0 0 15px rgba(255, 215, 0, 0.8)',
          zIndex: 2
        }}
      >
        {/* Sun rays */}
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={`ray-${i}`}
            variants={{
              initial: { scale: 1, opacity: 0.7 },
              light: { scale: 1, opacity: 0 },
              dark: { scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }
            }}
            transition={{ 
              scale: { 
                repeat: Infinity, 
                duration: 2, 
                delay: i * 0.2,
                repeatType: "mirror" 
              },
              opacity: { 
                repeat: Infinity, 
                duration: 2, 
                delay: i * 0.2,
                repeatType: "mirror" 
              }
            }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '24px',
              height: '2px',
              borderRadius: '1px',
              background: 'rgba(255, 215, 0, 0.8)',
              transformOrigin: 'left center',
              transform: `rotate(${i * 45}deg) translateX(5px)`,
              zIndex: 1
            }}
          />
        ))}
      </motion.div>
      
      {/* Moon with detailed craters - shows in light mode (to switch to dark) */}
      <motion.div
        variants={{
          initial: { x: '-100%', opacity: 0, rotate: 0 },
          light: { x: '0%', opacity: 1, rotate: [0, -10, 0] },
          dark: { x: '-100%', opacity: 0, rotate: 0 },
          hover: { scale: 1.1 }
        }}
        transition={{ 
          type: "spring", 
          stiffness: 200, 
          damping: 20,
          rotate: { duration: 5, repeat: Infinity, repeatType: "reverse" }
        }}
        style={{
          position: 'absolute',
          top: '7px',
          right: '7px',
          width: '20px',
          height: '20px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #E6E6FA 0%, #B0C4DE 100%)',
          boxShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
          zIndex: 2
        }}
      >
        {/* Moon craters */}
        {[
          { top: '5px', left: '3px', width: '5px', height: '5px' },
          { top: '12px', left: '10px', width: '3px', height: '3px' },
          { top: '3px', left: '12px', width: '4px', height: '4px' }
        ].map((crater, i) => (
          <motion.div
            key={`crater-${i}`}
            style={{
              position: 'absolute',
              top: crater.top,
              left: crater.left,
              width: crater.width,
              height: crater.height,
              borderRadius: '50%',
              background: 'rgba(180, 180, 220, 0.8)',
              boxShadow: 'inset 1px 1px 3px rgba(0,0,0,0.2)',
            }}
          />
        ))}
      </motion.div>
      
      {/* Stars with twinkling effect - only visible in light mode (to switch to dark) */}
      {[...Array(12)].map((_, i) => {
        const size = 1 + Math.random() * 2;
        return (
          <motion.div
            key={`star-${i}`}
            variants={{
              initial: { opacity: 0, scale: 0 },
              light: { 
                opacity: [0.2, 1, 0.2], 
                scale: [1, 1.5, 1],
              },
              dark: { opacity: 0, scale: 0 },
            }}
            transition={{ 
              opacity: { 
                repeat: Infinity, 
                duration: 1 + Math.random() * 3,
                delay: i * 0.2,
                repeatType: "mirror"
              },
              scale: {
                repeat: Infinity,
                duration: 1 + Math.random() * 3,
                delay: i * 0.2,
                repeatType: "mirror"
              }
            }}
            style={{
              position: 'absolute',
              width: `${size}px`,
              height: `${size}px`,
              background: 'white',
              borderRadius: '50%',
              top: `${5 + Math.random() * 30}px`,
              left: `${10 + Math.random() * 50}px`,
              boxShadow: '0 0 4px white',
              zIndex: 1
            }}
          />
        );
      })}
      
      {/* Sliding toggle indicator with glow effect */}
      <motion.div
        variants={{
          initial: { x: theme === 'light' ? '0%' : 'calc(100% - 28px)' },
          light: { x: '0%' },
          dark: { x: 'calc(100% - 28px)' }
        }}
        transition={{ 
          type: "spring", 
          stiffness: 500, 
          damping: 30,
          restDelta: 0.001
        }}
        style={{
          position: 'absolute',
          width: '28px',
          height: '28px',
          borderRadius: '50%',
          top: '6px',
          left: '3px',
          background: theme === 'dark' 
            ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(220, 220, 255, 0.9))' 
            : 'linear-gradient(135deg, rgba(30, 30, 70, 0.9), rgba(20, 20, 40, 0.9))',
          boxShadow: theme === 'dark'
            ? '0 2px 8px rgba(0,0,0,0.2), 0 0 15px rgba(135, 206, 235, 0.5)'
            : '0 2px 8px rgba(0,0,0,0.4), 0 0 10px rgba(30, 30, 70, 0.5)',
          zIndex: 3
        }}
      >
        {/* Toggle inner details */}
        <motion.div
          variants={{
            light: { opacity: 0 },
            dark: { opacity: 1 }
          }}
          style={{
            position: 'absolute',
            width: '10px',
            height: '2px',
            background: 'rgba(255, 160, 0, 0.8)',
            borderRadius: '1px',
            top: '13px',
            left: '9px',
          }}
        />
        <motion.div
          variants={{
            light: { opacity: 1 },
            dark: { opacity: 0 }
          }}
          style={{
            position: 'absolute',
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            background: 'rgba(230, 230, 250, 0.8)',
            top: '11px',
            right: '9px',
          }}
        />
      </motion.div>
    </motion.div>
  );
}
