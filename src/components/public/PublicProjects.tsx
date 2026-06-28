import { useState, useCallback } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useCollection } from '../../hooks/useCollection'
import type { Project } from '../../types'
import BookModal from './BookModal'

function BookCard({ project, index, onSelect }: { project: Project; index: number; onSelect: (p: Project) => void }) {
  const handleClick = useCallback(() => {
    onSelect(project)
  }, [onSelect, project])

  return (
    <motion.button
      className="group relative flex w-56 shrink-0 snap-start flex-col overflow-visible text-left transition-all duration-500 md:w-64"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      onClick={handleClick}
      aria-label={`Open project book: ${project.title}`}
      whileHover={{ 
        y: -12, 
        x: -4, 
        rotateY: -5,
        rotateX: 2,
        scale: 1.02,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      style={{ perspective: '1000px' }}
    >
      <div className="relative flex h-full w-full flex-col rounded-r-md rounded-l-sm bg-[#FDFBF7] shadow-[6px_8px_16px_rgba(0,0,0,0.2)] transition-shadow duration-500 group-hover:shadow-[12px_20px_24px_rgba(0,0,0,0.3)] dark:bg-[#1E1C22] dark:shadow-[6px_8px_16px_rgba(0,0,0,0.6)] dark:group-hover:shadow-[12px_20px_24px_rgba(0,0,0,0.8)] z-10 group-hover:z-20">
        
        {/* 3D Book spine (left side) */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 top-0 z-30 w-5 rounded-l-sm bg-gradient-to-r from-black/60 via-black/20 to-transparent dark:from-black/80 dark:via-black/30"
          aria-hidden
        />
        {/* Spine Texture (canvas/cloth feel) */}
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-30 w-5 rounded-l-sm mix-blend-overlay opacity-30" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'1.5\\\' numOctaves=\\\'3\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />

        {/* 3D Page edges (right side) */}
        <div className="pointer-events-none absolute top-1 bottom-1 -right-[3px] z-0 w-[3px] bg-[#E8E4D9] rounded-r-sm shadow-inner dark:bg-[#2A282E]" aria-hidden>
          {/* Subtle page lines */}
          <div className="h-full w-full opacity-30" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 1px, rgba(0,0,0,0.1) 1px, rgba(0,0,0,0.1) 2px)' }} />
        </div>

        {/* Book Cover Container */}
        <div className="relative flex aspect-[2/3] w-full items-end overflow-hidden rounded-tr-md bg-charcoal/5 dark:bg-black/20">
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.coverImage})` }}
          />
          {/* Ornate border on cover to look like embossed hardback */}
          <div className="pointer-events-none absolute inset-3 rounded-sm border-[1.5px] border-white/30 mix-blend-overlay shadow-[inset_0_0_10px_rgba(0,0,0,0.2)] dark:border-white/20" />
          
          {/* Gradient overlay for title readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300" />
          
          {/* Title Area */}
          <div className="relative z-10 w-full px-5 pb-6">
            <h3 className="font-serif text-lg font-medium leading-snug text-[#F9F6F0] md:text-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]">
              {project.title}
            </h3>
            <div className="mt-2 h-px w-12 bg-purple-brand/50" />
            <p className="mt-2 font-sans text-[10px] tracking-widest uppercase text-white/70">
              Vol. {index + 1}
            </p>
          </div>
        </div>

        {/* Book Back / Info Panel */}
        <div className="flex flex-1 flex-col justify-between border-t border-charcoal/10 rounded-br-md bg-warm-paper p-5 dark:border-white/10 dark:bg-[#1E1C22]">
          <div>
            <p className="font-body text-sm leading-relaxed text-charcoal/70 line-clamp-3 dark:text-white/70">
              {project.tagline}
            </p>
          </div>
          {/* Tech stack bookmark ribbon indicator */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            <Icon icon="lucide:bookmark" className="size-3.5 text-purple-brand opacity-70" />
            <span className="font-sans text-[9px] font-medium tracking-wide text-charcoal/60 dark:text-white/50 uppercase">
              {project.techStack.length} Technologies Used
            </span>
          </div>
        </div>
      </div>
    </motion.button>
  )
}

export default function PublicProjects() {
  const { items: projects, loading } = useCollection<Project>('projects')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  return (
    <section id="projects" className="relative overflow-hidden py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          className="mb-16 text-center md:mb-20"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl font-medium tracking-tight text-charcoal md:text-4xl dark:text-white/90">
            The Library Shelves
          </h2>
          <p className="mt-3 font-body text-sm italic text-charcoal/60 dark:text-white/50">
            Browse the tomes of recent endeavors.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-20 font-body text-sm text-charcoal/40 dark:text-white/40">
            <Icon icon="lucide:loader-2" className="size-5 animate-spin" />
            Dusting off shelves...
          </div>
        ) : (
          <div className="relative">
            {/* Mobile layout */}
            <div className="flex flex-col items-center gap-10 md:hidden pb-12">
              {projects.map((p, i) => (
                <BookCard key={p.id} project={p} index={i} onSelect={setSelectedProject} />
              ))}
              <div className="w-full h-4 rounded-sm bg-gradient-to-b from-[#5c3a21] to-[#3e2413] shadow-[0_10px_20px_rgba(0,0,0,0.3)] dark:from-[#2A1D15] dark:to-[#170E09]">
                <div className="h-px w-full bg-white/10" />
              </div>
            </div>

            {/* Desktop Layout: Horizontal shelf */}
            <div className="hidden md:block">
              {/* Scroll Container */}
              <div className="relative z-10 flex snap-x snap-mandatory gap-8 overflow-x-auto px-12 pb-14 pt-10" style={{ scrollbarWidth: 'none' }}>
                {projects.map((p, i) => (
                  <BookCard key={p.id} project={p} index={i} onSelect={setSelectedProject} />
                ))}
                
                {/* A decorative leaning book or bookend spacer could go here to show depth */}
                <div className="w-8 shrink-0" aria-hidden="true" />
              </div>

              {/* The Physical Wooden Shelf */}
              <div className="absolute bottom-6 left-0 right-0 z-0 h-10 rounded-sm bg-gradient-to-b from-[#5c3a21] to-[#3e2413] shadow-[0_20px_40px_rgba(0,0,0,0.6)] dark:from-[#2A1D15] dark:to-[#170E09] dark:shadow-[0_20px_40px_rgba(0,0,0,0.8)]">
                {/* Shelf edge highlight */}
                <div className="h-px w-full bg-white/10" />
                {/* Wood grain subtle overlay */}
                <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay dark:opacity-[0.08]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.9\\\' numOctaves=\\\'2\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
                
                {/* Subtle Dust Particles & Fibers */}
                <div className="absolute -top-10 left-1/4 h-2 w-2 rounded-full bg-white/20 blur-[1px] shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
                <div className="absolute -top-6 right-1/3 h-1 w-1 rounded-full bg-white/20 blur-[1px]" />
                <div className="absolute top-0 right-1/4 h-[2px] w-6 -rotate-12 bg-[#8c7a6b] opacity-30 rounded-full" /> {/* Dried lavender stalk feeling */}
              </div>

              {/* Bookends (Left and Right) */}
              <div className="absolute bottom-6 left-2 z-20 h-32 w-5 rounded-t-lg bg-gradient-to-r from-[#2a2a2a] to-[#1a1a1a] shadow-[6px_0_12px_rgba(0,0,0,0.4)] dark:from-[#111] dark:to-black">
                {/* Gold detailing on bookend */}
                <div className="absolute top-4 left-1 right-1 h-px bg-yellow-600/30" />
                <div className="absolute top-6 left-1 right-1 h-px bg-yellow-600/30" />
              </div>
              <div className="absolute bottom-6 right-2 z-20 h-32 w-5 rounded-t-lg bg-gradient-to-l from-[#2a2a2a] to-[#1a1a1a] shadow-[-6px_0_12px_rgba(0,0,0,0.4)] dark:from-[#111] dark:to-black">
                <div className="absolute top-4 left-1 right-1 h-px bg-yellow-600/30" />
                <div className="absolute top-6 left-1 right-1 h-px bg-yellow-600/30" />
              </div>
              
              <div className="mt-10 flex items-center justify-center gap-2">
                <Icon icon="lucide:mouse" className="size-3 text-charcoal/30 dark:text-white/30 animate-bounce" />
                <p className="font-sans text-[10px] tracking-widest uppercase text-charcoal/40 dark:text-white/40">
                  Scroll or swipe to explore the collection
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Book Modal */}
      <BookModal project={selectedProject} onClose={() => setSelectedProject(null)} />
    </section>
  )
}
