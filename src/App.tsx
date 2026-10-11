import React, { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Navbar } from './components/layout/Navbar';
import { HeroSection } from './components/hero/HeroSection';
import { AboutSection } from './components/about/AboutSection';
import { ProjectsSection } from './components/projects/ProjectsSection';
import { SkillsSection } from './components/skills/SkillsSection';
import { ExperienceSection } from './components/experience/ExperienceSection';
import { ContactSection } from './components/contact/ContactSection';
import { Footer } from './components/layout/Footer';
import { CustomCursor } from './components/layout/CustomCursor';
import { BackgroundCanvas } from './components/layout/BackgroundCanvas';

gsap.registerPlugin(ScrollTrigger);

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('hero');

  useEffect(() => {
    // Intersection Observer for active section tracking
    const sections = document.querySelectorAll('section[id]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Subtle GSAP scroll parallax triggers for sections
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion) {
      sections.forEach((sec) => {
        gsap.fromTo(
          sec,
          { opacity: 0.92 },
          {
            opacity: 1,
            ease: 'none',
            scrollTrigger: {
              trigger: sec,
              start: 'top 85%',
              end: 'top 30%',
              scrub: 0.5,
            },
          }
        );
      });
    }

    return () => {
      observer.disconnect();
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#020308] text-slate-100 selection:bg-electric-blue/20 selection:text-electric-blue">
      {/* Custom Desktop Trailing Cursor */}
      <CustomCursor />

      {/* Interactive Background Particles & Mesh */}
      <BackgroundCanvas />

      {/* Fixed Sticky Glass Navbar */}
      <Navbar activeSection={activeSection} />

      {/* Main Content Sections */}
      <main className="relative z-10 flex flex-col">
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default App;
