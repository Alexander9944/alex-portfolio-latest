'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import GsapButton from './GsapButton';
import { useTheme } from '@/contexts/ThemeContext';

interface Project {
  id: number;
  name: string;
  category: string;
  description: string;
  image: string;
  link: string;
}

const ProjectsShowcase = () => {
  const { theme } = useTheme();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Define projects
  const projectsList: Project[] = [
    {
      id: 1,
      name: "NLFCP",
      category: "Healthcare",
      description: "Nurse-Led Family Caregiver Program providing essential health support, educational tools, and resources for family caregivers.",
      image: "/project-1.png",
      link: "https://nlfcp.vercel.app/"
    },
    {
      id: 2,
      name: "Cocomade",
      category: "E-Commerce",
      description: "Premium Coconut Oil Production showcase and modern e-commerce platform built for high conversion.",
      image: "/project-2.png",
      link: "https://cocomade-pvt-ltd.vercel.app/"
    },
    {
      id: 3,
      name: "Zest & Bite",
      category: "Restaurant",
      description: "Modern Thai Cuisine restaurant platform featuring dynamic menus, interactive reservations, and online ordering.",
      image: "/project-3.png",
      link: "https://zest-and-bite.netlify.app/"
    },
    {
      id: 4,
      name: "EcoTrack",
      category: "Sustainability",
      description: "Carbon footprint tracking dashboard and real-time environmental data analytics suite.",
      image: "/project-1.png",
      link: "#"
    }
  ];

  // Create triple set to ensure smooth scrolling even on wide screens
  const projects = [...projectsList, ...projectsList, ...projectsList];

  return (
    <section 
      id="WORKS"
      className="relative pt-32 pb-36 md:pt-48 md:pb-48 overflow-hidden" 
      style={{
        background: theme === 'dark' ? '#000000' : '#FFF8D4'
      }}
    >
      <div className="container-custom my-16 py-12 md:my-24 md:py-20 relative z-10 text-center">
        <h3 className={`text-4xl md:text-6xl font-bold py-6 tracking-tight ${theme === 'dark' ? 'text-white' : 'text-[#000B58]'}`}>
          Featured <span className="text-[#FFD93D]">Projects</span>
        </h3>
      </div>

      {/* Marquee Container with pause on hover */}
      <div className="w-full overflow-hidden group py-4">
        <div className="flex gap-12 w-max animate-scroll-slow pause-on-hover">
          {projects.map((project, idx) => (
            <ProjectCard 
              key={`${project.id}-${idx}`} 
              project={project} 
              theme={theme}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>
      
      <div className="container-custom mt-20 md:mt-28 text-center">
        <p className={`text-sm tracking-widest opacity-60 ${theme === 'dark' ? 'text-white' : 'text-[#000B58]'}`}>
          HOVER TO PAUSE • CLICK TO VIEW
        </p>
      </div>

      {/* Click-to-View Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedProject(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/80 backdrop-blur-md"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className={`relative w-full max-w-3xl overflow-hidden rounded-3xl border shadow-2xl ${
                theme === 'dark' 
                  ? 'bg-[#0f0f15] border-white/10 text-white' 
                  : 'bg-white border-black/10 text-[#000B58]'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-black/50 text-white hover:bg-[#FFD93D] hover:text-black transition-all flex items-center justify-center text-lg font-bold"
                aria-label="Close modal"
              >
                ✕
              </button>

              {/* Modal Image */}
              <div className="relative w-full h-64 md:h-80 overflow-hidden bg-black/20">
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-4 left-6 px-4 py-1.5 text-xs font-bold tracking-widest text-black bg-[#FFD93D] rounded-full uppercase">
                  {selectedProject.category}
                </span>
              </div>

              {/* Modal Details */}
              <div className="p-6 md:p-8 space-y-4">
                <h3 className="text-3xl md:text-4xl font-bold">
                  {selectedProject.name}
                </h3>
                <p className="text-base md:text-lg opacity-80 leading-relaxed">
                  {selectedProject.description}
                </p>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  {selectedProject.link && selectedProject.link !== '#' ? (
                    <GsapButton
                      variant="primary"
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      VISIT LIVE SITE ↗
                    </GsapButton>
                  ) : (
                    <span className="px-6 py-3 rounded-full bg-gray-500/20 text-gray-400 font-bold text-xs tracking-wider uppercase">
                      PREVIEW ONLY
                    </span>
                  )}
                  <GsapButton
                    variant="secondary"
                    onClick={() => setSelectedProject(null)}
                  >
                    CLOSE PREVIEW
                  </GsapButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

interface ProjectCardProps {
  project: Project;
  theme: string;
  onSelect: () => void;
}

const ProjectCard = ({ project, theme, onSelect }: ProjectCardProps) => {
  return (
    <div 
      onClick={onSelect}
      className="relative h-[500px] w-[350px] md:w-[450px] shrink-0 overflow-hidden rounded-[2.5rem] glass-panel transition-all duration-500 cursor-pointer block border border-white/10 shadow-2xl group/card"
    >
      {/* Background Image */}
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
      
      {/* Dark Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 opacity-60 group-hover/card:opacity-80 transition-opacity duration-300" />

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

          <div className="inline-flex items-center gap-3 text-[#FFD93D] font-bold tracking-wider text-sm md:text-base group-hover/card:gap-5 transition-all">
            CLICK TO VIEW 
            <span className="text-xl">→</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsShowcase;
