'use client';

import { motion, useAnimation, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTheme } from '@/contexts/ThemeContext';

const FooterSection = () => {
  const { theme } = useTheme();
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });
  const [showContactForm, setShowContactForm] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [cards, setCards] = useState<any[]>([]);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [gameStartTime, setGameStartTime] = useState<number | null>(null);
  const [gameEndTime, setGameEndTime] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const controls = useAnimation();

  // Define theme colors
  const colors = {
    light: {
      background: '#FFF8D4',
      text: '#000B58',
      textSecondary: '#000B58',
      primary: '#FFD93D',
      secondary: '#000B58',
      footerBg: '#FFFFFF',
      cardBg: '#FFFFFF'
    },
    dark: {
      background: '#000000',
      text: '#FFF8D4',
      textSecondary: '#FFD93D',
      primary: '#FFD93D',
      secondary: '#F5F5F0',
      footerBg: '#001070',
      cardBg: '#000B58'
    }
  };

  const currentColors = colors[theme];

  // Social links data
  const socialLinks = [
    { name: 'GitHub', icon: 'github', url: 'https://github.com/Alexander9944' },
    { name: 'LinkedIn', icon: 'linkedin', url: 'https://www.linkedin.com/in/alexander-abraham-5814251b7/' },
    { name: 'Instagram', icon: 'instagram', url: 'https://www.instagram.com/alexander.1388/' },
  ];

  // Track window size
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight
      });
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    // Load high score from localStorage
    const savedHighScore = localStorage.getItem('memoryGameHighScore');
    if (savedHighScore) {
      setHighScore(parseInt(savedHighScore));
    }

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize the memory game
  const initGame = () => {
    setGameActive(true);
    setGameCompleted(false);
    setScore(0);
    setGameStartTime(Date.now());
    setGameEndTime(null);
    const newCards = generateCards();
    setCards(newCards);
  };

  // Generate card pairs
  const generateCards = () => {
    const cardValues = ['🍎', '🍌', '🍇', '🍉', '🍓', '🍊', '🍍', '🍑'];
    const cardPairs = [...cardValues, ...cardValues].sort(() => Math.random() - 0.5);
    return cardPairs.map((value, index) => ({
      id: index,
      value,
      flipped: false,
      matched: false
    }));
  };

  // Check if the game is complete
  useEffect(() => {
    if (gameActive && cards.length > 0) {
      const allMatched = cards.every(card => card.matched);
      if (allMatched) {
        const endTime = Date.now();
        setGameEndTime(endTime);
        setGameCompleted(true);
        
        // Update high score if needed
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('memoryGameHighScore', score.toString());
        }
      }
    }
  }, [cards, gameActive, score, highScore]);

  // Handle card click
  const handleCardClick = (id: number) => {
    if (!gameActive || gameCompleted) return;
  
    // Get the clicked card
    const clickedCard = cards[id];
  
    // If card is already flipped or matched, ignore the click
    if (clickedCard.flipped || clickedCard.matched) return;
  
    // Check if we already have two cards flipped
    const flippedCards = cards.filter(c => c.flipped && !c.matched);
    
    // If we already have two flipped cards that don't match, flip them back first
    if (flippedCards.length === 2) {
      // Create a new array with the non-matching cards flipped back
      const updatedCards = cards.map(card => {
        if (card.flipped && !card.matched) {
          return { ...card, flipped: false };
        }
        return card;
      });
      
      // Then immediately flip the new card that was clicked
      updatedCards[id].flipped = true;
      
      // Update the state with this new arrangement
      setCards(updatedCards);
      return;
    }
  
    // Normal case (0 or 1 cards flipped): flip the clicked card
    setCards(prevCards => {
      const newCards = [...prevCards];
      newCards[id].flipped = true;
      
      // Check if we now have two flipped cards
      const flippedCards = newCards.filter(c => c.flipped && !c.matched);
      
      if (flippedCards.length === 2) {
        // Check if the two flipped cards match
        if (flippedCards[0].value === flippedCards[1].value) {
          // If they match, mark them as matched
          flippedCards.forEach(c => {
            newCards[newCards.findIndex(card => card.id === c.id)].matched = true;
          });
          setScore(prev => prev + 1);
        } else {
          // If they don't match, schedule them to be flipped back
          setTimeout(() => {
            setCards(prevCards => {
              return prevCards.map(c => {
                if (c.flipped && !c.matched) {
                  return { ...c, flipped: false };
                }
                return c;
              });
            });
          }, 1000);
        }
      }
      
      return newCards;
    });
  };

  // Get game duration in seconds
  const getGameDuration = () => {
    if (!gameStartTime || !gameEndTime) return 0;
    return Math.floor((gameEndTime - gameStartTime) / 1000);
  };

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const scrollToSection = (sectionId: string) => {
    // Map section names to their actual IDs
    const sectionIdMap: { [key: string]: string } = {
      'home': '', // Scroll to top for home
      'about me': 'ABOUT ME',
      'works': 'WORKS', 
      'skills': 'ABOUT ME', // Skills are part of the About Me section
      'contact': 'CONTACT'
    };

    const targetId = sectionIdMap[sectionId.toLowerCase()];
    
    if (targetId === '') {
      // Scroll to top for home
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    } else if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  // Enhanced social icon variants
  const socialIconVariants = {
    hover: {
      y: -5,
      scale: 1.1,
      backgroundColor: theme === 'light' ? '#0991cf' : '#26a6e0',
      boxShadow: '0 6px 12px rgba(0, 0, 0, 0.15)',
      transition: { 
        type: "spring" as const, 
        stiffness: 500,
        backgroundColor: { duration: 0.2 }
      }
    },
    tap: { 
      scale: 0.9,
      y: 0,
      transition: { type: "spring" as const, stiffness: 300 }
    }
  };

  const gameContainerVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.04
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.9,
      transition: { 
        when: "afterChildren",
        staggerChildren: 0.02,
        staggerDirection: -1
      }
    }
  };
  
  const gameCardVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 20 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      y: 0,
      transition: { type: "spring" as const, stiffness: 300, damping: 24 }
    },
    exit: { opacity: 0, scale: 0.8, y: -20, transition: { duration: 0.2 } }
  };

  const showCompletionEffect = () => {
    // Create a staggered effect of small elements flying from bottom to top
    const colors = ['#FF5252', '#FFD740', '#40C4FF', '#69F0AE', '#FF4081'];
    const container = containerRef.current;
    
    if (container) {
      for (let i = 0; i < 30; i++) {
        const element = document.createElement('div');
        element.style.position = 'absolute';
        element.style.width = `${Math.random() * 10 + 5}px`;
        element.style.height = `${Math.random() * 10 + 5}px`;
        element.style.borderRadius = '50%';
        element.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        element.style.bottom = '0';
        element.style.left = `${Math.random() * 100}%`;
        element.style.transform = 'translateZ(0)';
        element.style.animation = `confetti ${Math.random() * 3 + 2}s ease-in forwards`;
        container.appendChild(element);
        
        // Remove element after animation
        setTimeout(() => {
          if (container.contains(element)) {
            container.removeChild(element);
          }
        }, 5000);
      }
    }
  };
  
  // Add a CSS keyframe animation to your component
  useEffect(() => {
    if (gameCompleted) {
      showCompletionEffect();
      
      // Add keyframe animation style
      const styleElement = document.createElement('style');
      styleElement.innerHTML = `
        @keyframes confetti {
          0% { transform: translateY(0) rotate(0); opacity: 1; }
          100% { transform: translateY(-100vh) rotate(${Math.random() * 360}deg); opacity: 0; }
        }
      `;
      document.head.appendChild(styleElement);
      
      return () => {
        document.head.removeChild(styleElement);
      };
    }
  }, [gameCompleted]);

  return (
    <div
      id="CONTACT"
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        backgroundColor: currentColors.background,
        paddingTop: '6rem',
        paddingBottom: '2rem',
        zIndex: 1000,
        transition: 'background-color 0.3s ease'
      }}
    >
      {/* Main footer content */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 10,
        padding: '0 2rem'
      }}>
        <div style={{
          display: 'flex',
          flexDirection: windowSize.width < 768 ? 'column' : 'row',
          justifyContent: 'space-between',
          gap: '2rem',
          marginBottom: '3rem'
        }}>
          {/* Logo and info section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              flex: '1',
              minWidth: windowSize.width < 768 ? '100%' : '300px'
            }}
          >
            <motion.h3
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                backgroundImage: `linear-gradient(to right, ${currentColors.primary}, ${currentColors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1rem'
              }}
            >
              Alexander Abraham
            </motion.h3>
            <p style={{
              color: currentColors.textSecondary,
              marginBottom: '1.5rem',
              lineHeight: '1.7'
            }}>
              Creating digital experiences that inspire and engage. Let's build something amazing together.
            </p>
            
            {/* Social links */}
            <div style={{
              marginTop: '2rem',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '1rem'
            }}>
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  whileHover="hover"
                  whileTap="tap"
                  variants={socialIconVariants}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    backgroundColor: currentColors.primary,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#fff',
                    textDecoration: 'none',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  }}
                >
                  {link.icon === 'github' && <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>}
                  {link.icon === 'linkedin' && <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>}
                  {link.icon === 'instagram' && <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>}
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Interactive game section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ flex: '1' }}
          >
            <AnimatePresence mode="wait">
              {gameActive && !gameCompleted ? (
                <motion.div 
                  key="game"
                  variants={gameContainerVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  style={{ 
                    display: 'grid', 
                    gridTemplateColumns: windowSize.width < 500 ? 'repeat(3, 1fr)' : 'repeat(4, 1fr)', 
                    gap: '0.75rem',
                    perspective: 1000
                  }}
                >
                  {cards.map((card, index) => (
                    <motion.div
                      key={card.id}
                      variants={gameCardVariants}
                      onClick={() => handleCardClick(index)}
                      animate={card.matched ? "matched" : card.flipped ? "flipped" : "initial"}
                      initial="initial"
                      whileHover={!card.flipped && !card.matched ? { scale: 1.05, boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)' } : {}}
                      whileTap={!card.flipped && !card.matched ? { scale: 0.95 } : {}}
                      style={{
                        width: '100%',
                        height: windowSize.width < 500 ? '70px' : '80px',
                        backgroundColor: 'transparent',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        perspective: 1000,
                        position: 'relative',
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* Card front (emoji value) */}
                      <div
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '2rem',
                          borderRadius: '8px',
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          backgroundColor: theme === 'light' ? '#ffffff' : '#2d3748',
                          transform: card.flipped || card.matched ? 'rotateY(0deg)' : 'rotateY(180deg)',
                          transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                          pointerEvents: 'none',
                        }}
                      >
                        {card.value}
                      </div>
                      
                      {/* Card back (question mark) */}
                      <div
                        style={{
                          position: 'absolute',
                          width: '100%',
                          height: '100%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '1.5rem',
                          fontWeight: 'bold',
                          borderRadius: '8px',
                          backfaceVisibility: 'hidden',
                          WebkitBackfaceVisibility: 'hidden',
                          backgroundColor: theme === 'light' ? '#e2e8f0' : '#4a5568',
                          color: theme === 'light' ? '#4a5568' : '#e2e8f0',
                          transform: card.flipped || card.matched ? 'rotateY(180deg)' : 'rotateY(0deg)',
                          transition: 'transform 0.6s cubic-bezier(0.4, 0.0, 0.2, 1)',
                          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                          pointerEvents: 'none',
                        }}
                      >
                        ?
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : gameCompleted ? (
                // Game completed result screen
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  style={{
                    backgroundColor: currentColors.cardBg,
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  <motion.div 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                      type: "spring",
                      stiffness: 260,
                      damping: 20,
                      duration: 0.6
                    }}
                    style={{ 
                      fontSize: '3rem', 
                      textAlign: 'center', 
                      marginBottom: '1rem' 
                    }}
                  >
                    <motion.span
                      animate={{ 
                        rotate: [0, 10, -10, 10, 0],
                        scale: [1, 1.2, 1, 1.2, 1]
                      }}
                      transition={{
                        duration: 1.5,
                        ease: "easeInOut",
                        times: [0, 0.2, 0.4, 0.6, 1],
                        repeat: 1,
                        repeatDelay: 0.5
                      }}
                      style={{ display: 'inline-block' }}
                    >
                      🎉
                    </motion.span>
                  </motion.div>
                  <motion.h5 
                    animate={{ 
                      color: ['#38bdf8', '#a78bfa', '#38bdf8'],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      ease: "easeInOut" 
                    }}
                    style={{
                      textAlign: 'center',
                      fontSize: '1.5rem',
                      fontWeight: 'bold',
                      marginBottom: '1rem'
                    }}
                  >
                    Congratulations!
                  </motion.h5>
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.5rem',
                    marginBottom: '1.5rem'
                  }}>
                    <p style={{ 
                      textAlign: 'center', 
                      color: currentColors.text,
                      fontSize: '1rem'
                    }}>
                      You completed the game in <b>{getGameDuration()} seconds</b>
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <motion.button
                      onClick={initGame}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        backgroundColor: '#FF6B35',
                        color: '#fff',
                        border: 'none',
                        fontWeight: '500',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      Play Again
                    </motion.button>
                    <motion.button
                      onClick={() => {
                        setGameActive(false);
                        setGameCompleted(false);
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      style={{
                        flex: 1,
                        padding: '0.75rem',
                        borderRadius: '0.5rem',
                        backgroundColor: 'transparent',
                        color: currentColors.text,
                        border: `1px solid ${currentColors.textSecondary}`,
                        fontWeight: '500',
                        cursor: 'pointer',
                        textAlign: 'center'
                      }}
                    >
                      Close
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  whileHover={{ scale: 1.02 }}
                  style={{
                    backgroundColor: currentColors.cardBg,
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
                    textAlign: 'center'
                  }}
                >
                  <motion.h5 
                    animate={{ 
                      backgroundPosition: ['0%', '100%'],
                    }}
                    transition={{ 
                      duration: 3, 
                      repeat: Infinity, 
                      repeatType: "reverse" 
                    }}
                    style={{
                      marginBottom: '1rem',
                      backgroundSize: '200%',
                      backgroundClip: 'text',
                      fontWeight: 'bold'
                    }}
                  >
                    Try a Fun Mini-Game!
                  </motion.h5>
                  <p style={{
                    fontSize: '0.875rem',
                    color: currentColors.textSecondary,
                    marginBottom: '1rem'
                  }}>
                    Take a break and play a quick game of "Memory Cards"
                  </p>
                  <motion.button
                    onClick={initGame}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      borderRadius: '0.5rem',
                      backgroundColor: '#FFF8D4',
                      color: '#000B58',
                      WebkitTextFillColor: '#000B58',
                      border: 'none',
                      fontWeight: '500',
                      cursor: 'pointer',
                      textAlign: 'center'
                    }}
                  >
                    Start Game
                  </motion.button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Contact information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          style={{
            marginBottom: '3rem',
            display: 'flex',
            flexDirection: windowSize.width < 768 ? 'column' : 'row',
            gap: '2rem'
          }}
        >
          <div style={{ flex: 1 }}>
            <motion.h2
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                display: 'inline-block',
                fontSize: '2.5rem',
                fontWeight: 'bold',
                backgroundImage: `linear-gradient(to right, ${currentColors.primary}, ${currentColors.secondary})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                marginBottom: '1rem'
              }}
            >
              {['G', 'e', 't', ' ', 'I', 'n', ' ', 'T', 'o', 'u', 'c', 'h'].map((char, index) => (
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
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: currentColors.text,
              marginBottom: '1rem'
            }}>
              Contact
            </h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <motion.li 
                whileHover={{ x: 5 }}
                style={{ 
                  display: 'flex', 
                  alignItems: 'center',
                  gap: '0.5rem',
                  marginBottom: '0.75rem',
                  color: currentColors.textSecondary
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <a 
                  href="mailto:contact@example.com" 
                  style={{ 
                    color: 'inherit', 
                    textDecoration: 'none',
                    transition: 'color 0.3s'
                  }}
                  onMouseOver={(e) => (e.target as HTMLElement).style.color = currentColors.primary}
                  onMouseOut={(e) => (e.target as HTMLElement).style.color = 'inherit'}
                >
                  Anderalex789@gmail.com
                </a>
              </motion.li>
              
            </ul>
          </div>
          <div style={{ flex: 1 }}>
            <h4 style={{
              fontSize: '1.125rem',
              fontWeight: '600',
              color: currentColors.text,
              marginBottom: '1rem'
            }}>
              Quick Links
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, columns: windowSize.width < 640 ? '1' : '2' }}>
              {['Home', 'About Me', 'Works'].map((item) => (
                <motion.li 
                  key={item}
                  whileHover={{ x: 5 }}
                  style={{ marginBottom: '0.75rem' }}
                >
                  <a 
                    onClick={() => scrollToSection(item.toLowerCase())}
                    style={{ 
                      color: currentColors.textSecondary,
                      textDecoration: 'none',
                      transition: 'color 0.3s',
                      cursor: 'pointer'
                    }}
                    onMouseOver={(e) => (e.target as HTMLElement).style.color = currentColors.primary}
                    onMouseOut={(e) => (e.target as HTMLElement).style.color = currentColors.textSecondary}
                  >
                    {item}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom bar with copyright */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          style={{
            display: 'flex',
            flexDirection: windowSize.width < 640 ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: windowSize.width < 640 ? 'center' : 'flex-end',
            gap: '1rem',
            paddingTop: '2rem',
            borderTop: `1px solid ${theme === 'light' ? 'rgba(0,0,0,0.1)' : 'rgba(255,255,255,0.1)'}`
          }}
        >
          <p style={{
            color: currentColors.textSecondary,
            fontSize: '0.875rem',
            textAlign: windowSize.width < 640 ? 'center' : 'left'
          }}>
            © {new Date().getFullYear()} Alexander Abraham. All rights reserved.
          </p>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.1, y: -5 }}
            whileTap={{ scale: 0.9 }}
            style={{
              backgroundColor: currentColors.primary,
              color: '#fff',
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 5L5 12M12 5L19 12M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
};

export default FooterSection;
