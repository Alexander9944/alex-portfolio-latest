'use client';

import { motion } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';
import CountUp from 'react-countup';
import ProjectsShowcase from './ProjectsShowcase';

const AboutSection = () => {
  const { theme } = useTheme();
  
  useEffect(() => {
    console.log('Current theme mode:', theme);
  }, [theme]);
  
  // Define theme colors
  const colors = {
    light: {
      background: '#FFF8D4',
      text: '#000B58',
      textSecondary: '#000B58',
      primary: '#FFD93D',
      primaryLight: '#FFE685',
      primaryDark: '#E6C435',
      secondary: '#000B58',
      secondaryLight: '#1A2470',
      secondaryDark: '#000842',
      border: '#FFD93D',
      card: '#FFF8D4',
      cardBorder: '#FFD93D',
      progressBg: '#E6E6E0',
      progressFill: '#FFD93D'
    },
    dark: {
      background: '#000000',
      text: '#FFF8D4',
      textSecondary: '#FFD93D',
      primary: '#FFD93D',
      primaryLight: '#FFE685',
      primaryDark: '#E6C435',
      secondary: '#F5F5F0',
      secondaryLight: '#FFFFFF',
      secondaryDark: '#E6E6E0',
      border: '#FFD93D',
      card: 'transparent',
      cardBorder: '#FFD93D',
      progressBg: '#1A2470',
      progressFill: '#FFD93D'
    }
  };
  
  const currentColors = colors[theme];
  const sectionRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      // Get section's bounding rectangle
      const rect = section.getBoundingClientRect();
      
      // Calculate mouse position relative to the section
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      setMousePosition({ x, y });
    };
    
    // Only track mouse movement when inside the section
    section.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);
  
  // Skills data
  const skills = [
    { name: 'JavaScript', proficiency: 95 },
    { name: 'React.js', proficiency: 90 },
    { name: 'Next.js', proficiency: 80 },
    { name: 'Node.js', proficiency: 85 },
    { name: 'MongoDB', proficiency: 80 },
    { name: 'UI/UX Design', proficiency: 80 },
    { name: 'CSS/TailwindCSS', proficiency: 80 },
    
  ];
  
  // Experience data
  const experiences = [
    {
      period: 'July 2025 - Present',
      role: 'Mentor',
      company: 'Yarl IT Hub',
      description: 'Mentoring the aspiring students, Lecture them full stack programming, Organizing events and workshops, Managing the entire unit.'
    },
    {
      period: 'Jan 2025 - July 2025',
      role: 'Software Development Engineer',
      company: 'Cred4Future',
      description: 'Designed and developed custom websites and web applications for clients using MERN ensuring responsive design and cross-browser compatibility'
    },
  ];
  
  // Education data
  const education = [
    {
      period: '2015 - 2019',
      degree: 'Bachelor of Electronics and Communication Engineering',
      institution: 'Moutzion College of Engineering and Technology'
    },
    {
      period: '2014 - 2015',
      degree: '12th Grade Biomaths',
      institution: 'Raja Matriculation Higher Secondary School'
    },
    {
      period: '2013 - 2014',
      degree: '10th Grade',
      institution: 'Raja Matriculation Higher Secondary School'
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div 
      id="ABOUT ME"
      style={{ 
        position: 'relative',
        padding: '8rem 0 3rem 0',
        overflow: 'hidden',
        zIndex: 230,
        backgroundColor: currentColors.background,
        color: currentColors.text,
        minHeight: '100vh',
        transition: 'background-color 0.3s ease, color 0.3s ease'
      }}
      ref={sectionRef}
    >
      {/* Background decoration */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', zIndex: 0 }}>
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
            top: '-10%',
            right: '-5%',
            width: '40%',
            height: '40%',
            borderRadius: '40%',
            background: `radial-gradient(circle, ${currentColors.primaryLight}40, ${currentColors.secondaryLight}40)`,
            filter: 'blur(60px)'
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -5, 0],
            opacity: [0.05, 0.08, 0.05]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
            delay: 2
          }}
          style={{
            position: 'absolute',
            bottom: '-15%',
            left: '-10%',
            width: '50%',
            height: '50%',
            borderRadius: '40%',
            background: `radial-gradient(circle, ${currentColors.secondaryLight}40, ${currentColors.primaryLight}40)`,
            filter: 'blur(70px)'
          }}
        />
      </div>

      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        padding: '0 1rem',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{ marginBottom: '2rem', textAlign: 'center' }}
        >
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
            style={{
              display: 'inline-block',
              fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
              fontWeight: 'bold',
              backgroundImage: `linear-gradient(to right, ${currentColors.primary}, ${currentColors.secondary})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              marginBottom: '1rem'
            }}
          >
            {['A', 'b', 'o', 'u', 't', ' ', 'M', 'e'].map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ 
                  duration: 0.4, 
                  delay: 0.3 + index * 0.1,
                  ease: "backOut" 
                }}
                style={{ display: 'inline-block', whiteSpace: 'pre' }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: '80px' }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
            style={{
              height: '4px',
              background: `linear-gradient(to right, ${currentColors.primary}, ${currentColors.secondary})`,
              margin: '0 auto',
              borderRadius: '2px'
            }}
          />
        </motion.div>

        {/* Random Positioned Text Blocks with Image */}
        <div 
        className="about-layout"
        >
          {/* Profile Image - Top Left on desktop, centered on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            style={{ 
              zIndex: 3
            }}
            className="profile-image-container"
          >
            <div style={{ position: 'relative' }}>
              {/* Shape decoration */}
              <motion.div
                animate={{ 
                  rotate: [0, 360],
                  scale: [1, 1.05, 1]
                }}
                transition={{ 
                  rotate: { duration: 30, repeat: Infinity, ease: "linear" },
                  scale: { duration: 8, repeat: Infinity, repeatType: "reverse" }
                }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  border: `2px solid ${currentColors.primaryLight}80`,
                  borderRadius: '38% 62% 63% 37% / 41% 44% 56% 59%',
                  top: '-5%',
                  left: '-5%',
                  zIndex: -1
                }}
              />
              <motion.div
                animate={{ 
                  rotate: [360, 0],
                  scale: [1, 1.08, 1]
                }}
                transition={{ 
                  rotate: { duration: 25, repeat: Infinity, ease: "linear" },
                  scale: { duration: 10, repeat: Infinity, repeatType: "reverse" }
                }}
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  border: `2px solid ${currentColors.secondaryLight}80`,
                  borderRadius: '63% 37% 38% 62% / 46% 49% 51% 54%',
                  top: '5%',
                  left: '5%',
                  zIndex: -1
                }}
              />
              
              {/* Profile image container */}
              <motion.div
                initial={{ perspective: 1000 }}
                whileHover={{ 
                  rotateY: 5,
                  rotateX: -5,
                  scale: 1.05,
                  transition: { duration: 0.4 }
                }}
                style={{
                  position: 'relative',
                  width: 'clamp(220px, 60vw, 280px)',
                  height: 'clamp(275px, 75vw, 350px)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  boxShadow: '0 15px 30px rgba(0, 0, 0, 0.15)',
                  border: `4px solid ${currentColors.border}`,
                  transformStyle: 'preserve-3d'
                }}
              >
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: `linear-gradient(45deg, ${currentColors.primary}40, transparent)`,
                  zIndex: 2,
                  opacity: 0.3,
                  mixBlendMode: 'overlay',
                  pointerEvents: 'none'
                }} />
                <Image
                  src="/img5.png" 
                  alt="About"
                  width={280}
                  height={350}
                  sizes="(max-width: 768px) 60vw, 280px"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  quality={75}
                  priority
                />
              </motion.div>
              
              {/* Stats badges - positioned responsively */}
              {[
                { label: '2 Years', desc: 'Experience' },
                { label: '10+', desc: 'Projects' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  animate={{ 
                    y: [0, -8, 0], 
                    rotate: [0, index % 2 === 0 ? 2 : -2, 0] 
                  }}
                  whileHover={{ scale: 1.1, transition: { duration: 0.2 } }}
                  style={{
                    position: 'absolute',
                    backgroundColor: currentColors.card,
                    color: currentColors.text,
                    padding: 'clamp(0.5rem, 2vw, 0.75rem) clamp(0.75rem, 3vw, 1rem)',
                    borderRadius: '12px',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)',
                    border: `1px solid ${currentColors.cardBorder}`,
                    cursor: 'pointer',
                    top: index === 0 ? '1%' : '40%',
                    left: index === 0 ? '-8%' : 'auto',
                    right: index === 0 ? 'auto' : '-8%'
                  }}
                  className="stat-badge"
                  transition={{ 
                    y: { repeat: Infinity, duration: 4, delay: index, repeatType: "reverse" },
                    rotate: { repeat: Infinity, duration: 4, delay: index, repeatType: "reverse" }
                  }}
                >
                  <div style={{ 
                    fontWeight: 'bold', 
                    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                    color: currentColors.primary 
                  }}>
                    {stat.label}
                  </div>
                  <div style={{ 
                    fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                    color: currentColors.textSecondary
                  }}>
                    {stat.desc}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Text Block 1 - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              backgroundColor: currentColors.card,
              padding: 'clamp(1rem, 3vw, 2rem)',
              borderRadius: '16px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
              border: `2px solid ${currentColors.cardBorder}`,
              zIndex: 2,
              marginBottom: '1.5rem'
            }}
            className="text-block text-block-1"
          >
            <motion.p
              style={{
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                color: currentColors.text,
                lineHeight: '1.8',
                margin: 0
              }}
            >
              I'm <span style={{ color: currentColors.primary, fontWeight: 'bold' }}>Alexander Abraham</span>, a passionate Full-Stack Developer with a strong foundation in Electronics and Communication Engineering and hands-on experience building scalable, user-friendly web applications. After working as a University Instructor, I transitioned into software development — driven by a deep interest in creating real-world digital solutions that make a difference.
            </motion.p>
          </motion.div>

          {/* Text Block 2 - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{
              backgroundColor: currentColors.card,
              padding: 'clamp(1rem, 3vw, 2rem)',
              borderRadius: '16px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
              border: `2px solid ${currentColors.cardBorder}`,
              zIndex: 2,
              marginBottom: '1.5rem'
            }}
            className="text-block text-block-2"
          >
            <motion.p
              style={{
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                color: currentColors.text,
                lineHeight: '1.8',
                margin: 0
              }}
            >
              I specialize in <span style={{ color: currentColors.primary, fontWeight: 'bold' }}>MERN stack development</span> (MongoDB, Express.js, React, Node.js) and have built diverse projects across healthcare, food delivery, and digital marketing domains. My work focuses on clean architecture, responsive design, and inclusive technology — from developing a hybrid healthcare web app for rural cancer caregivers to crafting dynamic e-commerce and multilingual platforms.
            </motion.p>
          </motion.div>

          {/* Text Block 3 - Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            style={{
              backgroundColor: currentColors.card,
              padding: 'clamp(1rem, 3vw, 2rem)',
              borderRadius: '16px',
              boxShadow: '0 8px 30px rgba(0, 0, 0, 0.1)',
              border: `2px solid ${currentColors.cardBorder}`,
              zIndex: 2,
              marginBottom: '1.5rem'
            }}
            className="text-block text-block-3"
          >
            <motion.p
              style={{
                fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                color: currentColors.text,
                lineHeight: '1.8',
                margin: 0
              }}
            >
              Beyond coding, I enjoy <span style={{ color: currentColors.primary, fontWeight: 'bold' }}>mentoring aspiring developers</span>, conducting tech workshops, and continuously learning new technologies like Next.js, Docker, and Machine Learning. My goal is to grow as a developer who bridges innovation and social impact — one project at a time.
            </motion.p>
          </motion.div>
        </div>

        {/* Original Content Below */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr',
          gap: '3rem',
          alignItems: 'start'
        }}>
          {/* About Text Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            
            {/* Skills */}
            <motion.div variants={itemVariants}>
              <h3 style={{ 
                fontSize: 'clamp(1.25rem, 3vw, 1.5rem)', 
                fontWeight: '600', 
                marginBottom: '1.5rem',
                color: currentColors.text,
                textShadow: 'none'
              }}>
                My Skills
              </h3>
              
              <div style={{ display: 'grid', gap: '1rem' }}>
                {skills.map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * index, duration: 0.5 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between',
                      marginBottom: '0.5rem'
                    }}>
                      <span style={{ 
                        fontWeight: '500',
                        color: currentColors.text,
                        textShadow: 'none',
                        opacity: 1
                      }}>
                        {skill.name}
                      </span>
                      <motion.span 
                        style={{ 
                          color: currentColors.primary,
                          fontWeight: '500',
                          textShadow: 'none',
                          opacity: 1
                        }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 1 + (index * 0.1) }}
                      >
                        <CountUp start={0} end={skill.proficiency} duration={2} delay={1 + (index * 0.1)} />%
                      </motion.span>
                    </div>
                    <div style={{ 
                      height: '8px',
                      backgroundColor: currentColors.progressBg,
                      borderRadius: '4px',
                      overflow: 'hidden',
                      position: 'relative'
                    }}>
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 0.2 + (index * 0.1) }}
                        style={{ 
                          height: '100%',
                          background: `linear-gradient(to right, ${currentColors.primary}, ${currentColors.secondary})`,
                          borderRadius: '4px',
                          position: 'relative'
                        }}
                      >
                        <motion.div
                          animate={{ 
                            opacity: [0.2, 0.8, 0.2],
                            x: ['0%', '100%']
                          }}
                          transition={{ 
                            duration: 2, 
                            repeat: Infinity,
                            ease: "linear"
                          }}
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '30%',
                            height: '100%',
                            background: `linear-gradient(90deg, transparent, ${currentColors.primaryLight}80, transparent)`,
                            borderRadius: '4px'
                          }}
                        />
                      </motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              variants={itemVariants}
              style={{ marginTop: '2.5rem' }}
            >
              <motion.a 
                href="/Alexander_Full_Stack_Developer.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                download="Alexander_Full_Stack_Developer.pdf"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8, duration: 0.6 }}
              >
                <motion.button
                  whileHover={{ 
                    scale: 1.05, 
                    boxShadow: `0 8px 20px ${currentColors.primary}40`
                  }}
                  whileTap={{ scale: 0.98 }}
                  animate={{ 
                    boxShadow: [
                      `0 4px 6px rgba(0, 0, 0, 0.1)`,
                      `0 6px 10px ${currentColors.primary}30`,
                      `0 4px 6px rgba(0, 0, 0, 0.1)`
                    ]
                  }}
                  transition={{
                    boxShadow: {
                      repeat: Infinity,
                      duration: 2,
                      repeatType: "reverse"
                    }
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: theme === 'dark' ? '#000B58' : '#F9F8F6',
                    color: '#ffffff',
                    borderRadius: '0.5rem',
                    fontWeight: '500',
                    border: 'none',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem'
                  }}
                >
                  <span>Download Resume</span>
                  <motion.svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="16" 
                    height="16" 
                    fill="currentColor" 
                    viewBox="0 0 16 16"
                    animate={{ y: [0, 3, 0] }}
                    transition={{ 
                      y: { repeat: Infinity, duration: 1.5, repeatType: "reverse" }
                    }}
                  >
                    <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
                    <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
                  </motion.svg>
                </motion.button>
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Timeline section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginTop: '3rem' }}
        >
          <h3 style={{ 
            fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
            fontWeight: '600',
            color: currentColors.text,
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Experience & Education
          </h3>
          
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2rem'
          }}
          className="timeline-grid"
          >
            {/* Experience Timeline */}
            <div>
              <h4 style={{ 
                fontSize: 'clamp(1rem, 3vw, 1.25rem)',
                fontWeight: '600',
                color: currentColors.primary,
                marginBottom: '1.5rem'
              }}>
                Work Experience
              </h4>
              
              <div style={{ position: 'relative' }}>
                {/* Vertical line */}
                <div style={{
                  position: 'absolute',
                  left: '7px',
                  top: '8px',
                  bottom: '8px',
                  width: '2px',
                  backgroundColor: currentColors.progressBg,
                  zIndex: 0
                }} />
                
                {experiences.map((exp, index) => (
                  <motion.div
                    key={exp.role}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 * index, duration: 0.5 }}
                    style={{
                      position: 'relative',
                      paddingLeft: '2rem',
                      marginBottom: '2rem'
                    }}
                  >
                    {/* Timeline dot with pulse effect */}
                    <motion.div 
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '8px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: currentColors.primary,
                        zIndex: 1
                      }}
                      whileInView={{
                        boxShadow: [
                          `0 0 0 0px ${currentColors.primary}00`,
                          `0 0 0 10px ${currentColors.primary}00`,
                          `0 0 0 10px ${currentColors.primary}50`,
                          `0 0 0 15px ${currentColors.primary}00`
                        ]
                      }}
                      transition={{
                        boxShadow: {
                          repeat: Infinity,
                          duration: 2,
                          repeatDelay: 1
                        }
                      }}
                    />
                    
                    <motion.div
                      whileHover={{ 
                        scale: 1.03, 
                        x: 5,
                        boxShadow: `0 8px 20px rgba(0, 0, 0, 0.1)`
                      }}
                      style={{
                        backgroundColor: currentColors.card,
                        borderRadius: '12px',
                        padding: 'clamp(1rem, 3vw, 1.5rem)',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                        border: `1px solid ${currentColors.cardBorder}`,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + 0.1 * index }}
                        style={{
                          fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                          color: currentColors.primary,
                          fontWeight: '500',
                          marginBottom: '0.5rem'
                        }}
                      >
                        {exp.period}
                      </motion.div>
                      <motion.h5
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + 0.1 * index }}
                        style={{
                          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                          fontWeight: '600',
                          color: currentColors.text,
                          marginBottom: '0.5rem'
                        }}
                      >
                        {exp.role}
                      </motion.h5>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + 0.1 * index }}
                        style={{
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                          color: currentColors.textSecondary,
                          marginBottom: '0.5rem',
                          fontWeight: '500'
                        }}
                      >
                        {exp.company}
                      </motion.div>
                      <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + 0.1 * index }}
                        style={{
                          fontSize: 'clamp(0.8rem, 2vw, 0.875rem)',
                          color: currentColors.textSecondary,
                          lineHeight: '1.6'
                        }}
                      >
                        {exp.description}
                      </motion.p>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Projects Showcase Section */}
        <motion.div
          id="WORKS"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginTop: '3rem' }}
        >
          <ProjectsShowcase />
        </motion.div>
        
        {/* Education Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{ marginTop: '3rem' }}
        >
          <h3 style={{ 
            fontSize: 'clamp(1.25rem, 4vw, 1.75rem)',
            fontWeight: '600',
            color: currentColors.text,
            textAlign: 'center',
            marginBottom: '2rem'
          }}>
            Education
          </h3>
          
          <div style={{ 
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            
            {/* Education Timeline */}
            <div>              
              <div style={{ position: 'relative' }}>
                {/* Vertical line */}
                <div style={{
                  position: 'absolute',
                  left: '7px',
                  top: '8px',
                  bottom: '8px',
                  width: '2px',
                  backgroundColor: currentColors.progressBg,
                  zIndex: 0
                }} />
                
                {education.map((edu, index) => (
                  <motion.div
                    key={edu.degree}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 * index, duration: 0.5 }}
                    style={{
                      position: 'relative',
                      paddingLeft: '2rem',
                      marginBottom: '2rem'
                    }}
                  >
                    {/* Timeline dot with pulse effect */}
                    <motion.div 
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '8px',
                        width: '16px',
                        height: '16px',
                        borderRadius: '50%',
                        backgroundColor: currentColors.secondary,
                        zIndex: 1
                      }}
                      whileInView={{
                        boxShadow: [
                          `0 0 0 0px ${currentColors.secondary}00`,
                          `0 0 0 10px ${currentColors.secondary}00`,
                          `0 0 0 10px ${currentColors.secondary}50`,
                          `0 0 0 15px ${currentColors.secondary}00`
                        ]
                      }}
                      transition={{
                        boxShadow: {
                          repeat: Infinity,
                          duration: 2,
                          repeatDelay: 1
                        }
                      }}
                    />
                    
                    <motion.div
                      whileHover={{ 
                        scale: 1.03, 
                        x: 5,
                        boxShadow: `0 8px 20px rgba(0, 0, 0, 0.1)`
                      }}
                      style={{
                        backgroundColor: currentColors.card,
                        borderRadius: '12px',
                        padding: 'clamp(1rem, 3vw, 1.5rem)',
                        boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
                        border: `1px solid ${currentColors.cardBorder}`,
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                    >
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + (index * 0.1) }}
                        style={{
                          fontSize: 'clamp(0.75rem, 2vw, 0.875rem)',
                          color: currentColors.primary,
                          fontWeight: '500',
                          marginBottom: '0.5rem'
                        }}
                      >
                        {edu.period}
                      </motion.div>
                      <motion.h5
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                        style={{
                          fontSize: 'clamp(1rem, 2.5vw, 1.125rem)',
                          fontWeight: '600',
                          color: currentColors.text,
                          marginBottom: '0.5rem'
                        }}
                      >
                        {edu.degree}
                      </motion.h5>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.5 + (index * 0.1) }}
                        style={{
                          fontSize: 'clamp(0.875rem, 2vw, 1rem)',
                          color: currentColors.textSecondary,
                          fontWeight: '500'
                        }}
                      >
                        {edu.institution}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutSection;
