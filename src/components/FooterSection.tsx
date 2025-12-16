'use client';

import { motion } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';

const FooterSection = () => {
  const { theme } = useTheme();

  const socialLinks = [
    { name: 'GitHub', url: 'https://github.com/Alexander9944' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/in/alexander-abraham-5814251b7/' },
    { name: 'Instagram', url: 'https://www.instagram.com/alexander.1388/' },
  ];

  return (
    <footer 
      id="CONTACT"
      className="relative pt-32 pb-12 overflow-hidden"
      style={{
        background: theme === 'dark' ? '#050505' : '#FFF8D4',
        color: theme === 'dark' ? '#ededed' : '#000B58'
      }}
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-[#FFD93D] to-transparent opacity-50" />
        <div className={`absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full blur-[120px] opacity-10 ${theme === 'dark' ? 'bg-[#FFD93D]' : 'bg-blue-500'}`} />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-24">
          
          {/* Left: Call to Action */}
          <div className="space-y-8">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-7xl font-bold leading-tight"
            >
              Let&apos;s make something <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD93D] to-amber-600">
                amazing together.
              </span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <a 
                href="mailto:Anderalex789@gmail.com"
                className="inline-flex items-center gap-4 text-xl md:text-2xl hover:text-[#FFD93D] transition-colors group"
              >
                <div className="w-12 h-12 rounded-full border border-current flex items-center justify-center group-hover:bg-[#FFD93D] group-hover:border-[#FFD93D] group-hover:text-black transition-all">
                  ✉
                </div>
                Anderalex789@gmail.com
              </a>
            </motion.div>
          </div>

          {/* Right: Links & Form Placeholder */}
          <div className="flex flex-col justify-between gap-12">
            <div className="flex flex-wrap gap-4">
              {socialLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                  transition={{ delay: i * 0.1 }}
                  className={`px-8 py-4 rounded-full border ${theme === 'dark' ? 'border-white/20 bg-white/5' : 'border-black/10 bg-black/5'} hover:border-[#FFD93D] hover:text-[#FFD93D] transition-all backdrop-blur-md`}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>

            <div className="space-y-2">
              <p className="opacity-60 text-sm tracking-wider uppercase">Location</p>
              <p className="text-xl">Jaffna, Sri Lanka</p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 opacity-60 text-sm">
          <p>© {new Date().getFullYear()} Alexander Abraham. All rights reserved.</p>
          <div className="flex gap-8">
             <span>Design by Alexander</span>
             <span>Code by Alexander</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
