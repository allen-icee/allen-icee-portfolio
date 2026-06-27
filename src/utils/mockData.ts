export interface MockSkill {
  id: string
  name: string
  category: string
  yearsOfExperience: number
  confidence: number
  icon: string
}

export interface MockJournalEntry {
  title: string
  body: string
  signature: string
}

export interface MockProject {
  id: string
  title: string
  tagline: string
  description: string
  techStack: string[]
  coverImage: string
  githubLink: string
}

export interface MockArtwork {
  id: string
  title: string
  imageURL: string
  medium: string
  story: string
}

export const mockSkills: MockSkill[] = [
  { id: 'react', name: 'React', category: 'Frontend', yearsOfExperience: 4, confidence: 90, icon: 'logos:react' },
  { id: 'typescript', name: 'TypeScript', category: 'Language', yearsOfExperience: 3, confidence: 82, icon: 'logos:typescript-icon' },
  { id: 'nodejs', name: 'Node.js', category: 'Backend', yearsOfExperience: 3, confidence: 78, icon: 'logos:nodejs-icon' },
  { id: 'firebase', name: 'Firebase', category: 'Backend', yearsOfExperience: 2, confidence: 65, icon: 'logos:firebase' },
  { id: 'tailwind', name: 'Tailwind CSS', category: 'Frontend', yearsOfExperience: 3, confidence: 85, icon: 'logos:tailwindcss-icon' },
  { id: 'figma', name: 'Figma', category: 'Design', yearsOfExperience: 2, confidence: 60, icon: 'logos:figma' },
]

export const mockJournal: MockJournalEntry = {
  title: 'The Open Journal',
  body: `Dear Visitor,

My name is Ice. Every project begins as a blank page — a quiet space where curiosity meets craft. I build things for the web that feel as good as they work: thoughtful interfaces, sturdy backends, and experiences that linger long after the tab closes.

This library is my collection of experiments, failures, fixes, and finished work. Each repository here is a chapter — some short, some still being written. I believe the best code reads like a letter: clear, intentional, and written with someone on the other end.

So pull up a chair, flip through the shelves, and stay as long as you like. The kettle is always on.`,
  signature: '— Ice',
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
