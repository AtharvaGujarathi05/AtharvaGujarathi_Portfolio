import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, Copy, Check, ArrowUpRight } from 'lucide-react';
import { SectionHeading } from '../ui/SectionHeading';
import { portfolioData } from '../../data/portfolioData';

export const ContactSection: React.FC = () => {
  const { personal } = portfolioData;
  const [copied, setCopied] = useState(false);
  const handleCopyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const socials = [
    {
      name: 'GitHub',
      icon: Github,
      url: personal.socials.github,
      handle: '@AtharvaGujarathi05',
      color: 'hover:text-white hover:border-white/40',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: personal.socials.linkedin,
      handle: 'Atharva Gujarathi',
      color: 'hover:text-electric-blue hover:border-electric-blue/40',
    },
  ];

  return (
    <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          number="05 //"
          badge="Get In Touch"
          title="Let's Build Together"
          subtitle="Open for internships, AI research initiatives, and collaborative engineering opportunities."
        />

        <div className="max-w-2xl mx-auto">
          {/* Left Column: Direct Info & Social Cards */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            {/* Primary Email Banner Card */}
            <div className="glass-card rounded-2xl p-6 sm:p-8 relative overflow-hidden group border border-white/[0.08] hover:border-electric-blue/30 transition-all duration-300">
              <div className="absolute top-0 right-0 w-48 h-48 bg-electric-blue/10 rounded-full blur-2xl group-hover:bg-electric-blue/20 transition-all pointer-events-none" />

              <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block mb-2">
                Direct Communication
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 font-display">
                Start a Conversation
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mb-6 leading-relaxed">
                Whether you have an inquiry about my projects, an engineering internship opening, or want to discuss data analytics and data science, my inbox is always open.
              </p>

              {/* Functional mailto button & Copy action */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <a
                  href={`mailto:${personal.email}`}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold bg-gradient-to-r from-electric-blue to-electric-violet text-black shadow-glow-blue hover:opacity-95 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
                >
                  <Mail className="w-4 h-4 text-black" />
                  <span>Send Direct Email</span>
                </a>

                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-mono bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/20 text-slate-300 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-slate-400" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 pt-4 border-t border-white/[0.06] text-xs font-mono text-slate-400 flex items-center justify-between">
                <span>Location: {personal.location}</span>
                <span className="text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  Fast Response
                </span>
              </div>
            </div>

            {/* Social Channels: one aligned row */}
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${social.name} profile (opens in a new tab)`}
                    className={`glass-card rounded-xl p-3 sm:p-4 min-w-0 flex flex-col justify-between border border-white/[0.06] transition-all duration-300 group ${social.color}`}
                  >
                    <div className="flex items-center justify-between mb-3 gap-1">
                      <div className="p-2 rounded-lg bg-white/[0.03] border border-white/[0.08] text-slate-300 group-hover:text-white transition-colors">
                        <Icon className="w-4 h-4" />
                      </div>
                      <ArrowUpRight className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <span className="text-xs font-bold text-white block group-hover:text-electric-blue transition-colors">
                        {social.name}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500 truncate block">
                        {social.handle}
                      </span>
                    </div>
                  </a>
                );
              })}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
