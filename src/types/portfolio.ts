export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: 'AI & Data Science' | 'Web Applications' | 'Research';
  tags: string[];
  status: string;
  featured: boolean;
  highlights: string[];
  previewType: 'neural' | 'calm' | 'roommate';
}

export interface SkillCategory {
  title: string;
  shortTitle?: string;
  id: string;
  description: string;
  skills: {
    name: string;
    level?: string;
    icon?: string;
    badge?: string;
  }[];
}

export interface EducationItem {
  id: string;
  level?: string;
  degree: string;
  institution: string;
  location?: string;
  period: string;
  score?: string;
  coursework?: string[];
  highlights?: string[];
}

export interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  location?: string;
  period: string;
  description: string[];
  technologies?: string[];
}

export interface CertificationItem {
  id: string;
  title: string;
  issuer: string;
  date?: string;
  credentialUrl?: string;
}

export interface PortfolioData {
  personal: {
    name: string;
    role: string;
    tagline: string;
    subRole: string;
    bioParagraphs: string[];
    email: string;
    location: string;
    resumeUrl: string;
    socials: {
      github: string;
      linkedin: string;
    };
    stats: {
      label: string;
      value: string;
    }[];
  };
  projects: Project[];
  skillCategories: SkillCategory[];
  education: EducationItem[];
  experience: ExperienceItem[];
  certifications: CertificationItem[];
}
