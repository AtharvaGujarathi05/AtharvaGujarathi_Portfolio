import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Github, Linkedin, FileText, ArrowUpRight } from 'lucide-react';
import { ThemeToggle } from '../ui/ThemeToggle';
import { portfolioData } from '../../data/portfolioData';

interface NavbarProps {
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Skills', href: '#skills' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.querySelector(href);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'glass-nav py-3.5 shadow-lg shadow-black/40'
            : 'bg-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Left Zone: Brand Logo / Monogram + Social Links (GitHub, LinkedIn) */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="group flex items-center gap-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue rounded-lg py-1 px-1.5"
              aria-label="Home - Atharva Gujarathi"
            >
              <div className="relative flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-electric-blue/50 transition-colors duration-300 overflow-hidden shadow-inner">
                <span className="font-mono text-sm font-bold bg-gradient-to-r from-electric-blue to-electric-violet bg-clip-text text-transparent">
                  AG
                </span>
                <span className="absolute bottom-1 right-1 w-1 h-1 rounded-full bg-electric-blue animate-pulse" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight text-white group-hover:text-electric-blue transition-colors">
                  Atharva Gujarathi
                </span>
                <span className="text-[10px] font-mono text-slate-400 tracking-wider hidden sm:block">
                  AI • DATA • SYSTEMS
                </span>
              </div>
            </a>

            {/* Subtle Divider */}
            <div className="h-5 w-px bg-white/10 mx-0.5 sm:mx-1" aria-hidden="true" />

            {/* GitHub and LinkedIn Links in Top Navigation */}
            <div className="flex items-center gap-1.5">
              <a
                href={portfolioData.personal.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] hover:border-electric-blue/50 text-slate-300 hover:text-white transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
                aria-label="Atharva Gujarathi GitHub Profile (opens in a new tab)"
              >
                <Github className="w-4 h-4 transition-transform duration-200 group-hover:scale-110 group-hover:text-electric-blue" />
              </a>
              <a
                href={portfolioData.personal.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative p-2 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/[0.08] hover:border-electric-violet/50 text-slate-300 hover:text-white transition-all duration-200 shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-violet"
                aria-label="Atharva Gujarathi LinkedIn Profile (opens in a new tab)"
              >
                <Linkedin className="w-4 h-4 transition-transform duration-200 group-hover:scale-110 group-hover:text-electric-violet" />
              </a>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 bg-white/[0.03] border border-white/[0.07] px-4 py-1.5 rounded-full backdrop-blur-xl">
            {navItems.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`relative px-4 py-1.5 rounded-full text-xs font-medium tracking-wide transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navPill"
                      className="absolute inset-0 rounded-full bg-white/[0.08] border border-white/10 shadow-sm"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </a>
              );
            })}
          </nav>

          {/* Desktop Right CTA: Resume + Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href={portfolioData.personal.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              download="Atharva_Gujarathi_Resume.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold tracking-wide bg-white/[0.04] hover:bg-white/[0.08] text-white border border-white/10 hover:border-electric-blue/40 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
            >
              <FileText className="w-4 h-4 text-electric-blue" />
              <span>Resume</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
            </a>
            <ThemeToggle />
          </div>

          {/* Mobile Actions: Theme Toggle + Menu Hamburger */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-300 hover:text-white bg-white/5 border border-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[70px] z-40 px-4 pb-6 pt-2 bg-[#05070f]/95 border-b border-white/10 backdrop-blur-2xl md:hidden shadow-2xl"
          >
            <div className="flex flex-col gap-2">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item.href)}
                    className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive
                        ? 'bg-electric-blue/10 text-electric-blue border border-electric-blue/20'
                        : 'text-slate-300 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <span>{item.label}</span>
                    <span className="text-xs font-mono text-slate-500">→</span>
                  </a>
                );
              })}
              <a
                href={portfolioData.personal.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                download="Atharva_Gujarathi_Resume.pdf"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium text-slate-300 hover:bg-white/5 hover:text-white transition-all"
              >
                <span className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-electric-blue" />
                  Resume
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-slate-500" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
