import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Globe, BrainCircuit, Wrench, Terminal } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { portfolioData } from '../../data/portfolioData';

export const SkillsSection: React.FC = () => {
  const { skillCategories } = portfolioData;
  const [activeTab, setActiveTab] = useState<string>('all');

  const categoryIcons: Record<string, React.ElementType> = {
    programming: Code2,
    ai: BrainCircuit,
    web: Globe,
    tools: Wrench,
  };

  const displayedCategories =
    activeTab === 'all'
      ? skillCategories
      : skillCategories.filter((cat) => cat.id === activeTab);

  return (
    <section id="skills" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <SectionHeading
            number="03 //"
            badge="Technical Competencies"
            title="Skills & Technologies"
            subtitle="Core technical stack organized across algorithmic programming, deep learning, web infrastructure, and tooling."
          />

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md self-start md:self-auto mb-8 md:mb-16">
            <button
              onClick={() => setActiveTab('all')}
              className={`relative px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all ${
                activeTab === 'all'
                  ? 'text-white font-bold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              {activeTab === 'all' && (
                <motion.div
                  layoutId="skillTabHighlight"
                  className="absolute inset-0 bg-white/10 rounded-xl border border-white/15"
                  transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">All Areas</span>
            </button>

            {skillCategories.map((cat) => {
              const isSelected = activeTab === cat.id;
              const Icon = categoryIcons[cat.id] || Terminal;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-mono tracking-wider transition-all ${
                    isSelected
                      ? 'text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="skillTabHighlight"
                      className="absolute inset-0 bg-white/10 rounded-xl border border-white/15"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5 relative z-10 text-electric-blue" />
                  <span className="relative z-10">{cat.shortTitle ?? cat.title.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Skills Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedCategories.map((category, catIdx) => {
            const Icon = categoryIcons[category.id] || Terminal;
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.5, delay: catIdx * 0.1 }}
                className="glass-card rounded-2xl p-6 sm:p-8 hover:border-electric-blue/40 hover:shadow-glow-blue/20 transition-all duration-300 relative group overflow-hidden"
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-56 h-56 bg-electric-blue/5 rounded-full blur-3xl group-hover:bg-electric-blue/15 transition-all duration-700 pointer-events-none" />

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-electric-blue group-hover:shadow-glow-blue transition-all">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-white font-display">
                        {category.title}
                      </h3>
                      <p className="text-xs text-slate-400">{category.description}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white/[0.04] text-slate-400 border border-white/[0.08]">
                    {category.skills.length} modules
                  </span>
                </div>

                {/* Skills Badges List */}
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/[0.03] hover:bg-white/[0.08] border border-white/[0.07] hover:border-electric-blue/40 hover:shadow-sm transition-all duration-200 group/pill cursor-default"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-electric-blue/60 group-hover/pill:bg-electric-blue group-hover/pill:scale-125 transition-all" />
                      <span className="text-sm font-medium text-slate-200 group-hover/pill:text-white">
                        {skill.name}
                      </span>
                      {skill.badge && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-white/[0.05] text-electric-blue border border-white/[0.08] font-semibold">
                          {skill.badge}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
