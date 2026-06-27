// ponytail: one-time seed script. Run with: npx tsx scripts/seed-firestore.ts
// Pushes mock data into Firestore so the admin has real content to edit.

import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY ?? '',
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.VITE_FIREBASE_APP_ID ?? '',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

const now = Date.now()

const projects = [
  {
    title: 'Icee Portfolio',
    tagline: 'A warm library on the web',
    description: 'The very site you are browsing. Built as a digital library with a paper-aesthetic design system, smooth Lenis scrolling, a hidden admin panel, and a fully typed React + TypeScript architecture.',
    techStack: ['React', 'TypeScript', 'Tailwind CSS v4', 'Framer Motion', 'Firebase', 'Lenis'],
    coverImage: 'https://picsum.photos/seed/icee-portfolio/400/560',
    githubLink: 'https://github.com/anomalyco/allen-icee-portfolio',
    isFeatured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    title: 'Task Flow',
    tagline: 'Kanban that feels like paper',
    description: 'A project management board inspired by physical sticky notes and corkboards. Drag-and-drop with smooth animations, real-time collaboration via WebSockets.',
    techStack: ['React', 'Node.js', 'Socket.io', 'PostgreSQL', 'Tailwind CSS'],
    coverImage: 'https://picsum.photos/seed/task-flow/400/560',
    githubLink: 'https://github.com/anomalyco/task-flow',
    isFeatured: true,
    createdAt: now,
    updatedAt: now,
  },
  {
    title: 'Aurora API',
    tagline: 'Lightweight, typed, and fast',
    description: 'A RESTful API gateway with automatic OpenAPI documentation, Zod-powered request validation, and sub-millisecond response times.',
    techStack: ['TypeScript', 'Node.js', 'Express', 'Zod', 'Redis'],
    coverImage: 'https://picsum.photos/seed/aurora-api/400/560',
    githubLink: 'https://github.com/anomalyco/aurora-api',
    isFeatured: false,
    createdAt: now,
    updatedAt: now,
  },
  {
    title: 'Pixel Studio',
    tagline: 'A canvas for generative art',
    description: 'An in-browser creative coding environment with real-time preview, layer system, and export-to-SVG/PNG.',
    techStack: ['React', 'Canvas API', 'Web Workers', 'Zustand', 'Tailwind CSS'],
    coverImage: 'https://picsum.photos/seed/pixel-studio/400/560',
    githubLink: 'https://github.com/anomalyco/pixel-studio',
    isFeatured: false,
    createdAt: now,
    updatedAt: now,
  },
]

const skills = [
  { name: 'React', category: 'Frontend', yearsOfExperience: 4, confidence: 90, icon: 'logos:react', createdAt: now, updatedAt: now },
  { name: 'TypeScript', category: 'Language', yearsOfExperience: 3, confidence: 82, icon: 'logos:typescript-icon', createdAt: now, updatedAt: now },
  { name: 'Node.js', category: 'Backend', yearsOfExperience: 3, confidence: 78, icon: 'logos:nodejs-icon', createdAt: now, updatedAt: now },
  { name: 'Firebase', category: 'Backend', yearsOfExperience: 2, confidence: 65, icon: 'logos:firebase', createdAt: now, updatedAt: now },
  { name: 'Tailwind CSS', category: 'Frontend', yearsOfExperience: 3, confidence: 85, icon: 'logos:tailwindcss-icon', createdAt: now, updatedAt: now },
  { name: 'Figma', category: 'Design', yearsOfExperience: 2, confidence: 60, icon: 'logos:figma', createdAt: now, updatedAt: now },
]

const experience = [
  {
    role: 'Senior Frontend Engineer',
    company: 'Tech Co.',
    timeline: { start: '2022-03', end: undefined },
    description: 'Leading the frontend architecture team. Built component libraries, improved Core Web Vitals by 40%, and mentored junior developers.',
    technologies: ['React', 'TypeScript', 'Tailwind CSS'],
    createdAt: now, updatedAt: now,
  },
  {
    role: 'Full-Stack Developer',
    company: 'Startup Inc.',
    timeline: { start: '2020-06', end: '2022-02' },
    description: 'Built and shipped three products from scratch. Managed cloud infrastructure and implemented CI/CD pipelines.',
    technologies: ['Node.js', 'React', 'Firebase', 'PostgreSQL'],
    createdAt: now, updatedAt: now,
  },
]

const artworks = [
  { title: 'Dusk Garden', imageURL: 'https://picsum.photos/seed/dusk-garden/600/800', medium: 'Digital Painting — Procreate', story: 'Inspired by the quiet hour when the sun has set but the streetlights haven\'t yet flickered on.', createdAt: now, updatedAt: now },
  { title: 'The Lighthouse Keeper', imageURL: 'https://picsum.photos/seed/lighthouse/600/800', medium: 'Vector Illustration — Adobe Illustrator', story: 'A tribute to the solitary stewards of the coast.', createdAt: now, updatedAt: now },
  { title: 'Midnight Ferris Wheel', imageURL: 'https://picsum.photos/seed/ferris/600/800', medium: 'Mixed Media — Photoshop + Photography', story: 'The neon glow against the fog created an almost surreal atmosphere.', createdAt: now, updatedAt: now },
  { title: 'Study in Amber', imageURL: 'https://picsum.photos/seed/amber/600/800', medium: 'Oil on Canvas (Digital) — Rebelle 6', story: 'An exploration of warm light on skin and fabric.', createdAt: now, updatedAt: now },
  { title: 'Botanical No. 7', imageURL: 'https://picsum.photos/seed/botanical/600/800', medium: 'Watercolor + Ink — Photoshop', story: 'Part of an ongoing series documenting plants that thrive in neglect.', createdAt: now, updatedAt: now },
  { title: 'Silhouettes at Dawn', imageURL: 'https://picsum.photos/seed/silhouettes/600/800', medium: 'Photography — Sony A7III', story: 'Figures in the distance were strangers moving through the mist.', createdAt: now, updatedAt: now },
]

async function seed() {
  console.log('Seeding Firestore…')

  for (const proj of projects) {
    const ref = doc(db, 'projects', proj.title.toLowerCase().replace(/\s+/g, '-'))
    await setDoc(ref, proj)
    console.log(`  ✓ project: ${proj.title}`)
  }

  for (const skill of skills) {
    const ref = doc(db, 'skills', skill.name.toLowerCase().replace(/\s+/g, '-'))
    await setDoc(ref, skill)
    console.log(`  ✓ skill: ${skill.name}`)
  }

  for (const exp of experience) {
    const ref = doc(db, 'experience', exp.role.toLowerCase().replace(/\s+/g, '-'))
    await setDoc(ref, exp)
    console.log(`  ✓ experience: ${exp.role}`)
  }

  for (const art of artworks) {
    const ref = doc(db, 'artworks', art.title.toLowerCase().replace(/\s+/g, '-'))
    await setDoc(ref, art)
    console.log(`  ✓ artwork: ${art.title}`)
  }

  // Journal entry
  await setDoc(doc(db, 'settings', 'journal'), {
    title: 'The Open Journal',
    body: `<p>Dear Visitor,</p><p>My name is Ice. Every project begins as a blank page — a quiet space where curiosity meets craft.</p><p>Welcome to my library.</p>`,
    signature: '— Ice',
    updatedAt: now,
  })
  console.log('  ✓ journal entry')

  console.log('\nDone!')
}

seed().catch(console.error)
