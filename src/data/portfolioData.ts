import { PortfolioData } from '../types/portfolio';

/**
 * PORTFOLIO CONFIGURATION FOR ATHARVA GUJARATHI
 */
export const portfolioData: PortfolioData = {
  personal: {
    name: 'ATHARVA GUJARATHI',
    role: 'Information Technology Engineering Student',
    subRole: 'Data Science & Analytics',
    tagline: "I'm passionate about Data Science and Analytics, turning data into meaningful insights and solving real-world problems.",
    bioParagraphs: [
      'I am an Information Technology Engineering student passionate about data science and analytics, with a strong foundation in Python, SQL, and core computer science.',
      'I enjoy working with data end to end: cleaning and exploring it, finding patterns, and communicating insights through clear visualizations and dashboards.',
      'I am always looking for real-world problems where data can lead to better decisions.'
    ],
    email: 'atharva.gujarathii@gmail.com',
    location: 'Mumbai, India',
    resumeUrl: '/resume.pdf',
    socials: {
      github: 'https://github.com/AtharvaGujarathi05',
      linkedin: 'https://www.linkedin.com/in/atharva-gujarathi-a27a5328a/',
    },
    stats: [
      { label: 'Engineering Major', value: 'Information Tech' },
      { label: 'Core Focus', value: 'Data Science & Analytics' },
      { label: 'Featured Projects', value: '3 Engineered' },
      { label: 'Primary Languages', value: 'Python • SQL • C++ • Java' },
    ]
  },

  projects: [
    {
      id: 'neural-trace-auditor',
      title: 'Neural Trace Auditor',
      shortDescription: 'Multimodal interpretability platform built around CLIP, with planned extensions to vision-language models and sparse autoencoders.',
      fullDescription: 'A deep learning interpretability system engineered to visualize, audit, and analyze multimodal representations in OpenAI CLIP models. Built to inspect semantic alignment between image and text embeddings, track cross-attention vectors, and explore internal latent spaces with a planned roadmap incorporating sparse autoencoders (SAEs) for circuit discovery.',
      category: 'AI & Data Science',
      tags: ['CLIP', 'PyTorch', 'Multimodal AI', 'Model Interpretability', 'Data Science', 'Python'],
      status: 'Active Research & Dev',
      featured: true,
      highlights: [
        'Visualizes cross-modal cosine similarity matrices between vision tokens and prompt embeddings.',
        'Interactive saliency projection and latent dimension activation inspection.',
        'Architectural design ready for extension to Vision-Language Models (VLMs) and Sparse Autoencoders (SAEs).'
      ],
      previewType: 'neural',
    },
    {
      id: 'calmspace',
      title: 'CalmSpace',
      shortDescription: 'AI journaling application using emotion classification and an LLM for personalized recommendations.',
      fullDescription: 'A mindful digital journaling application that processes reflections through fine-tuned emotion classification models. Integrates contextual Large Language Model (LLM) prompting to generate empathetic, cognitive-grounding exercises, mood trajectory analytics, and personalized wellness prompts without sacrificing user privacy.',
      category: 'AI & Data Science',
      tags: ['NLP', 'Emotion AI', 'Data Analytics', 'Python', 'Tailwind CSS'],
      status: 'Functional Beta',
      featured: true,
      highlights: [
        'Real-time multi-dimensional emotion sentiment mapping from unstructured user prose.',
        'Dynamic contextual LLM guidance offering personalized self-reflection techniques.',
        'Encrypted local journal storage with visual affective state trend analytics over time.'
      ],
      previewType: 'calm',
    },
    {
      id: 'roommate-finder',
      title: 'Roommate Finder',
      shortDescription: 'A web application designed to help people find compatible roommates through structured preference matching.',
      fullDescription: 'A responsive platform designed to eliminate housing mismatch among university students and young professionals. Features an algorithmic compatibility scoring engine analyzing sleep schedules, cleanliness thresholds, study habits, budget preferences, and location proximity.',
      category: 'Web Applications',
      tags: ['Data Matching', 'TypeScript', 'Node.js', 'PostgreSQL', 'Algorithm'],
      status: 'Completed System',
      featured: true,
      highlights: [
        'Multi-attribute weighted matching algorithm calculating compatibility scores between profiles.',
        'Verified profile management with lifestyle preference toggles and budget filters.',
        'Intuitive card-based discovery feed with direct communication channels.'
      ],
      previewType: 'roommate',
    }
  ],

  skillCategories: [
    {
      id: 'programming',
      title: 'Programming Languages',
      shortTitle: 'Programming',
      description: 'Languages for data analysis, querying, and problem solving',
      skills: [
        { name: 'Python', badge: 'Primary' },
        { name: 'SQL', badge: 'Primary' },
        { name: 'C++', badge: 'Systems' },
        { name: 'Java', badge: 'OOP' }
      ]
    },
    {
      id: 'dsa',
      title: 'Data Structures & Algorithms',
      shortTitle: 'DSA',
      description: 'Foundational algorithmic problem solving and computational efficiency',
      skills: [
        { name: 'Data Structures & Algorithms', badge: 'Core' }
      ]
    },
    {
      id: 'datascience',
      title: 'Data Science & Analytics',
      shortTitle: 'Data Science',
      description: 'Data manipulation, statistical analysis, and visual intelligence',
      skills: [
        { name: 'Pandas', badge: 'Data' },
        { name: 'NumPy', badge: 'Computing' },
        { name: 'Matplotlib', badge: 'Visualization' },
        { name: 'Microsoft Excel', badge: 'Analytics' },
        { name: 'Power BI', badge: 'BI & Dashboards' }
      ]
    },
    {
      id: 'corecs',
      title: 'Core CS Subjects',
      shortTitle: 'Core CS',
      description: 'Essential computer science fundamentals and systems architecture',
      skills: [
        { name: 'Object-Oriented Programming (OOP)', badge: 'Paradigm' },
        { name: 'Database Management Systems (DBMS)', badge: 'Database' },
        { name: 'Operating Systems (OS)', badge: 'Systems' },
        { name: 'Computer Networks (CN)', badge: 'Networking' },
        { name: 'System Design', badge: 'Architecture' }
      ]
    }
  ],

  education: [
    {
      id: 'somaiya-it',
      level: 'Engineering Degree',
      degree: 'B.Tech in Information Technology',
      institution: 'K. J. Somaiya Institute of Technology',
      period: 'Expected graduation: 2027',
      highlights: [
        'Focused on Data Science and Analytics.'
      ]
    },
    {
      id: 'agrawal-hsc',
      level: 'Higher Secondary',
      degree: 'Higher Secondary Certificate (HSC)',
      institution: 'K. M. Agrawal College, Kalyan',
      period: 'Classes 11 and 12',
      highlights: [
        'Science stream'
      ]
    }
  ],

  experience: [],

  certifications: [
    {
      id: 'cert-ds-harry',
      title: 'Data Scientist Course Certificate',
      issuer: 'CodeWithHarry'
    },
    {
      id: 'cert-python-harry',
      title: 'Python Course Certificate',
      issuer: 'CodeWithHarry'
    },
    {
      id: 'cert-cloud-iitb',
      title: 'Cloud Computing Workshop',
      issuer: 'IIT Bombay'
    }
  ]
};
