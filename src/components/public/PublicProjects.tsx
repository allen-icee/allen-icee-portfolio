import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useCollection } from '../../hooks/useCollection'
import type { Project } from '../../types'

function BookCard({ project, index }: { project: Project; index: number }) {
  const navigate = useNavigate()
  const handleClick = useCallback(() => {
    navigate(`/project/${project.id}`)
  }, [navigate, project.id])

  return (
    <motion.button
      className="group relative flex w-56 shrink-0 snap-start flex-col overflow-hidden rounded-r-md rounded-l-sm bg-[#FDFBF7] text-left shadow-[4px_0_12px_rgba(0,0,0,0.15)] transition-all duration-300 hover:-translate-y-4 hover:shadow-[8px_12px_20px_rgba(0,0,0,0.2)] dark:bg-[#1E1C22] dark:shadow-[4px_0_12px_rgba(0,0,0,0.6)] md:w-64"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
      onClick={handleClick}
      aria-label={`View project: ${project.title}`}
    >
      {/* 3D Book spine (left side) */}
      <span
        className="pointer-events-none absolute bottom-0 left-0 top-0 z-20 w-3 rounded-l-sm bg-gradient-to-r from-black/40 via-black/10 to-transparent dark:from-black/60 dark:via-black/20"
        aria-hidden
      />

      {/* Book Cover Container */}
      <div className="relative flex aspect-[2/3] w-full items-end overflow-hidden bg-charcoal/5 dark:bg-black/20">
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
          style={{ backgroundImage: `url(${project.coverImage})` }}
        />
        {/* Ornate border on cover */}
        <div className="pointer-events-none absolute inset-2 rounded-sm border border-white/20 dark:border-white/10" />

        {/* Gradient overlay for title readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 transition-opacity duration-300 group-hover:opacity-80" />
        
        {/* Title Area */}
        <div className="relative z-10 w-full px-5 pb-5">
          <h3 className="font-serif text-lg font-medium leading-snug text-[#F9F6F0] md:text-xl drop-shadow-md">
            {project.title}
          </h3>
          <p className="mt-1 font-sans text-[10px] tracking-widest uppercase text-white/60">
            Vol. {index + 1}
          </p>
        </div>
      </div>

      {/* Book Back / Info Panel (simulates back cover or interior flap) */}
      <div className="flex flex-1 flex-col justify-between border-t border-charcoal/10 p-5 dark:border-white/10">
        <div>
          <p className="font-body text-sm leading-relaxed text-charcoal/70 line-clamp-3 dark:text-white/70">
            {project.tagline}
          </p>
        </div>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="rounded-sm bg-purple-brand/10 px-2 py-0.5 font-sans text-[9px] font-medium tracking-wide text-purple-brand/80 dark:bg-purple-brand/20 dark:text-purple-brand/70"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="rounded-sm bg-charcoal/5 px-2 py-0.5 font-sans text-[9px] text-charcoal/40 dark:bg-white/5 dark:text-white/40">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  )
}

export default function PublicProjects() {
  const { items: projects, loading } = useCollection<Project>('projects')

  return (
    <section id="projects" className="relative overflow-hidden bg-warm-paper py-20 dark:bg-surface md:py-32">
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
            <div className="flex flex-col gap-6 md:hidden">
              {projects.map((p, i) => (
                <BookCard key={p.id} project={p} index={i} />
              ))}
            </div>

            {/* Desktop Layout: Horizontal shelf */}
            <div className="hidden md:block">
              {/* Scroll Container */}
              <div className="relative z-10 flex snap-x snap-mandatory gap-8 overflow-x-auto px-8 pb-10 pt-4" style={{ scrollbarWidth: 'none' }}>
                {projects.map((p, i) => (
                  <BookCard key={p.id} project={p} index={i} />
                ))}
              </div>

              {/* The Physical Wooden Shelf */}
              <div className="absolute bottom-6 left-0 right-0 z-0 h-8 rounded-sm bg-gradient-to-b from-[#5c3a21] to-[#3e2413] shadow-[0_15px_30px_rgba(0,0,0,0.5)] dark:from-[#2A1D15] dark:to-[#170E09] dark:shadow-[0_20px_40px_rgba(0,0,0,0.8)] md:h-10">
                {/* Shelf edge highlight */}
                <div className="h-px w-full bg-white/10" />
                {/* Wood grain subtle overlay */}
                <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.9\\\' numOctaves=\\\'2\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
              </div>

              {/* Bookends (Left and Right) */}
              <div className="absolute bottom-6 left-2 z-20 h-32 w-4 rounded-t-lg bg-gradient-to-r from-charcoal to-[#222] shadow-[4px_0_10px_rgba(0,0,0,0.3)] dark:from-[#111] dark:to-black" />
              <div className="absolute bottom-6 right-2 z-20 h-32 w-4 rounded-t-lg bg-gradient-to-l from-charcoal to-[#222] shadow-[-4px_0_10px_rgba(0,0,0,0.3)] dark:from-[#111] dark:to-black" />
              
              <div className="mt-8 flex items-center justify-center gap-2">
                <Icon icon="lucide:arrow-left-right" className="size-3 text-charcoal/30 dark:text-white/30" />
                <p className="font-sans text-[10px] tracking-widest uppercase text-charcoal/40 dark:text-white/40">
                  Scroll to browse
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
