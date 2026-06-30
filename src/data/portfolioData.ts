import type { MockSkill, MockArtwork, MockExperience } from '../types'






export const mockSkills: MockSkill[] = [
  // Frontend
  { id: 'react', name: 'React.js', categoryId: 'frontend', icon: 'logos:react' },
  { id: 'javascript', name: 'JavaScript', categoryId: 'frontend', icon: 'logos:javascript' },
  { id: 'typescript', name: 'TypeScript', categoryId: 'frontend', icon: 'logos:typescript-icon' },
  { id: 'html5', name: 'HTML5', categoryId: 'frontend', icon: 'logos:html-5' },
  { id: 'css3', name: 'CSS3', categoryId: 'frontend', icon: 'logos:css-3' },
  { id: 'tailwindcss', name: 'Tailwind CSS', categoryId: 'frontend', icon: 'logos:tailwindcss-icon' },
  { id: 'ionic', name: 'Ionic Framework', categoryId: 'frontend', icon: 'logos:ionic-icon' },
  { id: 'vite', name: 'Vite', categoryId: 'frontend', icon: 'logos:vitejs' },
  
  // Backend & Database
  { id: 'laravel', name: 'Laravel', categoryId: 'backend', icon: 'logos:laravel' },
  { id: 'firebase', name: 'Firebase', categoryId: 'backend', icon: 'logos:firebase' },
  { id: 'firestore', name: 'Firestore', categoryId: 'database', icon: 'vscode-icons:file-type-firebase' },
  { id: 'mysql', name: 'MySQL', categoryId: 'database', icon: 'logos:mysql' },
  { id: 'postgresql', name: 'PostgreSQL', categoryId: 'database', icon: 'logos:postgresql' },
  { id: 'sqlite', name: 'SQLite', categoryId: 'database', icon: 'logos:sqlite' },
  
  // Mobile & Cross-Platform
  { id: 'capacitor', name: 'Capacitor', categoryId: 'mobile', icon: 'logos:capacitorjs-icon' },
  { id: 'android', name: 'Android Deployment', categoryId: 'mobile', icon: 'logos:android-icon' },
  { id: 'electron', name: 'Electron.js', categoryId: 'desktop', icon: 'logos:electron' },
  
  // Tools & Platforms
  { id: 'git', name: 'Git', categoryId: 'tools', icon: 'logos:git-icon' },
  { id: 'github', name: 'GitHub', categoryId: 'tools', icon: 'mdi:github' },
  { id: 'vscode', name: 'VS Code', categoryId: 'tools', icon: 'logos:visual-studio-code' },
  { id: 'ai', name: 'AI-Assisted Dev', categoryId: 'tools', icon: 'lucide:bot' },
  { id: 'functions', name: 'Firebase Functions', categoryId: 'tools', icon: 'logos:google-cloud' },
  { id: 'supabase', name: 'Supabase', categoryId: 'tools', icon: 'logos:supabase-icon' },
  
  // Testing & Networking
  { id: 'cypress', name: 'Cypress', categoryId: 'testing', icon: 'logos:cypress-icon' },
  { id: 'phpunit', name: 'PHPUnit', categoryId: 'testing', icon: 'vscode-icons:file-type-phpunit' },
  { id: 'ccna', name: 'CCNA 1 & 2', categoryId: 'networking', icon: 'lucide:network' },
  { id: 'routing', name: 'Switching & Routing', categoryId: 'networking', icon: 'lucide:router' },
  
  // Creative & Productivity
  { id: 'krita', name: 'Krita', categoryId: 'creative', icon: 'simple-icons:krita' },
  { id: 'ibispaint', name: 'IbisPaint', categoryId: 'creative', icon: 'lucide:paint-brush' },
  { id: 'capcut', name: 'CapCut', categoryId: 'creative', icon: 'lucide:video' },
  { id: 'msword', name: 'Microsoft Word', categoryId: 'creative', icon: 'mdi:file-word-box' },
  { id: 'mspowerpoint', name: 'Microsoft PowerPoint', categoryId: 'creative', icon: 'mdi:file-powerpoint-box' },
  { id: 'msexcel', name: 'Microsoft Excel', categoryId: 'creative', icon: 'mdi:file-excel-box' },
  { id: 'googlesheets', name: 'Google Sheet', categoryId: 'creative', icon: 'mdi:google-spreadsheet' },
  
  // Professional Skills
  { id: 'communication', name: 'Client Communication', categoryId: 'professional', icon: 'lucide:message-square' },
  { id: 'presentation', name: 'Project Presentation', categoryId: 'professional', icon: 'lucide:presentation' },
  { id: 'uiux', name: 'UI/UX Design', categoryId: 'professional', icon: 'lucide:layout' },
  { id: 'delivery', name: 'Project Delivery', categoryId: 'professional', icon: 'lucide:box' },
  { id: 'problemsolving', name: 'Problem Solving', categoryId: 'professional', icon: 'lucide:puzzle' },
  { id: 'docs', name: 'Technical Documentation', categoryId: 'professional', icon: 'lucide:file-text' },
  { id: 'team', name: 'Team Collaboration', categoryId: 'professional', icon: 'lucide:users' },
  { id: 'adaptability', name: 'Adaptability', categoryId: 'professional', icon: 'lucide:refresh-cw' },
]

export const mockArtworks: MockArtwork[] = [
  {
    id: 'dusk-garden',
    title: 'Dusk Garden',
    image: 'https://picsum.photos/seed/dusk-garden/600/800',
    medium: 'Digital Painting — Procreate',
    story: 'Inspired by the quiet hour when the sun has set but the streetlights haven\'t yet flickered on. The garden holds its breath, and for a moment the world exists in shades of violet and indigo.',
  },
  {
    id: 'lighthouse',
    title: 'The Lighthouse Keeper',
    image: 'https://picsum.photos/seed/lighthouse/600/800',
    medium: 'Vector Illustration — Adobe Illustrator',
    story: 'A tribute to the solitary stewards of the coast. Every lighthouse has a personality — this one is patient, weathered, and warm. The keeper tends the flame so others find their way home.',
  },
  {
    id: 'ferris-wheel',
    title: 'Midnight Ferris Wheel',
    image: 'https://picsum.photos/seed/ferris/600/800',
    medium: 'Mixed Media — Photoshop + Photography',
    story: 'Shot at a small carnival on the outskirts of the city. The neon glow against the fog created an almost surreal atmosphere — like a memory of a dream rather than a real place.',
  },
  {
    id: 'study-in-amber',
    title: 'Study in Amber',
    image: 'https://picsum.photos/seed/amber/600/800',
    medium: 'Oil on Canvas (Digital) — Rebelle 6',
    story: 'An exploration of warm light on skin and fabric. I wanted to capture the feeling of late afternoon sunlight filtering through linen curtains — a moment so golden it feels preserved, like an insect in amber.',
  },
  {
    id: 'botanical',
    title: 'Botanical No. 7',
    image: 'https://picsum.photos/seed/botanical/600/800',
    medium: 'Watercolor + Ink — Photoshop',
    story: 'Part of an ongoing series documenting plants that thrive in neglect. This one is a snake plant that has outlived three roommates, two cats, and one particularly harsh winter. It deserves a portrait.',
  },
  {
    id: 'silhouettes',
    title: 'Silhouettes at Dawn',
    image: 'https://picsum.photos/seed/silhouettes/600/800',
    medium: 'Photography — Sony A7III',
    story: 'Taken during a 5 AM walk along the pier. The figures in the distance were strangers, but in that half-light they could have been anyone — ghosts of conversations never had, moving through the mist.',
  },
]

export const mockExperiences: MockExperience[] = [
  {
    id: 'exp-1',
    order: 1,
    role: 'Freelance Digital Artist',
    company: 'Gerona, Province of Tarlac, Philippines (Remote)',
    startMonth: 'June',
    startYear: '2023',
    description: '• Managed freelance digital art commissions for online clients, handling project discussions, revisions, and final asset delivery.\n• Designed digital illustrations, branding assets, and media content for YouTube channels and online publications.\n• Maintained consistent client communication and delivered projects within agreed timelines.',
    skillsAcquired: ['Digital Illustration', 'Branding', 'Client Communication'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'exp-2',
    order: 2,
    role: 'Management Information Systems Unit Full-Stack Developer Intern',
    company: 'LGU Gerona - Poblacion 3, Gerona, Tarlac (Onsite)',
    startMonth: 'February',
    startYear: '2026',
    endMonth: 'May',
    endYear: '2026',
    description: '• Developed and maintained multiple LAN-based and full-stack systems for LGU Gerona, including queue management, permit processing, and library operations.\n• Coordinated with department heads and municipal staff to gather system requirements and improve operational workflows.\n• Assisted visitors and staff with technical troubleshooting, printing services, and software usage support.',
    skillsAcquired: ['Full-Stack Development', 'LAN-based Systems', 'Troubleshooting'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'exp-3',
    order: 3,
    role: 'Speech Annotator',
    company: 'TransPerfect Tranlations International (Remote)',
    startMonth: 'June',
    startYear: '2025',
    endMonth: 'July',
    endYear: '2025',
    description: '• Analyzed and annotated audio datasets with high attention to detail to support machine learning and speech recognition systems.\n• Maintained quality standards and accuracy while processing large volumes of data under strict deadlines.\n• Adapted quickly to proprietary annotation tools and evolving project guidelines.',
    skillsAcquired: ['Audio Annotation', 'Machine Learning Support', 'Data Processing'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  },
  {
    id: 'exp-4',
    order: 4,
    role: 'ICT Work Immersion Completer',
    company: 'Corazon C. Aquino HS (Onsite)',
    startMonth: 'August',
    startYear: '2021',
    endMonth: 'June',
    endYear: '2022',
    description: '• Assembled and configured computer hardware systems, including operating systems and driver installation.\n• Established Local Area Network (LAN) infrastructures through router setup, cable crimping, and IP configuration.\n• Assisted with technical troubleshooting and basic system maintenance tasks.',
    skillsAcquired: ['Hardware Assembly', 'LAN Setup', 'System Maintenance'],
    createdAt: Date.now(),
    updatedAt: Date.now(),
  }
]