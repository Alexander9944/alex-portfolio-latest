'use client';

import { useEffect, useState } from 'react';

interface LoaderProps {
  onLoadingComplete: () => void;
}

export default function Loader({ onLoadingComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    // Simulate loading progress
    const duration = 2500; // Total duration in ms
    const interval = 20; // Update interval in ms
    const increment = 100 / (duration / interval);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const newProgress = prev + increment;
        if (newProgress >= 100) {
          clearInterval(timer);
          // Start exit animation
          setTimeout(() => {
            setIsExiting(true);
            // Complete loading after exit animation
            setTimeout(() => {
              onLoadingComplete();
            }, 800);
          }, 300);
          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div
      className={`loader-container fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-800 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
      style={{
        color: 'white',
        backgroundColor: '#000000'
      }}
    >
     

        {/* Main content */}
        <div 
          className="relative z-10 flex flex-col items-center gap-8"
          style={{ color: 'white' }}
        >
          {/* Percentage counter */}
          <div style={{ color: 'white' }}>
            <span 
              className="text-8xl md:text-9xl font-bold tabular-nums" 
              style={{ 
                color: 'white !important',
                WebkitTextFillColor: 'white'
              }}
            >
              {Math.floor(progress)}
            </span>
            <span 
              className="text-5xl md:text-6xl font-bold" 
              style={{ 
                color: 'white !important',
                WebkitTextFillColor: 'white'
              }}
            >%</span>
          </div>
  
          {/* Name or brand */}
          <div 
            className="text-sm tracking-[0.3em] opacity-60" 
            style={{ 
              color: 'white !important',
              WebkitTextFillColor: 'white'
            }}
          >
            THARANY
          </div>
  
          {/* Progress bar */}
          <div className="w-64 md:w-96 h-0.5 bg-white/20 overflow-hidden">
            <div
              className="h-full bg-white transition-all duration-100 ease-out"
              style={{ width: `${progress}%`, backgroundColor: 'white' }}
            ></div>
          </div>
  
          {/* Loading text */}
          <div 
            className="text-xs tracking-widest opacity-40 mt-4" 
            style={{ 
              color: 'white !important',
              WebkitTextFillColor: 'white'
            }}
          >
            LOADING
          </div>
        </div>
  
        {/* Corner decoration */}
        <div 
          className="absolute top-8 right-8 text-xs opacity-30" 
          style={{ 
            color: 'white !important',
            WebkitTextFillColor: 'white'
          }}
        >
          <div 
            style={{ 
              color: 'white !important',
              WebkitTextFillColor: 'white'
            }}
                >PORTFOLIO</div>
              </div>
          </div>
        );
      }
