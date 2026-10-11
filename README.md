# Atharva Gujarathi — Personal Portfolio Website

A production-ready, dark-themed personal portfolio engineered for **Atharva Gujarathi**, Information Technology Engineering student specializing in AI, Data Science, and modern software development.

---

## 🚀 Key Highlights & Tech Stack

- **Framework**: React 18 + Vite 5 + TypeScript (strict mode)
- **Styling**: Tailwind CSS (near-black background `#05070f`, electric-blue `#00F0FF`, and violet `#8b5cf6` accents)
- **Scroll & UI Motion**: GSAP + ScrollTrigger, Framer Motion (Motion for React)
- **3D Interactive Visual**: Three.js WebGL interactive neural core with orbit rings and mouse tracking
- **Icons**: Lucide React
- **Performance**: Automated code splitting with Rollup manualChunks (`three`, `motion`, `gsap`, `vendor`)

---

## 📂 Project Architecture

```
frontend/
├── public/
│   ├── favicon.svg             # Custom SVG brand favicon
│   ├── preview-banner.svg      # Open Graph / Twitter social banner
│   └── resume.pdf              # Placeholder resume document
├── src/
│   ├── data/
│   │   └── portfolioData.ts    # ⭐ Centralized configuration for all personal data & links
│   ├── types/
│   │   └── portfolio.ts        # TypeScript data schemas
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx      # Fixed glassmorphic navigation + mobile drawer
│   │   │   ├── Footer.tsx      # Dynamic year copyright, socials, back-to-top
│   │   │   ├── CustomCursor.tsx# Trailing cursor (desktop pointer:fine only)
│   │   │   └── BackgroundCanvas.tsx # Floating background particles
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx # Headline, staggered reveal, CTAs, metrics
│   │   │   └── HeroVisual3D.tsx# Three.js 3D interactive visual
│   │   ├── about/
│   │   │   └── AboutSection.tsx# Bento grid with bio, philosophy, pillars
│   │   ├── projects/
│   │   │   ├── ProjectsSection.tsx # Category filter tabs & grid
│   │   │   ├── ProjectCard.tsx     # 3D tilt card with capabilities
│   │   │   └── ProjectVisuals.tsx  # Custom CSS/SVG preview headers
│   │   ├── skills/
│   │   │   └── SkillsSection.tsx   # 4 skill categories with editable tags
│   │   ├── experience/
│   │   │   └── ExperienceSection.tsx # Education, internships, certs, achievements
│   │   ├── contact/
│   │   │   └── ContactSection.tsx  # Mailto, clipboard copy, inquiry form
│   │   └── ui/
│   │       ├── MagneticButton.tsx  # Spring-physics magnetic buttons
│   │       ├── TiltCard.tsx        # 3D perspective hover tilt
│   │       └── SectionHeading.tsx  # Futuristic section headings
│   ├── App.tsx                 # Root layout & section observer
│   ├── main.tsx                # Application entrypoint
│   └── index.css               # Design system & glassmorphism utilities
├── index.html                  # SEO, fonts, social tags
├── tailwind.config.js          # Palette tokens & theme extensions
└── vite.config.ts              # Bundler configuration & chunk splitting
```

---

## ⚡ Quick Start Commands

Run all commands from within the `frontend/` directory:

```bash
# 1. Navigate to frontend
cd frontend

# 2. Start the local development server
npm run dev

# 3. Create a production build (runs TypeScript check + Vite build)
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## 🛠️ Personalization & Placeholders to Update

All personal information is centralized in [`src/data/portfolioData.ts`](file:///c:/Users/mayur/OneDrive/Desktop/Engineering/Projects/frontend/src/data/portfolioData.ts):

1. **Email**: Update `personal.email` to your active email address.
2. **Socials**: Update `personal.socials.github`, `personal.socials.linkedin`, and `personal.socials.twitter`.
3. **Resume**: Replace `public/resume.pdf` with your actual PDF resume.
4. **Project Links**: Add your live demo links or repository URLs inside `projects[].githubUrl` and `projects[].liveUrl`.
5. **Education & College**: Update `institution` or grades under `education[]`.
6. **Internships & Experience**: Fill out `experience[]` with your company and responsibilities (or leave empty to hide automatically).
7. **Certifications & Achievements**: Update credentials in `certifications[]` and `achievements[]`.
