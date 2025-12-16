'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { useTheme } from '@/contexts/ThemeContext';

const AboutSection = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.9, 1], [0, 1, 1, 0]);

  // Skills data
  const skills = [
    { name: 'JavaScript', proficiency: 95 },
    { name: 'React.js', proficiency: 90 },
    { name: 'Next.js', proficiency: 80 },
    { name: 'Node.js', proficiency: 85 },
    { name: 'MongoDB', proficiency: 80 },
    { name: 'UI/UX Design', proficiency: 80 },
    { name: 'CSS/Tailwind', proficiency: 85 },
  ];

  const experiences = [
    {
      period: 'July 2025 - Present',
      role: 'Mentor',
      company: 'Yarl IT Hub',
      description: 'Mentoring aspiring students, lecturing on full stack programming, organizing workshops.'
    },
    {
      period: 'Jan 2025 - July 2025',
      role: 'SDE',
      company: 'Cred4Future',
      description: 'Designed and developed custom websites and web applications using MERN stack.'
    },
  ];

  return (
    <section 
      id="ABOUT ME"
      ref={containerRef}
      className="relative py-24 md:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className={`absolute top-0 right-0 w-[600px] h-[600px] rounded-full blur-[100px] opacity-20 ${theme === 'dark' ? 'bg-blue-900' : 'bg-yellow-200'}`} />
        <div className={`absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 ${theme === 'dark' ? 'bg-purple-900' : 'bg-yellow-300'}`} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="text-sm font-bold tracking-[0.3em] text-[#FFD93D] mb-4">WHO I AM</h2>
          <h3 className={`text-4xl md:text-5xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#000B58]'}`}>
            About <span className="text-[#FFD93D]">Me</span>
          </h3>
          <div className="w-20 h-1 bg-[#FFD93D] mx-auto mt-6" />
        </motion.div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          
          {/* Left Column: Image & Bio */}
          <div className="space-y-12">
            <motion.div 
              style={{ y }}
              className="relative aspect-square w-full max-w-sm mx-auto lg:mx-0"
            >
               <div className="absolute inset-0 rounded-full border border-dashed border-[#FFD93D]/40 animate-spin-slow" />
               <div className="absolute -inset-4 rounded-full border border-dotted border-[#FFD93D]/20 animate-spin-slow-reverse" />
              
               <div className="relative w-full h-full rounded-full overflow-hidden glass-panel border-2 border-[#FFD93D]/30">
                 <Image
                    src="/img5.png" 
                    alt="About"
                    fill
                    className="object-cover opacity-90 transition-transform duration-500 hover:scale-110"
                  />
               </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className={`p-8 rounded-2xl ${theme === 'dark' ? 'bg-white/5' : 'bg-[#000B58]/5'} backdrop-blur-sm border border-white/10`}
            >
              <p className={`text-lg leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-[#000B58]'}`}>
                I&apos;m <span className="text-[#FFD93D] font-bold">Alexander Abraham</span>, a passionate Full-Stack Developer with a foundation in Electronics. 
                My journey spans from mentoring students at Yarl IT Hub to building robust applications at Cred4Future.
                I believe in code that not only functions flawlessly but feels alive through smooth interactions and solid design principles.
              </p>
            </motion.div>
          </div>

          {/* Right Column: Skills & Experience */}
          <div className="space-y-16">
            
            {/* Skills */}
            <div>
              <h4 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-[#000B58]'}`}>Technical Skills</h4>
              <div className="space-y-6">
                {skills.map((skill, index) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <span className={theme === 'dark' ? 'text-gray-300' : 'text-[#000B58]'}>{skill.name}</span>
                      <span className="text-[#FFD93D] font-mono">{skill.proficiency}%</span>
                    </div>
                    <div className={`h-2 rounded-full overflow-hidden ${theme === 'dark' ? 'bg-white/10' : 'bg-black/10'}`}>
                      <motion.div 
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.proficiency}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: "circOut" }}
                        className="h-full bg-[#FFD93D]"
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Experience */}
            <div>
              <h4 className={`text-2xl font-bold mb-8 ${theme === 'dark' ? 'text-white' : 'text-[#000B58]'}`}>Experience</h4>
              <div className="relative border-l-2 border-[#FFD93D]/30 pl-8 space-y-12">
                {experiences.map((exp, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.2 }}
                    className="relative"
                  >
                    <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full bg-[#FFD93D] ring-4 ring-black" />
                    <span className="text-[#FFD93D] text-sm tracking-wider font-mono mb-2 block">{exp.period}</span>
                    <h5 className={`text-xl font-bold ${theme === 'dark' ? 'text-white' : 'text-[#000B58]'}`}>{exp.role}</h5>
                    <p className={`text-sm ${theme === 'dark' ? 'text-gray-400' : 'text-gray-600'} mb-3`}>{exp.company}</p>
                    <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-gray-700'}`}>
                      {exp.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
