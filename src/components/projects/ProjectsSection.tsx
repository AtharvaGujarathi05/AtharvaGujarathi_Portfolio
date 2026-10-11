import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SectionHeading } from '../ui/SectionHeading';
import { ProjectCard } from './ProjectCard';
import { portfolioData } from '../../data/portfolioData';

export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'AI & Data Science', label: 'AI & Data Science' },
    { id: 'Web Applications', label: 'Web Applications' },
  ];

  const filteredProjects =
    activeCategory === 'all'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <SectionHeading
            number="02 //"
            badge="Selected Works"
            title="Featured Engineering"
            subtitle="Deep learning interpretability platforms, empathetic AI wellness systems, and practical data-driven applications."
          />

          {/* Filter Categories */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md self-start md:self-auto mb-8 md:mb-16">
            {categories.map((cat) => {
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`relative px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue ${
                    isSelected
                      ? 'text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="projectFilterActive"
                      className="absolute inset-0 bg-white/10 rounded-xl border border-white/15"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Project Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="h-full"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};
