import type { MockProject as Project } from '../types'

export const MOCK_PROJECTS: Project[] = [
  {
    id: 'senyafsl',
    order: 1,
    title: 'SenyaFSL: Gamified Filipino Sign Language Learning App',
    tagline: 'Cross-platform gamified FSL learning app',
    description: 'Developed a cross-platform Filipino Sign Language (FSL) learning application with gamified lessons, progressive levels, and achievement-based learning.\n\nIntegrated gesture recognition using MediaPipe and TensorFlow to create interactive sign language gameplay and improve learning engagement.\n\nBuilt mobile-ready deployment using Capacitor with Firebase Authentication, Firestore, and Cloud Functions for scalable backend services.',
    techStack: ['React.js', 'TypeScript', 'Firebase', 'Tailwind CSS', 'DaisyUI', 'Capacitor', 'MediaPipe', 'TensorFlow'],
    coverImage: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
    ],
    githubLink: '#',
    liveUrl: 'https://iron-gizmo-471110-d0.web.app',
    isFeatured: true,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'senyafsl-lite',
    order: 2,
    title: 'SenyasFSL-Lite',
    tagline: 'Lightweight FSL app for low-end devices',
    description: 'Built a lightweight version of SenyaFSL optimized for lower-end Android devices and limited-bandwidth environments.\n\nImplemented a searchable FSL dictionary and streamlined educational modules while minimizing application size and resource usage.\n\nFocused on mobile accessibility, responsive UI, and improved performance for broader user adoption.',
    techStack: ['Ionic Framework', 'React.js', 'Capacitor', 'Firebase'],
    coverImage: 'https://images.unsplash.com/photo-1526498460520-4c246339dccb?auto=format&fit=crop&q=80&w=800',
    githubLink: '#',
    liveUrl: 'https://senyas-fsl-lite.vercel.app',
    isFeatured: false,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'mtop',
    order: 3,
    title: "Motorized Tricycle Operator's Permit (MTOP) System",
    tagline: 'Municipal permit management system',
    description: "Developed a municipal Motorized Tricycle Operator’s Permit (MTOP) management system to automate franchise applications, renewals, fee tracking, and permit generation.\n\nBuilt an Electron-based desktop client for municipal staff to manage OR records, payments, and operational workflows.\n\nImplemented synchronization workers, automated expiration alerts, and audit logging to improve regulatory compliance and data reliability.",
    techStack: ['Laravel', 'React.js', 'TypeScript', 'Tailwind CSS', 'Electron.js', 'SQLite'],
    coverImage: 'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800'
    ],
    githubLink: '#',
    isFeatured: true,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'stall-management',
    order: 4,
    title: 'Stall Management System',
    tagline: 'Public market stall and tenant management',
    description: 'Created a stall and tenant management system for municipal public markets, including building layouts, contracts, payments, and vendor records.\n\nAutomated contract monitoring, penalty computation, and payment tracking to reduce manual administrative workload.\n\nImplemented role-based access control and Excel import utilities for efficient operational management.',
    techStack: ['Laravel', 'Inertia.js', 'MySQL', 'RBAC', 'React.js', 'TypeScript', 'Tailwind CSS'],
    coverImage: 'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&q=80&w=800'
    ],
    githubLink: '#',
    isFeatured: false,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'library-system',
    order: 5,
    title: 'Municipal Library System',
    tagline: 'Digital library management system',
    description: 'Developed a digital library management system for automating book circulation, visitor logging, overdue monitoring, and patron management.\n\nBuilt a centralized public catalog and administrative dashboard to replace paper-based tracking processes.\n\nAdded automated overdue notifications, report exports, and library card management features.',
    techStack: ['Laravel', 'Inertia.js', 'MySQL', 'React.js', 'TypeScript', 'Tailwind CSS'],
    coverImage: 'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1456953180671-730af0f3fb06?auto=format&fit=crop&q=80&w=800'
    ],
    githubLink: '#',
    isFeatured: true,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'queuing-system',
    order: 6,
    title: 'Queuing System',
    tagline: 'Real-time clinic queue management',
    description: 'Built a real-time clinic queue management system with queue kiosks, digital displays, reporting modules, and department-based services.\n\nIntegrated Laravel Reverb WebSockets for live queue broadcasting and synchronized display updates.\n\nImproved patient flow and operational efficiency through structured intake and queue monitoring features.',
    techStack: ['Laravel', 'Laravel Reverb', 'WebSockets', 'SQLite', 'React.js', 'TypeScript', 'Tailwind CSS'],
    coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1581056771107-24ca5f033842?auto=format&fit=crop&q=80&w=800'
    ],
    githubLink: '#',
    isFeatured: false,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'janedesk',
    order: 7,
    title: 'JaneDesk Website Portfolio',
    tagline: 'Responsive full-stack portfolio platform',
    description: 'Built a responsive full-stack portfolio platform to showcase projects, technical skills, and professional experience.\n\nDeveloped a monorepo architecture combining a React frontend with a Laravel-powered backend API.\n\nImplemented responsive UI design, optimized asset delivery, and integrated contact form functionality.',
    techStack: ['React.js', 'TypeScript', 'Vite', 'Laravel', 'Tailwind CSS', 'PostgreSQL', 'Cypress', 'Supabase'],
    coverImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1481481102804-39f20c25a1e2?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&q=80&w=800'
    ],
    githubLink: '#',
    liveUrl: 'https://janedesk.vercel.app',
    isFeatured: true,
    createdAt: Date.now(),
    updatedAt: Date.now()
  },
  {
    id: 'ggg-inventory',
    order: 8,
    title: 'GG&G Inventory Management App',
    tagline: 'Cross-platform inventory tracking',
    description: 'Developed a cross-platform inventory management application for tracking stock levels, deliveries, and client orders across multiple locations.\n\nImplemented synchronized mobile and web interfaces with real-time Firestore database updates.\n\nDesigned responsive dashboards and inventory workflows to reduce stock discrepancies and improve monitoring efficiency.',
    techStack: ['React.js', 'TypeScript', 'SQLite', 'Tailwind CSS', 'Capacitor'],
    coverImage: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=800'
    ],
    githubLink: '#',
    isFeatured: true,
    createdAt: Date.now(),
    updatedAt: Date.now()
  }
]
