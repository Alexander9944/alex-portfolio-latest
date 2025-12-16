'use client';

import { useState } from 'react';
import Loader from '@/components/Loader';
import HeroSection from '@/components/HeroSection';
import AboutSection from '@/components/AboutSection';
import ProjectsShowcase from '@/components/ProjectsShowcase';
import FooterSection from '@/components/FooterSection';

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      {isLoading && <Loader onLoadingComplete={() => setIsLoading(false)} />}
      {!isLoading && (
        <main className="overflow-x-hidden">
          <HeroSection />
          <AboutSection />
          <ProjectsShowcase />
          <FooterSection />
        </main>
      )}
    </>
  );
}
