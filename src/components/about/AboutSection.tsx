import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Cpu, Database, Compass, Terminal, ShieldCheck, Sparkles } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { portfolioData } from '../../data/portfolioData';

export const AboutSection: React.FC = () => {
  const { personal } = portfolioData;

  const pillars = [
    {
      icon: Brain,
      title: 'Multimodal AI & Interpretability',
      description:
        'Auditing how neural networks represent semantics across image and language modalities, exploring internal representations through CLIP and sparse autoencoders.',
      accent: 'from-electric-blue to-cyan-500',
      badge: 'Research & AI',
    },
    {
      icon: Terminal,
      title: 'Software Engineering & Systems',
      description:
        'Building reliable, well-structured software grounded in Python, SQL, C++, data structures, algorithms, and core CS fundamentals.',
      accent: 'from-electric-violet to-purple-500',
      badge: 'Systems',
    },
    {
      icon: Database,
      title: 'Data Science & Analytical Logic',
      description:
        'Transforming raw telemetry and multi-attribute datasets into actionable features, statistical clarity, and optimized machine learning models.',
      accent: 'from-electric-sky to-indigo-500',
      badge: 'Applied ML',
    },
  ];

  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="01 //"
          badge="Background & Philosophy"
          title="Engineered for Intelligence"
          subtitle="An Information Technology Engineering student passionate about turning data into meaningful insights."
        />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          {/* Main Story Card (Bento Large) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="md:col-span-8 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-electric-blue/30 transition-all duration-300"
          >
            {/* Ambient Background Accent */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-electric-blue/5 rounded-full blur-3xl pointer-events-none group-hover:bg-electric-blue/10 transition-colors duration-500" />

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-electric-blue">
                  <Cpu className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    Core Profile
                  </span>
                  <span className="text-sm font-semibold text-white">
                    Information Technology Engineering
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-slate-300 text-sm sm:text-base leading-relaxed">
                {personal.bioParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Bottom tags */}
            <div className="mt-8 pt-6 border-t border-white/[0.06] flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Compass className="w-4 h-4 text-electric-blue" />
                <span>B.Tech Information Technology</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                  Python
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                  TypeScript
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                  PyTorch
                </span>
                <span className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-white/[0.04] text-slate-300 border border-white/[0.06]">
                  React
                </span>
              </div>
            </div>
          </motion.div>

          {/* Philosophy Card (Bento Side) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-4 glass-card rounded-2xl p-6 sm:p-8 flex flex-col justify-between relative overflow-hidden group hover:border-electric-violet/30 transition-all duration-300"
          >
            <div className="absolute top-0 right-0 w-60 h-60 bg-electric-violet/5 rounded-full blur-3xl pointer-events-none group-hover:bg-electric-violet/10 transition-colors duration-500" />

            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-electric-violet">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">
                    Guiding Principle
                  </span>
                  <span className="text-sm font-semibold text-white">
                    Verifiable & Useful AI
                  </span>
                </div>
              </div>

              <blockquote className="text-sm sm:text-base font-normal text-slate-300 leading-relaxed italic border-l-2 border-electric-violet/40 pl-4 py-1">
                "Modern AI is immensely capable, but raw scale without interpretability is a black box. My objective is to build systems that are explainable, rigorously evaluated, and genuinely beneficial in real-world workflows."
              </blockquote>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <Sparkles className="w-4 h-4 text-electric-violet" />
                <span>Zero fluff. Data-grounded execution.</span>
              </div>
            </div>
          </motion.div>

          {/* 3 Pillar Cards (Bottom Row) */}
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <motion.div
                key={pillar.title}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: 0.1 * idx }}
                className="md:col-span-4 glass-card rounded-2xl p-6 relative overflow-hidden hover:border-white/20 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white group-hover:text-electric-blue transition-colors">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="px-2 py-0.5 rounded-md text-[10px] font-mono uppercase bg-white/[0.04] border border-white/[0.08] text-slate-400">
                    {pillar.badge}
                  </span>
                </div>

                <h3 className="text-base font-semibold text-white mb-2 group-hover:text-electric-blue transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {pillar.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
