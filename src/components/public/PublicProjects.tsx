import { useState, useCallback, useMemo, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useCollection } from '../../hooks/useCollection'
import type { Project } from '../../types'
import BookModal from './BookModal'

const MOCK_PROJECTS: Project[] = [
  {
    id: 'senyafsl',
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

function BookCard({ project, index, onSelect }: { project: Project; index: number; onSelect: (p: Project) => void }) {
  const handleClick = useCallback(() => {
    onSelect(project)
  }, [onSelect, project])

  // Smart splitting for long titles like "SenyaFSL: Gamified Filipino Sign Language..."
  const [mainTitle, subTitle] = project.title.includes(':')
    ? project.title.split(':')
    : [project.title, null]

  return (
    <motion.button
      className="group relative flex w-36 h-52 sm:w-56 sm:h-[320px] md:w-64 md:h-[360px] shrink-0 flex-col overflow-visible text-left transition-all duration-500 z-10 hover:z-50 focus:outline-none"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1, ease: 'easeOut' }}
      onClick={handleClick}
      aria-label={`Open project book: ${project.title}`}
      whileHover={{
        y: -20,
        scale: 1.05,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      style={{ perspective: '1200px' }}
    >
      {/* Dynamic Floor Shadow */}
      <div className="absolute -bottom-4 left-4 right-0 h-6 bg-black/40 blur-[10px] rounded-[100%] transition-opacity duration-300 group-hover:opacity-60" />

      {/* 3D Book Container (Using your original structural transforms) */}
      <div
        className="relative flex h-full w-full flex-col rounded-r-[4px] rounded-l-sm bg-white shadow-xl transition-all duration-500 group-hover:shadow-2xl dark:shadow-[8px_12px_20px_rgba(0,0,0,0.8)]"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-15deg) rotateX(5deg)',
        }}
      >

        {/* Spine (Left Face) */}
        <div
          className="absolute top-0 bottom-0 left-0 w-8 origin-right bg-[#e4e4e7] dark:bg-[#d4d4d8] rounded-l-sm border-r border-black/5 flex items-center justify-between py-6 overflow-hidden shadow-[inset_-2px_0_5px_rgba(0,0,0,0.1)]"
          style={{ transform: 'rotateY(-90deg) translateX(-100%)', transformOrigin: 'left' }}
        >
          <span className="text-gray-400 text-[9px] uppercase tracking-[0.3em] font-bold whitespace-nowrap -rotate-90">
            Vol. {index + 1}
          </span>
          <span className="text-[#0f172a] text-[10px] font-serif font-black tracking-widest whitespace-nowrap -rotate-90 uppercase truncate w-[200px] text-center">
            {mainTitle}
          </span>
        </div>

        {/* Pages (Right Face - Depth) */}
        <div
          className="absolute top-[2px] bottom-[2px] right-0 w-6 origin-left bg-[#E8E4D9] dark:bg-[#c4bfae] shadow-inner rounded-r-[3px] overflow-hidden"
          style={{ transform: 'rotateY(90deg) translateX(100%)', transformOrigin: 'right' }}
        >
          <div className="h-full w-full opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 1px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0.15) 2px)' }} />
        </div>

        {/* Pages (Top Face - Depth) */}
        <div
          className="absolute top-0 left-[1px] right-[1px] h-2 origin-bottom bg-[#E8E4D9] dark:bg-[#c4bfae] shadow-inner"
          style={{ transform: 'rotateX(90deg) translateY(-100%)', transformOrigin: 'top' }}
        >
          <div className="h-full w-full opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 1px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0.15) 2px)' }} />
        </div>

        {/* Front Cover Container (Occupying 100% of the space) */}
        <div
          className="relative flex h-full w-full flex-col overflow-hidden rounded-r-[4px] rounded-l-[1px] bg-charcoal border border-black/5"
          style={{ transform: 'translateZ(1px)' }}
        >
          {/* Full-bleed Hero Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.coverImage})` }}
          />

          {/* Subtle Gradient for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 opacity-90 transition-opacity duration-300 group-hover:opacity-70" />

          {/* Typography Layer */}
          <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6 z-10 text-[#FDFBF7]">

            {/* Top Bar: Volume & Publisher Mark */}
            <div className="flex justify-between items-start w-full">
              <span className="font-sans text-[9px] tracking-[0.25em] font-medium uppercase text-white/80">
                Vol. {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col items-center justify-center border border-white/20 px-1.5 py-1 backdrop-blur-sm bg-black/10">
                <img src="/logo/logo.svg" alt="AID" className="h-3 w-auto mb-0.5 opacity-80 brightness-0 invert" />
                <span className="font-mono text-[5px] tracking-[0.2em] text-white/60 uppercase">
                  AID
                </span>
              </div>
            </div>

            {/* Bottom Content: Title and Tagline */}
            <div className="mb-1">
              <h3 className="font-serif text-lg sm:text-2xl md:text-[28px] leading-[1.05] font-normal tracking-[-0.01em] text-white/95 drop-shadow-md">
                {mainTitle}
              </h3>

              {subTitle && (
                <h4 className="font-serif text-[10px] sm:text-[12px] md:text-[13px] text-white/70 mt-1.5 sm:mt-2.5 leading-snug drop-shadow-sm font-light">
                  {subTitle.trim()}
                </h4>
              )}

              <div className="w-8 sm:w-10 h-px bg-white/40 my-2 sm:my-4" />

              <p className="font-sans text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.15em] uppercase text-white/60 font-semibold leading-relaxed max-w-[90%]">
                {project.tagline}
              </p>
            </div>
          </div>

          {/* Spine Hinge / Crease (Physical book binding indentation) */}
          <div className="absolute top-0 bottom-0 left-[6px] md:left-[10px] w-[5px] bg-gradient-to-r from-black/80 via-black/30 to-transparent mix-blend-multiply pointer-events-none z-20" />
          <div className="absolute top-0 bottom-0 left-[5px] md:left-[9px] w-[1px] bg-white/40 mix-blend-overlay shadow-[1px_0_3px_rgba(0,0,0,0.8)] pointer-events-none z-20" />

          {/* Outer edge subtle definition */}
          <div className="absolute inset-0 rounded-r-[4px] rounded-l-[1px] border border-white/10 mix-blend-overlay shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] pointer-events-none z-20" />

          {/* Glassmorphism Inline Embossed Border */}
          <div className="absolute inset-2 md:inset-[12px] rounded-sm border-t border-l border-white/40 border-b border-r border-black/40 shadow-[inset_0_0_15px_rgba(255,255,255,0.15)] pointer-events-none z-20 mix-blend-overlay" />
        </div>
      </div>
    </motion.button>
  )
}

export default function PublicProjects() {
  const { items: dbProjects, loading } = useCollection<Project>('projects')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects = useMemo(() => {
    if (loading) return []
    return dbProjects.length > 0 ? dbProjects : MOCK_PROJECTS
  }, [dbProjects, loading])

  const [chunkSize, setChunkSize] = useState(3)

  useEffect(() => {
    const handleResize = () => {
      setChunkSize(window.innerWidth < 768 ? 2 : 3)
    }

    // Set initial size
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Group projects into shelves (rows)
  const rows = useMemo(() => {
    const chunked = []
    for (let i = 0; i < projects.length; i += chunkSize) {
      chunked.push(projects.slice(i, i + chunkSize))
    }
    return chunked
  }, [projects, chunkSize])

  return (
    <section id="projects" className="relative overflow-hidden py-20 md:py-32 bg-[#F9F6F0] dark:bg-[#141316]">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          className="mb-16 text-center md:mb-24"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl font-medium tracking-tight text-charcoal md:text-5xl dark:text-white/90">
            My Project Shelves
          </h2>
          <p className="mt-4 font-body text-base italic text-charcoal/60 dark:text-white/50 max-w-2xl mx-auto">
            Things I built that I didn't f*ck up.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-32 font-body text-sm text-charcoal/40 dark:text-white/40">
            <Icon icon="lucide:loader-2" className="size-6 animate-spin" />
            Dusting off shelves...
          </div>
        ) : (
          <div className="relative flex flex-col gap-y-16 md:gap-y-24">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="relative w-full flex flex-col items-center">

                {/* The Books */}
                <div className="relative z-20 w-full flex flex-wrap justify-center items-end gap-4 sm:gap-10 md:gap-16 pb-0 px-2 md:px-8">
                  {row.map((p, i) => (
                    <BookCard key={p.id} project={p} index={rowIndex * chunkSize + i} onSelect={setSelectedProject} />
                  ))}
                </div>

                {/* Highly Detailed 3D Shelf Structure */}
                <div className="relative z-10 w-[110%] max-w-[1200px] flex flex-col items-center -mt-[8px]">

                  {/* Top Surface of the Shelf (Depth) */}
                  <div
                    className="w-full h-[32px] bg-gradient-to-b from-[#8c5932] to-[#57351c] dark:from-[#312015] dark:to-[#170e08] relative overflow-hidden"
                    style={{ clipPath: 'polygon(3% 0, 97% 0, 100% 100%, 0% 100%)' }}
                  >
                    {/* Shadow cast by books resting on the shelf */}
                    <div className="absolute bottom-0 w-full h-[18px] bg-black/50 blur-[8px]" />
                    {/* Ambient light streak */}
                    <div className="absolute top-0 w-full h-px bg-white/20 blur-[1px]" />
                    {/* Wood grain pattern (Top Surface) */}
                    <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.2) 40px, rgba(0,0,0,0.2) 80px)' }} />
                  </div>

                  {/* Front Edge of the Shelf (Thickness) */}
                  <div className="w-full h-[22px] bg-gradient-to-r from-[#38210f] via-[#5c3a1e] to-[#38210f] dark:from-[#0a0604] dark:via-[#24150b] dark:to-[#0a0604] rounded-b-[4px] shadow-[0_35px_50px_-15px_rgba(0,0,0,0.9)] dark:shadow-[0_45px_65px_-10px_rgba(0,0,0,1)] border-t border-[#a67142]/40 dark:border-white/10 relative overflow-hidden">
                    {/* Edge highlight to separate top depth from front thickness */}
                    <div className="absolute top-[1px] left-0 right-0 h-[1.5px] bg-white/20 mix-blend-overlay" />
                    {/* Wood grain pattern (Front Edge) */}
                    <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.9\\\' numOctaves=\\\'3\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
                  </div>

                </div>

              </div>
            ))}
          </div>
        )}
      </div>

      {/* Book Modal */}
      <BookModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}