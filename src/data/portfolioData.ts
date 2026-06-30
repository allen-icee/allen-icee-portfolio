import type { MockSkill, MockJournalEntry, MockProject, MockArtwork, Experience } from '../types'






export const mockSkills: MockSkill[] = [
  // Frontend
  { id: 'react', name: 'React.js', category: 'Frontend', yearsOfExperience: 3, confidence: 90, icon: 'logos:react' },
  { id: 'javascript', name: 'JavaScript', category: 'Frontend', yearsOfExperience: 4, confidence: 95, icon: 'logos:javascript' },
  { id: 'typescript', name: 'TypeScript', category: 'Frontend', yearsOfExperience: 3, confidence: 85, icon: 'logos:typescript-icon' },
  { id: 'html5', name: 'HTML5', category: 'Frontend', yearsOfExperience: 5, confidence: 95, icon: 'logos:html-5' },
  { id: 'css3', name: 'CSS3', category: 'Frontend', yearsOfExperience: 5, confidence: 90, icon: 'logos:css-3' },
  { id: 'tailwindcss', name: 'Tailwind CSS', category: 'Frontend', yearsOfExperience: 3, confidence: 90, icon: 'logos:tailwindcss-icon' },
  { id: 'ionic', name: 'Ionic Framework', category: 'Frontend', yearsOfExperience: 2, confidence: 75, icon: 'logos:ionic-icon' },
  { id: 'vite', name: 'Vite', category: 'Frontend', yearsOfExperience: 2, confidence: 85, icon: 'logos:vitejs' },
  
  // Backend & Database
  { id: 'laravel', name: 'Laravel', category: 'Backend', yearsOfExperience: 2, confidence: 75, icon: 'logos:laravel' },
  { id: 'firebase', name: 'Firebase', category: 'Backend', yearsOfExperience: 3, confidence: 85, icon: 'logos:firebase' },
  { id: 'firestore', name: 'Firestore', category: 'Database', yearsOfExperience: 3, confidence: 80, icon: 'vscode-icons:file-type-firebase' },
  { id: 'mysql', name: 'MySQL', category: 'Database', yearsOfExperience: 3, confidence: 80, icon: 'logos:mysql' },
  { id: 'postgresql', name: 'PostgreSQL', category: 'Database', yearsOfExperience: 2, confidence: 75, icon: 'logos:postgresql' },
  { id: 'sqlite', name: 'SQLite', category: 'Database', yearsOfExperience: 2, confidence: 70, icon: 'logos:sqlite' },
  
  // Mobile & Cross-Platform
  { id: 'capacitor', name: 'Capacitor', category: 'Mobile', yearsOfExperience: 2, confidence: 75, icon: 'logos:capacitorjs-icon' },
  { id: 'android', name: 'Android Deployment', category: 'Mobile', yearsOfExperience: 2, confidence: 70, icon: 'logos:android-icon' },
  { id: 'electron', name: 'Electron.js', category: 'Desktop', yearsOfExperience: 1, confidence: 65, icon: 'logos:electron' },
  
  // Tools & Platforms
  { id: 'git', name: 'Git', category: 'Tools', yearsOfExperience: 4, confidence: 90, icon: 'logos:git-icon' },
  { id: 'github', name: 'GitHub', category: 'Tools', yearsOfExperience: 4, confidence: 90, icon: 'mdi:github' },
  { id: 'vscode', name: 'VS Code', category: 'Tools', yearsOfExperience: 5, confidence: 95, icon: 'logos:visual-studio-code' },
  { id: 'ai', name: 'AI-Assisted Dev', category: 'Tools', yearsOfExperience: 2, confidence: 95, icon: 'lucide:bot' },
  { id: 'functions', name: 'Firebase Functions', category: 'Tools', yearsOfExperience: 2, confidence: 75, icon: 'logos:google-cloud' },
  { id: 'supabase', name: 'Supabase', category: 'Tools', yearsOfExperience: 1, confidence: 70, icon: 'logos:supabase-icon' },
  
  // Testing & Networking
  { id: 'cypress', name: 'Cypress', category: 'Testing', yearsOfExperience: 1, confidence: 65, icon: 'logos:cypress-icon' },
  { id: 'phpunit', name: 'PHPUnit', category: 'Testing', yearsOfExperience: 1, confidence: 60, icon: 'vscode-icons:file-type-phpunit' },
  { id: 'ccna', name: 'CCNA 1 & 2', category: 'Networking', yearsOfExperience: 2, confidence: 80, icon: 'lucide:network' },
  { id: 'routing', name: 'Switching & Routing', category: 'Networking', yearsOfExperience: 2, confidence: 80, icon: 'lucide:router' },
  
  // Creative & Productivity
  { id: 'krita', name: 'Krita', category: 'Creative', yearsOfExperience: 4, confidence: 85, icon: 'simple-icons:krita' },
  { id: 'ibispaint', name: 'IbisPaint', category: 'Creative', yearsOfExperience: 4, confidence: 90, icon: 'lucide:paint-brush' },
  { id: 'capcut', name: 'CapCut', category: 'Creative', yearsOfExperience: 3, confidence: 85, icon: 'lucide:video' },
  { id: 'msword', name: 'Microsoft Word', category: 'Creative', yearsOfExperience: 5, confidence: 95, icon: 'mdi:file-word-box' },
  { id: 'mspowerpoint', name: 'Microsoft PowerPoint', category: 'Creative', yearsOfExperience: 5, confidence: 90, icon: 'mdi:file-powerpoint-box' },
  { id: 'msexcel', name: 'Microsoft Excel', category: 'Creative', yearsOfExperience: 4, confidence: 85, icon: 'mdi:file-excel-box' },
  { id: 'googlesheets', name: 'Google Sheet', category: 'Creative', yearsOfExperience: 4, confidence: 90, icon: 'mdi:google-spreadsheet' },
  
  // Professional Skills
  { id: 'communication', name: 'Client Communication', category: 'Professional', yearsOfExperience: 3, confidence: 90, icon: 'lucide:message-square' },
  { id: 'presentation', name: 'Project Presentation', category: 'Professional', yearsOfExperience: 3, confidence: 85, icon: 'lucide:presentation' },
  { id: 'uiux', name: 'UI/UX Design', category: 'Professional', yearsOfExperience: 3, confidence: 85, icon: 'lucide:layout' },
  { id: 'delivery', name: 'Project Delivery', category: 'Professional', yearsOfExperience: 3, confidence: 90, icon: 'lucide:box' },
  { id: 'problemsolving', name: 'Problem Solving', category: 'Professional', yearsOfExperience: 4, confidence: 95, icon: 'lucide:puzzle' },
  { id: 'docs', name: 'Technical Documentation', category: 'Professional', yearsOfExperience: 3, confidence: 80, icon: 'lucide:file-text' },
  { id: 'team', name: 'Team Collaboration', category: 'Professional', yearsOfExperience: 3, confidence: 90, icon: 'lucide:users' },
  { id: 'adaptability', name: 'Adaptability', category: 'Professional', yearsOfExperience: 4, confidence: 95, icon: 'lucide:refresh-cw' },
]

export const mockJournal: MockJournalEntry = {
  title: "The Keeper's Desk",
  body: `If you have chosen to pause... welcome.<br/><br/>The world outside rarely stops moving, so I built this space as an anchor. It began as a collection of lines of code and quiet thoughts, but it has become something more—a place to simply let be.<br/><br/>Everything on these shelves is a record of persistence and curiosity. Some projects taught me how to endure the noise, while others reminded me how to build a shelter from it.<br/><br/>Catch your breath. You don't have to rush here.`,
  signature: 'With grace, Ice',
}

export const mockProjects: MockProject[] = [
  {
    id: 'icee-portfolio',
    title: 'Icee Portfolio',
    tagline: 'A warm library on the web',
    description: 'The very site you are browsing. Built as a digital library with a paper-aesthetic design system, smooth Lenis scrolling, a hidden admin panel, and a fully typed React + TypeScript architecture. Every component was crafted to feel tangible — like flipping through a beloved notebook.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Firebase', 'Lenis'],
    coverImage: 'https://picsum.photos/seed/icee-portfolio/400/560',
    githubLink: 'https://github.com/anomalyco/allen-icee-portfolio',
  },
  {
    id: 'task-flow',
    title: 'Task Flow',
    tagline: 'Kanban that feels like paper',
    description: 'A project management board inspired by physical sticky notes and corkboards. Drag-and-drop with smooth animations, real-time collaboration via WebSockets, and a deep focus on accessibility — every interaction has a keyboard equivalent and a screen-reader-friendly announcement.',
    techStack: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Tailwind CSS'],
    coverImage: 'https://picsum.photos/seed/task-flow/400/560',
    githubLink: 'https://github.com/anomalyco/task-flow',
  },
  {
    id: 'aurora-api',
    title: 'Aurora API',
    tagline: 'Lightweight, typed, and fast',
    description: 'A RESTful API gateway designed for developer experience. Automatic OpenAPI documentation, Zod-powered request validation, and sub-millisecond response times via caching layers. Used in production by three early-stage startups.',
    techStack: ['TypeScript', 'Node.js', 'Express', 'Zod', 'Redis'],
    coverImage: 'https://picsum.photos/seed/aurora-api/400/560',
    githubLink: 'https://github.com/anomalyco/aurora-api',
  },
  {
    id: 'pixel-studio',
    title: 'Pixel Studio',
    tagline: 'A canvas for generative art',
    description: 'An in-browser creative coding environment that lets artists sketch with JavaScript. Features a real-time preview pane, layer system, export-to-SVG/PNG, and a community gallery of user-submitted pieces. Built to explore the boundary between code and creativity.',
    techStack: ['React', 'Canvas API', 'Web Workers', 'Zustand', 'Tailwind CSS'],
    coverImage: 'https://picsum.photos/seed/pixel-studio/400/560',
    githubLink: 'https://github.com/anomalyco/pixel-studio',
  },
]

export const mockArtworks: MockArtwork[] = [
  {
    id: 'dusk-garden',
    title: 'Dusk Garden',
    imageURL: 'https://picsum.photos/seed/dusk-garden/600/800',
    medium: 'Digital Painting — Procreate',
    story: 'Inspired by the quiet hour when the sun has set but the streetlights haven\'t yet flickered on. The garden holds its breath, and for a moment the world exists in shades of violet and indigo.',
  },
  {
    id: 'lighthouse',
    title: 'The Lighthouse Keeper',
    imageURL: 'https://picsum.photos/seed/lighthouse/600/800',
    medium: 'Vector Illustration — Adobe Illustrator',
    story: 'A tribute to the solitary stewards of the coast. Every lighthouse has a personality — this one is patient, weathered, and warm. The keeper tends the flame so others find their way home.',
  },
  {
    id: 'ferris-wheel',
    title: 'Midnight Ferris Wheel',
    imageURL: 'https://picsum.photos/seed/ferris/600/800',
    medium: 'Mixed Media — Photoshop + Photography',
    story: 'Shot at a small carnival on the outskirts of the city. The neon glow against the fog created an almost surreal atmosphere — like a memory of a dream rather than a real place.',
  },
  {
    id: 'study-in-amber',
    title: 'Study in Amber',
    imageURL: 'https://picsum.photos/seed/amber/600/800',
    medium: 'Oil on Canvas (Digital) — Rebelle 6',
    story: 'An exploration of warm light on skin and fabric. I wanted to capture the feeling of late afternoon sunlight filtering through linen curtains — a moment so golden it feels preserved, like an insect in amber.',
  },
  {
    id: 'botanical',
    title: 'Botanical No. 7',
    imageURL: 'https://picsum.photos/seed/botanical/600/800',
    medium: 'Watercolor + Ink — Photoshop',
    story: 'Part of an ongoing series documenting plants that thrive in neglect. This one is a snake plant that has outlived three roommates, two cats, and one particularly harsh winter. It deserves a portrait.',
  },
  {
    id: 'silhouettes',
    title: 'Silhouettes at Dawn',
    imageURL: 'https://picsum.photos/seed/silhouettes/600/800',
    medium: 'Photography — Sony A7III',
    story: 'Taken during a 5 AM walk along the pier. The figures in the distance were strangers, but in that half-light they could have been anyone — ghosts of conversations never had, moving through the mist.',
  },
]

export const mockExperiences: Experience[] = [
  {
    id: 'exp-1',
    role: 'Freelance Digital Artist',
    company: 'Gerona, Province of Tarlac, Philippines (Remote)',
    timeline: { start: 'June 2023', end: 'Current' },
    description: '• Managed freelance digital art commissions for online clients, handling project discussions, revisions, and final asset delivery.\n• Designed digital illustrations, branding assets, and media content for YouTube channels and online publications.\n• Maintained consistent client communication and delivered projects within agreed timelines.',
    technologies: ['Digital Illustration', 'Branding', 'Client Communication'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'exp-2',
    role: 'Management Information Systems Unit Full-Stack Developer Intern',
    company: 'LGU Gerona - Poblacion 3, Gerona, Tarlac (Onsite)',
    timeline: { start: 'February 2026', end: 'May 2026' },
    description: '• Developed and maintained multiple LAN-based and full-stack systems for LGU Gerona, including queue management, permit processing, and library operations.\n• Coordinated with department heads and municipal staff to gather system requirements and improve operational workflows.\n• Assisted visitors and staff with technical troubleshooting, printing services, and software usage support.',
    technologies: ['Full-Stack Development', 'LAN-based Systems', 'Troubleshooting'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'exp-3',
    role: 'Speech Annotator',
    company: 'TransPerfect Tranlations International (Remote)',
    timeline: { start: 'June 2025', end: 'July 2025' },
    description: '• Analyzed and annotated audio datasets with high attention to detail to support machine learning and speech recognition systems.\n• Maintained quality standards and accuracy while processing large volumes of data under strict deadlines.\n• Adapted quickly to proprietary annotation tools and evolving project guidelines.',
    technologies: ['Audio Annotation', 'Machine Learning Support', 'Data Processing'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'exp-4',
    role: 'ICT Work Immersion Completer',
    company: 'Corazon C. Aquino HS (Onsite)',
    timeline: { start: 'S.Y 2021', end: '2022' },
    description: '• Assembled and configured computer hardware systems, including operating systems and driver installation.\n• Established Local Area Network (LAN) infrastructures through router setup, cable crimping, and IP configuration.\n• Assisted with technical troubleshooting and basic system maintenance tasks.',
    technologies: ['Hardware Assembly', 'LAN Setup', 'System Maintenance'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
]