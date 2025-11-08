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
      className={`fixed inset-0 z-50 bg-black flex items-center justify-center transition-opacity duration-800 ${
        isExiting ? 'opacity-0' : 'opacity-100'
      }`}
    >
     

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Percentage counter */}
        <div className="text-white">
          <span className="text-8xl md:text-9xl font-bold tabular-nums">
            {Math.floor(progress)}
          </span>
          <span className="text-5xl md:text-6xl font-bold">%</span>
        </div>

        {/* Name or brand */}
        <div className="text-white text-sm tracking-[0.3em] opacity-60">
          Tharany Sivapaskaran
        </div>

        {/* Progress bar */}
        <div className="w-64 md:w-96 h-0.5 bg-white/20 overflow-hidden">
          <div
            className="h-full bg-white transition-all duration-100 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Loading text */}
        <div className="text-white text-xs tracking-widest opacity-40 mt-4">
          LOADING...
        </div>
      </div>

      {/* Corner decoration */}
      <div className="absolute top-8 right-8 text-white text-xs opacity-30">
        <div className="flex flex-col items-end gap-1">
          <div className="w-12 h-px bg-white"></div>
          <div>PORTFOLIO</div>
        </div>
      </div>
    </div>
  );
}
