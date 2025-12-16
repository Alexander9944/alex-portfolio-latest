'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

const ProjectsShowcase = () => {
  const { theme } = useTheme();

  // Define projects once
  const projectsList = [
    {
      id: 1,
      name: "NLFCP",
      category: "Healthcare",
      description: "Nurse-Led Family Caregiver Program.",
      image: "/project-1.png",
      link: "https://nlfcp.vercel.app/"
    },
    {
        id: 2,
        name: "Cocomade",
        category: "E-Commerce",
        description: "Premium Coconut Oil Production.",
        image: "/project-2.png",
        link: "https://cocomade-pvt-ltd.vercel.app/"
      },
      {
        id: 3,
        name: "Zest & Bite",
        category: "Restaurant",
        description: "Modern Thai Cuisine.",
        image: "/project-3.png",
        link: "https://zest-and-bite.netlify.app/"
      },
      {
        id: 4,
        name: "EcoTrack", // Adding dummy projects if needed to ensure length, or just repeat
        category: "Sustainability",
        description: "Carbon footprint tracking dashboard.",
        image: "/project-1.png", // Reusing placeholders if unique ones aren't available
        link: "#"
      }
  ];

  // Create triple set to ensure smooth scrolling even on wide screens
  const projects = [...projectsList, ...projectsList, ...projectsList];

  return (
    <section 
      id="WORKS"
      className="relative py-32 overflow-hidden" 
      style={{
        background: theme === 'dark' ? '#000000' : '#FFF8D4'
      }}
    >
        <div className="container mx-auto px-6 md:px-12 mb-16 relative z-10 text-center">
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#FFD93D] mb-4">SELECTED WORKS</h2>
          <h3 className={`text-4xl md:text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#000B58]'}`}>
            Featured <span className="text-[#FFD93D]">Projects</span>
          </h3>
        </div>

        {/* Marquee Container */}
        {/* The container clips overflow */}
        <div className="w-full overflow-hidden group">
            {/* The wrapper moves. It must contain the scrolling items. */}
            <div 
                className="flex gap-12 w-max animate-scroll-slow hover:[animation-play-state:paused]"
            >
                {projects.map((project, idx) => (
                    <ProjectCard key={`${project.id}-${idx}`} project={project} theme={theme} />
                ))}
            </div>
        </div>
        
        <div className="container mx-auto px-6 mt-16 text-center">
            <p className={`text-sm tracking-widest opacity-60 ${theme === 'dark' ? 'text-white' : 'text-[#000B58]'}`}>
                HOVER TO PAUSE • CLICK TO VIEW
            </p>
        </div>
    </section>
  );
};

const ProjectCard = ({ project, theme }: { project: any, theme: string }) => {
  return (
    <a 
      href={project.link}
      target="_blank"
      rel="noopener noreferrer"
      className="relative h-[500px] w-[350px] md:w-[450px] shrink-0 overflow-hidden rounded-[2.5rem] glass-panel transition-all duration-500 cursor-pointer block border border-white/10 shadow-2xl group/card"
    >
      
      {/* Background Image - Absolute & Full Cover */}
      <div className="absolute inset-0 w-full h-full">
         <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover transition-transform duration-700 group-hover/card:scale-110"
            sizes="(max-width: 768px) 100vw, 50vw"
            priority={false}
        />
      </div>
      
      {/* Dark Overlay Gradient for better text visibility */}
      <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 opacity-60 group-hover/card:opacity-80 transition-opacity duration-300`} />

      {/* Content */}
      <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
        <div className="transform translate-y-4 group-hover/card:translate-y-0 transition-transform duration-500">
            <span className="inline-block px-4 py-2 mb-4 text-xs font-bold tracking-widest text-black bg-[#FFD93D] rounded-full">
            {project.category.toUpperCase()}
            </span>
            
            <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 drop-shadow-md">
            {project.name}
            </h3>
            
            <p className="text-gray-200 mb-6 text-base line-clamp-3 leading-relaxed opacity-0 group-hover/card:opacity-100 transition-opacity duration-500 delay-100">
            {project.description}
            </p>

            <div 
            className="inline-flex items-center gap-3 text-[#FFD93D] font-bold tracking-wider text-sm md:text-base group-hover/card:gap-5 transition-all"
            >
            VIEW PROJECT 
            <span className="text-xl">→</span>
            </div>
        </div>
      </div>
    </a>
  );
};

export default ProjectsShowcase;
