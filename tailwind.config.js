/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#05070f',
          elevated: '#0a0e1c',
          card: '#0f1426',
        },
        electric: {
          blue: '#00F0FF',
          sky: '#38bdf8',
          violet: '#8b5cf6',
          purple: '#a855f7',
          fuchsia: '#d946ef',
          indigo: '#6366f1'
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 35px -5px rgba(0, 240, 255, 0.3)',
        'glow-violet': '0 0 35px -5px rgba(139, 92, 246, 0.3)',
        'glow-combo': '0 0 50px -10px rgba(0, 240, 255, 0.25), 0 0 50px -10px rgba(139, 92, 246, 0.25)',
        'card-glass': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-glow': 'radial-gradient(circle at 50% 30%, rgba(0, 240, 255, 0.15), rgba(139, 92, 246, 0.1) 40%, transparent 70%)',
      },
      animation: {
        'pulse-slow': 'pulse 6s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float-slow': 'float 8s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
