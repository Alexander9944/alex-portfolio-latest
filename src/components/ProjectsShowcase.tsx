'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';

const ProjectsShowcase = () => {
  const { theme } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<NodeJS.Timeout | null>(null);

  // Define theme colors
  const colors = {
    light: {
      background: '#F5F5F0',
      text: '#000B58',
      primary: '#FFD93D',
      secondary: '#000B58',
      cardBg: '#FFFFFF',
      cardBorder: '#FFD93D',
    },
    dark: {
      background: '#000000',
      text: '#F5F5F0',
      primary: '#FFD93D',
      secondary: '#F5F5F0',
      cardBg: '#1A2470',
      cardBorder: '#FFD93D',
    }
  };

  const currentColors = colors[theme];

  const projects = [
    {
      id: 1,
      name: "NLFCP",
      description: "Nurse-Led Family Caregiver Program, India",
      image: "/project-1.png",
      link: "https://nlfcp.vercel.app/"
    },
    {
      id: 2,
      name: "Cocomade Pvt Ltd",
      description: "Coconut oil production and export business based in Srilanka.",
      image: "/project-2.png",
      link: "https://cocomade-pvt-ltd.vercel.app/"
    },
    {
      id: 3,
      name: "Zest & Bite",
      description: "Modern Thai restaurant established in Toronto, Canada.",
      image: "/project-3.png",
      link: "https://zest-and-bite.netlify.app/"
    },
    
  ];

  const handlePrevious = () => {
    if (!animating) {
      setAnimating(true);
      setCurrentIndex(prev => (prev - 1 + projects.length) % projects.length);
      setTimeout(() => setAnimating(false), 500);
    }
  };

  const handleNext = () => {
    if (!animating) {
      setAnimating(true);
      setCurrentIndex(prev => (prev + 1) % projects.length);
      setTimeout(() => setAnimating(false), 500);
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isScrolling) return;
    
    e.preventDefault();
    setIsScrolling(true);
    
    if (e.deltaY > 0) {
      handleNext();
    } else if (e.deltaY < 0) {
      handlePrevious();
    }

    if (scrollTimeout.current) {
      clearTimeout(scrollTimeout.current);
    }
    scrollTimeout.current = setTimeout(() => {
      setIsScrolling(false);
    }, 800);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.code === "ArrowLeft" || e.code === "ArrowUp") && !animating) {
        handlePrevious();
      }
      if ((e.code === "ArrowRight" || e.code === "ArrowDown") && !animating) {
        handleNext();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      if (scrollTimeout.current) {
        clearTimeout(scrollTimeout.current);
      }
    };
  }, [animating]);

  const currentProject = projects[currentIndex];

  return (
    <div 
      style={{
        position: 'relative',
        minHeight: 'auto',
        padding: '2rem 0',
        overflow: 'hidden'
      }}
      onWheel={handleWheel}
    >
      {/* Background decoration */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 5, 0],
          opacity: [0.05, 0.1, 0.05]
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          repeatType: "reverse"
        }}
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${currentColors.primary}40, transparent)`,
          filter: 'blur(60px)',
          pointerEvents: 'none'
        }}
      />

      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        padding: '0 1rem',
        position: 'relative'
      }}>
        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          style={{ 
            fontSize: 'clamp(1.5rem, 4vw, 2rem)',
            fontWeight: '600',
            color: currentColors.text,
            marginBottom: '2rem',
            textAlign: 'center'
          }}
        >
          Featured Projects
        </motion.h3>

        {/* Main Content */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          alignItems: 'center',
          minHeight: 'auto'
        }}
        className="projects-grid"
        >
          {/* Left Side - Project Info */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.5 }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1.5rem',
                width: '100%'
              }}
            >
              <h2 
                style={{
                  fontSize: 'clamp(1.75rem, 5vw, 3.5rem)',
                  fontWeight: '900',
                  color: currentColors.primary,
                  margin: 0,
                  lineHeight: 1.2
                }}
              >
                {currentProject.name}
              </h2>

              <p 
                style={{
                  fontSize: 'clamp(0.9rem, 2vw, 1.2rem)',
                  lineHeight: 1.6,
                  color: currentColors.text,
                  opacity: 0.9,
                  margin: 0
                }}
              >
                {currentProject.description}
              </p>

              <a
                href={currentProject.link}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'clamp(0.75rem, 2vw, 1rem) clamp(1.5rem, 3vw, 2rem)',
                  background: `linear-gradient(135deg, ${currentColors.primary}, ${currentColors.secondary})`,
                  color: '#000000',
                  textDecoration: 'none',
                  borderRadius: '8px',
                  fontWeight: '600',
                  fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                  width: 'fit-content',
                  transition: 'all 0.3s ease',
                  boxShadow: `0 4px 15px ${currentColors.primary}40`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 6px 20px ${currentColors.primary}60`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = `0 4px 15px ${currentColors.primary}40`;
                }}
              >
                View Project →
              </a>
            </motion.div>
          </AnimatePresence>

          {/* Right Side - Project Image */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              style={{
                position: 'relative',
                width: '100%',
                height: 'clamp(250px, 50vw, 350px)',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)',
                border: `2px solid ${currentColors.cardBorder}`
              }}
            >
              <Image
                src={currentProject.image}
                alt={currentProject.name}
                fill
                sizes="(max-width: 768px) 90vw, (max-width: 1024px) 50vw, 600px"
                style={{
                  objectFit: 'contain',
                  padding: '0.5rem'
                }}
                priority={currentIndex === 0}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(1rem, 3vw, 2rem)',
          marginTop: '2rem',
          flexWrap: 'wrap'
        }}>
          {/* Counter */}
          <div style={{
            fontSize: 'clamp(1.5rem, 4vw, 3rem)',
            fontWeight: 'bold',
            color: currentColors.primary,
            borderBottom: `3px solid ${currentColors.primary}`,
            paddingBottom: '0.5rem',
            minWidth: 'clamp(60px, 15vw, 80px)',
            textAlign: 'center'
          }}
          >
            0{currentIndex + 1}
          </div>

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', gap: '1rem' }}>
            <motion.button
              onClick={handlePrevious}
              disabled={animating}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 'clamp(2.5rem, 8vw, 3rem)',
                height: 'clamp(2.5rem, 8vw, 3rem)',
                borderRadius: '50%',
                border: `2px solid ${currentColors.primary}`,
                background: currentColors.cardBg,
                color: currentColors.primary,
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: animating ? 'not-allowed' : 'pointer',
                opacity: animating ? 0.5 : 1,
                transition: 'all 0.3s ease'
              }}
              aria-label="Previous project"
            >
              ←
            </motion.button>
            <motion.button
              onClick={handleNext}
              disabled={animating}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 'clamp(2.5rem, 8vw, 3rem)',
                height: 'clamp(2.5rem, 8vw, 3rem)',
                borderRadius: '50%',
                border: `2px solid ${currentColors.primary}`,
                background: currentColors.cardBg,
                color: currentColors.primary,
                fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: animating ? 'not-allowed' : 'pointer',
                opacity: animating ? 0.5 : 1,
                transition: 'all 0.3s ease'
              }}
              aria-label="Next project"
            >
              →
            </motion.button>
          </div>
        </div>

        {/* Project Indicators */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: 'clamp(0.3rem, 1vw, 0.5rem)',
          marginTop: '1.5rem'
        }}
        >
          {projects.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                if (!animating) {
                  setAnimating(true);
                  setCurrentIndex(index);
                  setTimeout(() => setAnimating(false), 500);
                }
              }}
              style={{
                width: index === currentIndex ? '2rem' : '0.5rem',
                height: '0.5rem',
                borderRadius: '0.25rem',
                border: 'none',
                background: index === currentIndex ? currentColors.primary : `${currentColors.primary}40`,
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              aria-label={`Go to project ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsShowcase;
