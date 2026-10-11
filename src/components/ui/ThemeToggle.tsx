import React, { useCallback, useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type Theme = 'dark' | 'light';

const readTheme = (): Theme =>
  document.documentElement.classList.contains('light') ? 'light' : 'dark';

export const applyTheme = (theme: Theme) => {
  const root = document.documentElement;
  root.classList.toggle('light', theme === 'light');
  root.classList.toggle('dark', theme === 'dark');
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', theme === 'light' ? '#f7f8fc' : '#030614');
};

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [theme, setTheme] = useState<Theme>(readTheme);

  // Keep state in sync if another tab changes the saved theme
  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'theme') {
        const t: Theme = e.newValue === 'light' ? 'light' : 'dark';
        applyTheme(t);
        setTheme(t);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const toggle = useCallback(() => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    const root = document.documentElement;
    if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      root.classList.add('theme-transition');
      window.setTimeout(() => root.classList.remove('theme-transition'), 450);
    }
    applyTheme(next);
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage unavailable: theme still applies for this session */
    }
    setTheme(next);
  }, [theme]);

  const isLight = theme === 'light';
  const label = isLight ? 'Switch to dark mode' : 'Switch to light mode';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      aria-pressed={isLight}
      className={`relative inline-flex items-center justify-center w-9 h-9 rounded-xl bg-white/[0.04] border border-white/10 hover:border-electric-blue/50 text-slate-300 hover:text-electric-blue transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-electric-blue ${className}`}
    >
      {isLight ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
    </button>
  );
};
