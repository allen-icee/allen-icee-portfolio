import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import type { Project } from '../../types'

interface BookModalProps {
  project: Project | null
  onClose: () => void
}

export default function BookModal({ project, onClose }: BookModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  // Handle focus trapping
  useEffect(() => {
    if (project && modalRef.current) {
      modalRef.current.focus()
    }
  }, [project])

  // Prevent background scrolling
  useEffect(() => {
    if (project) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [project])

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative z-10 flex max-h-full w-full max-w-5xl flex-col overflow-hidden rounded-md bg-[#FDFBF7] shadow-2xl outline-none dark:bg-[#1A181E] md:flex-row md:rounded-lg"
            initial={{ scale: 0.95, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.95, y: 20, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-50 flex size-10 items-center justify-center rounded-full bg-black/10 text-charcoal transition-colors hover:bg-black/20 dark:bg-white/10 dark:text-white hover:dark:bg-white/20 md:right-6 md:top-6"
              aria-label="Close modal"
            >
              <Icon icon="lucide:x" className="size-5" />
            </button>

            {/* Left Column / Cover Page */}
            <div className="relative w-full shrink-0 md:w-2/5">
              <div className="absolute inset-0 z-0 hidden border-r border-charcoal/10 bg-black/5 dark:border-white/10 dark:bg-white/5 md:block" />
              
              <div className="relative flex h-64 w-full items-center justify-center overflow-hidden bg-charcoal/10 dark:bg-black/40 md:h-full">
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent md:bg-gradient-to-tr md:from-black/80 md:via-black/40 md:to-transparent" />
                
                <div className="absolute bottom-0 left-0 p-6 md:p-8">
                  <h2
                    id="modal-title"
                    className="font-serif text-3xl font-medium tracking-wide text-white drop-shadow-md md:text-4xl lg:text-5xl"
                  >
                    {project.title}
                  </h2>
                  <p className="mt-2 font-sans text-sm tracking-widest text-white/80 uppercase md:text-base">
                    {project.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column / Content Pages */}
            <div className="flex-1 overflow-y-auto px-6 py-8 md:px-12 md:py-12 custom-scrollbar relative">
              {/* Decorative page lines / manuscript feel */}
              <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 95%, currentColor 95%)', backgroundSize: '100% 2rem' }} />

              <div className="relative z-10 mx-auto max-w-2xl">
                {/* Tech Stack (Bookmarks) */}
                <div className="mb-10 flex flex-wrap gap-3">
                  {project.techStack.map((tech) => (
                    <div
                      key={tech}
                      className="group relative flex items-center gap-2 px-3 py-1.5 font-sans text-xs font-medium uppercase tracking-wider text-charcoal dark:text-white"
                    >
                      {/* Ribbon shape background */}
                      <div className="absolute inset-0 -z-10 bg-purple-brand/20 dark:bg-purple-brand/30 rounded-sm" />
                      <div className="absolute -left-1 top-0 bottom-0 w-2 bg-purple-brand/40 dark:bg-purple-brand/50 rounded-l-sm" />
                      <Icon icon="lucide:tag" className="size-3 opacity-60" />
                      {tech}
                    </div>
                  ))}
                </div>

                {/* Body Content / Chapter */}
                <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none font-body leading-relaxed text-charcoal/80 dark:text-white/80">
                  <p className="first-letter:float-left first-letter:mr-3 first-letter:text-5xl first-letter:font-serif first-letter:font-bold first-letter:text-charcoal dark:first-letter:text-white">
                    {project.description}
                  </p>
                </div>

                {/* Links / Call to Action */}
                <div className="mt-12 mb-4 flex flex-wrap items-center gap-6 border-t border-charcoal/10 pt-8 dark:border-white/10">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 font-serif text-lg italic text-purple-brand transition-colors hover:text-purple-brand/80 dark:text-purple-brand-light dark:hover:text-purple-brand-light/80"
                    >
                      <Icon icon="lucide:external-link" className="size-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                      View Live Site
                    </a>
                  )}
                  {project.githubLink && (
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 font-serif text-lg italic text-charcoal transition-colors hover:text-charcoal/70 dark:text-white/90 dark:hover:text-white/70"
                    >
                      <Icon icon="lucide:github" className="size-5 transition-transform group-hover:scale-110" />
                      Source Code
                    </a>
                  )}
                  {project.figmaUrl && (
                    <a
                      href={project.figmaUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 font-serif text-lg italic text-charcoal transition-colors hover:text-charcoal/70 dark:text-white/90 dark:hover:text-white/70"
                    >
                      <Icon icon="lucide:figma" className="size-5 transition-transform group-hover:scale-110" />
                      Figma Design
                    </a>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
