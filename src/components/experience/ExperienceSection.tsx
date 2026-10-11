import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GraduationCap, Briefcase, Award, Calendar, MapPin, ExternalLink, BookOpen } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { portfolioData } from '../../data/portfolioData';

export const ExperienceSection: React.FC = () => {
  const { education, experience, certifications } = portfolioData;

  // Build active tabs list dynamically based on non-empty data arrays
  const availableTabs = [
    { id: 'education', label: 'Education', icon: GraduationCap, count: education.length, show: education.length > 0 },
    { id: 'experience', label: 'Experience', icon: Briefcase, count: experience.length, show: experience.length > 0 },
    { id: 'certifications', label: 'Certifications', icon: Award, count: certifications.length, show: certifications.length > 0 },
  ].filter((t) => t.show);

  const [activeTab, setActiveTab] = useState<string>(availableTabs[0]?.id || 'education');

  if (availableTabs.length === 0) {
    return null; // Gracefully hide whole section if everything is empty
  }

  return (
    <section id="experience" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <SectionHeading
            number="04 //"
            badge="Trajectory & Milestones"
            title="Experience & Academics"
            subtitle="Academic foundation in Information Technology Engineering, specialized certifications, and development milestones."
          />

          {/* Subcategory Switcher Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 p-1.5 rounded-2xl bg-white/[0.03] border border-white/[0.08] backdrop-blur-md self-start md:self-auto mb-8 md:mb-16">
            {availableTabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue ${
                    isSelected
                      ? 'text-white font-bold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isSelected && (
                    <motion.div
                      layoutId="expTabHighlight"
                      className="absolute inset-0 bg-white/10 rounded-xl border border-white/15"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                  <Icon className="w-3.5 h-3.5 relative z-10 text-electric-blue" />
                  <span className="relative z-10">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Panels */}
        <div className="relative">
          <AnimatePresence mode="wait">
            {/* 1. Education Tab */}
            {activeTab === 'education' && (
              <motion.div
                key="education"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {education.map((item) => (
                  <div
                    key={item.id}
                    className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-white/[0.08] hover:border-electric-blue/30 transition-all duration-300 group"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div>
                        {item.level && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-electric-blue/10 text-electric-blue border border-electric-blue/20 inline-block mb-2">
                            {item.level}
                          </span>
                        )}
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-electric-blue transition-colors font-display">
                          {item.degree}
                        </h3>
                        <p className="text-sm sm:text-base font-medium text-slate-300 mt-1">
                          {item.institution}
                        </p>
                      </div>

                      <div className="flex flex-col md:items-end gap-1 text-xs font-mono text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-electric-blue" />
                          <span>{item.period}</span>
                        </div>
                        {item.location && (
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Coursework */}
                    {item.coursework && item.coursework.length > 0 && (
                      <div className="mt-6 pt-6 border-t border-white/[0.06]">
                        <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-3 flex items-center gap-1.5">
                          <BookOpen className="w-3.5 h-3.5 text-electric-violet" />
                          Relevant Coursework:
                        </span>
                        <div className="flex flex-wrap gap-2">
                          {item.coursework.map((course, cIdx) => (
                            <span
                              key={cIdx}
                              className="px-2.5 py-1 rounded-lg text-xs font-mono bg-white/[0.02] text-slate-300 border border-white/[0.06]"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Highlights */}
                    {item.highlights && item.highlights.length > 0 && (
                      <ul className="mt-4 space-y-1.5 text-xs sm:text-sm text-slate-400">
                        {item.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2">
                            <span className="text-electric-blue mt-1">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {/* 2. Experience / Internships Tab */}
            {activeTab === 'experience' && (
              <motion.div
                key="experience"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-6"
              >
                {experience.map((item) => (
                  <div
                    key={item.id}
                    className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden border border-white/[0.08] hover:border-electric-blue/30 transition-all duration-300 group"
                  >
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-electric-violet/10 text-electric-violet border border-electric-violet/20 inline-block mb-2">
                          Internship
                        </span>
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-electric-blue transition-colors font-display">
                          {item.role}
                        </h3>
                        <p className="text-sm sm:text-base font-medium text-slate-300 mt-1">
                          {item.company}
                        </p>
                      </div>

                      <div className="flex flex-col md:items-end gap-1 text-xs font-mono text-slate-400">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-electric-blue" />
                          <span>{item.period}</span>
                        </div>
                        {item.location && (
                          <div className="flex items-center gap-1.5 text-slate-500">
                            <MapPin className="w-3.5 h-3.5" />
                            <span>{item.location}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <ul className="mt-4 space-y-2 text-sm text-slate-300">
                      {item.description.map((desc, dIdx) => (
                        <li key={dIdx} className="flex items-start gap-2.5">
                          <span className="text-electric-blue mt-1">•</span>
                          <span className="leading-relaxed">{desc}</span>
                        </li>
                      ))}
                    </ul>

                    {item.technologies && item.technologies.length > 0 && (
                      <div className="mt-6 pt-4 border-t border-white/[0.06] flex flex-wrap gap-1.5">
                        {item.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-0.5 rounded-md text-xs font-mono bg-white/[0.03] text-slate-400 border border-white/[0.06]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

            {/* 3. Certifications Tab */}
            {activeTab === 'certifications' && (
              <motion.div
                key="certifications"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {certifications.map((cert) => (
                  <div
                    key={cert.id}
                    className="glass-card rounded-2xl p-6 relative overflow-hidden border border-white/[0.08] hover:border-electric-blue/30 transition-all duration-300 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <div className="p-2 rounded-xl bg-white/[0.04] border border-white/10 text-electric-blue group-hover:shadow-glow-blue transition-all">
                          <Award className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-mono text-slate-500">{cert.date}</span>
                      </div>
                      <h4 className="text-base font-bold text-white group-hover:text-electric-blue transition-colors font-display mb-1">
                        {cert.title}
                      </h4>
                      <p className="text-xs text-slate-400">{cert.issuer}</p>
                    </div>

                    {cert.credentialUrl && cert.credentialUrl !== '#' && (
                      <a
                        href={cert.credentialUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-6 pt-4 border-t border-white/[0.06] inline-flex items-center gap-1.5 text-xs font-mono text-electric-blue hover:underline"
                      >
                        <span>View Credential</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                ))}
              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
