import { ArrowUp, Github, Linkedin } from 'lucide-react';
import { portfolioData } from '../../data/portfolioData';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const { personal } = portfolioData;

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative border-t border-white/[0.06] bg-[#03050c]/60 backdrop-blur-sm py-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Left Side: Brand and Copyright */}
        <div className="flex flex-col items-center md:items-start gap-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-sm font-bold text-white tracking-wider">
              ATHARVA GUJARATHI
            </span>
            <span className="text-xs font-mono text-electric-blue">// PORTFOLIO</span>
          </div>
          <p className="text-xs text-slate-500 font-mono">
            © {currentYear} Atharva Gujarathi. All rights reserved.
          </p>
        </div>

        {/* Center: Tech Stack Tag */}
        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
          <span>Designed &amp; built with passion by Atharva Gujarathi.</span>
        </div>

        {/* Right Side: Social Icons & Back to Top */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <a
              href={personal.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href={personal.socials.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg bg-white/[0.03] hover:bg-white/[0.08] hover:text-electric-blue transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <button
            type="button"
            onClick={scrollToTop}
            className="p-2.5 rounded-xl bg-white/[0.04] hover:bg-white/[0.09] border border-white/10 hover:border-electric-blue/40 text-slate-300 hover:text-white transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue"
            aria-label="Scroll back to top"
          >
            <ArrowUp className="w-4 h-4 text-electric-blue" />
          </button>
        </div>
      </div>
    </footer>
  );
};
