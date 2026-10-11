import React from 'react';
import { motion } from 'framer-motion';
import { FolderGit2, Mail, FileText, ArrowUpRight } from 'lucide-react';
import { HeroVisual3D } from './HeroVisual3D';
import { MagneticButton } from '../ui/MagneticButton';
import { portfolioData } from '../../data/portfolioData';

export const HeroSection: React.FC = () => {
  const { personal } = portfolioData;

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const specialtyLabels = [
    'Data Science',
    'Data Analytics',
    'Python & SQL',
  ];

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-16 sm:pt-20 lg:pt-20 pb-12 flex flex-col justify-center overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        {/* Asymmetrical 2-Zone Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Zone: Typography, Identity, Badges, CTAs (lg:col-span-6) */}
          <div className="lg:col-span-6 flex flex-col items-start text-left z-20">
            {/* Status Pill Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] backdrop-blur-md mb-4 shadow-sm"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-electric-blue opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-electric-blue" />
              </span>
              <span className="text-xs font-mono text-slate-300 tracking-wider uppercase">
                Information Technology Engineering
              </span>
            </motion.div>

            {/* Asymmetrical High-Impact Name: ATHARVA GUJARATHI */}
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="my-2"
            >
              <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-7xl xl:text-8xl font-black tracking-tight font-display text-white uppercase leading-[1.02] select-none">
                <span className="tracking-wide block">ATHARVA</span>
                <span className="text-gradient-cyan-violet tracking-wide block">GUJARATHI</span>
              </h1>
            </motion.div>

            {/* Introduction / Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
              className="mt-6 text-base sm:text-lg md:text-xl text-slate-300 font-normal leading-relaxed max-w-xl"
            >
              {personal.tagline}
            </motion.p>

            {/* 3 Exact Specialty Labels */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-6 flex flex-wrap items-center gap-2 text-xs font-mono"
            >
              {specialtyLabels.map((label, idx) => (
                <span
                  key={idx}
                  className={`px-3 py-1.5 rounded-xl border backdrop-blur-sm transition-all duration-300 ${
                    idx === 0
                      ? 'bg-electric-blue/10 border-electric-blue/30 text-electric-blue shadow-glow-blue/20'
                      : idx === 1
                      ? 'bg-electric-violet/10 border-electric-violet/30 text-electric-violet'
                      : 'bg-white/5 border-white/10 text-slate-200'
                  }`}
                >
                  {label}
                </span>
              ))}
            </motion.div>

            {/* Call To Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-8 flex flex-wrap items-center gap-3.5"
            >
              <MagneticButton
                variant="primary"
                onClick={() => scrollToSection('projects')}
                className="shadow-glow-blue px-6 py-3.5 text-xs sm:text-sm"
              >
                <FolderGit2 className="w-4 h-4 text-black" />
                <span>Explore Projects</span>
              </MagneticButton>

              <MagneticButton
                variant="secondary"
                onClick={() => scrollToSection('contact')}
                className="px-6 py-3.5 text-xs sm:text-sm"
              >
                <Mail className="w-4 h-4 text-electric-blue" />
                <span>Contact Me</span>
              </MagneticButton>

              <a
                href={personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Atharva_Gujarathi_Resume.pdf"
                className="inline-flex items-center gap-2 px-4 py-3.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-electric-blue/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
              >
                <FileText className="w-4 h-4 text-electric-blue" />
                <span>Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
              </a>
            </motion.div>
          </div>

          {/* Right Zone: Dominant 3D Neural Computational Core (lg:col-span-6) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.0, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 relative flex items-center justify-center w-full min-h-[460px] sm:min-h-[560px] lg:min-h-[660px]"
          >
            {/* Visual telemetry boundary accents */}
            <div className="absolute top-4 right-4 hidden xl:flex flex-col items-end gap-1 text-[10px] font-mono text-slate-500 pointer-events-none select-none">
              <span className="text-cyan-400 font-bold">// TENSOR FLOW ENGINE</span>
              <span>DIM: 512 ⇄ 2048</span>
              <span>LATENT MANIFOLD</span>
            </div>
            <div className="absolute bottom-4 left-4 hidden xl:flex flex-col items-start gap-1 text-[10px] font-mono text-slate-500 pointer-events-none select-none">
              <span className="text-violet-400 font-bold">// ARCH: RESIDUAL-ATTN</span>
              <span>SYNAPSES: CONNECTED</span>
            </div>

            <HeroVisual3D className="w-full h-[460px] sm:h-[560px] lg:h-[660px]" />
          </motion.div>
        </div>

        {/* Primary Languages & Metrics Strip Across Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="w-full mt-12 pt-8 border-t border-white/[0.06] grid grid-cols-2 sm:grid-cols-4 gap-4 text-center lg:text-left"
        >
          {personal.stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center lg:items-start">
              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                {stat.label}
              </span>
              <span className="text-sm sm:text-base font-semibold text-slate-100 mt-1">
                {stat.value}
              </span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Animated Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-8 hidden md:flex flex-col items-center gap-2 cursor-pointer z-10"
        onClick={() => scrollToSection('about')}
      >
        <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
          SCROLL TO EXPLORE
        </span>
        <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="w-1.5 h-1.5 rounded-full bg-electric-blue"
          />
        </div>
      </motion.div>
    </section>
  );
};
