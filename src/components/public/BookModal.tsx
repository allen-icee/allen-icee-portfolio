import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import type { Project } from '../../types'
import ImageViewer from './ImageViewer'

interface BookModalProps {
  project: Project | null
  onClose: () => void
}

export default function BookModal({ project, onClose }: BookModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  const images = project ? (project.images && project.images.length > 0 ? project.images : [project.coverImage]) : []

  // Reset active image when project changes
  useEffect(() => {
    setActiveImageIndex(0)
  }, [project])

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && viewerIndex === null) onClose()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, viewerIndex])

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
    <>
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
              onClick={() => { if (viewerIndex === null) onClose() }}
              aria-hidden="true"
            />

            {/* Modal Container */}
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-title"
              className="relative z-10 flex max-h-full w-full max-w-6xl flex-col overflow-hidden rounded-md bg-[#FDFBF7] shadow-2xl outline-none dark:bg-[#1A181E] md:flex-row md:rounded-lg"
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

              {/* Left Column / Gallery */}
              <div className="relative w-full shrink-0 md:w-[45%] lg:w-[40%] flex flex-col bg-[#F5F3EC] dark:bg-[#121114] border-r border-charcoal/10 dark:border-white/10">
                {/* Header for mobile */}
                <div className="md:hidden p-6 pb-2">
                   <h2
                    id="modal-title"
                    className="font-serif text-2xl font-medium tracking-wide text-charcoal dark:text-white"
                  >
                    {project.title}
                  </h2>
                </div>
                
                <div className="flex-1 overflow-hidden p-6 md:p-8 flex flex-col">
                  {/* Main Image Container */}
                  <div className="flex-1 flex flex-col justify-center min-h-0">
                    <div className="relative group w-full h-full shadow-lg rounded-2xl bg-black/5 dark:bg-white/5">
                      <button
                        type="button"
                        onClick={() => setViewerIndex(activeImageIndex)}
                        className="block w-full h-full"
                        aria-label="Open image viewer"
                      >
                        <img
                          src={images[activeImageIndex]}
                          alt={`${project.title} screenshot ${activeImageIndex + 1}`}
                          className="h-full w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-[1.01]"
                        />
                      </button>

                      {/* Overlaid Previous/Next Buttons */}
                      {images.length > 1 && (
                        <>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length);
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full bg-white/80 text-charcoal shadow-md backdrop-blur transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-purple-brand/20 opacity-0 group-hover:opacity-100"
                            aria-label="Previous image"
                          >
                            <Icon icon="mdi:chevron-left" className="size-6" />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveImageIndex((prev) => (prev + 1) % images.length);
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full bg-white/80 text-charcoal shadow-md backdrop-blur transition hover:bg-white focus:outline-none focus:ring-4 focus:ring-purple-brand/20 opacity-0 group-hover:opacity-100"
                            aria-label="Next image"
                          >
                            <Icon icon="mdi:chevron-right" className="size-6" />
                          </button>
                        </>
                      )}

                      {/* Fullscreen Button */}
                      {/* Fullscreen Button */}
                      <button
                        type="button"
                        onClick={() => setViewerIndex(activeImageIndex)}
                        className="absolute bottom-4 right-4 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] transition-transform hover:scale-110 focus:outline-none focus:text-purple-brand opacity-80 hover:opacity-100"
                        aria-label="Open image viewer"
                        title="Open image viewer"
                      >
                        <Icon icon="lucide:maximize" className="size-7" />
                      </button>
                    </div>
                  </div>

                  {/* Thumbnail Strip */}
                  {images.length > 1 && (
                    <div className="mt-4 flex gap-3 overflow-x-auto pb-2 custom-scrollbar shrink-0">
                      {images.map((image, index) => (
                        <button
                          type="button"
                          key={`${image}-${index}`}
                          onClick={() => setActiveImageIndex(index)}
                          className={`h-20 w-20 shrink-0 overflow-hidden rounded-xl border-2 transition-all ${
                            activeImageIndex === index 
                              ? "border-purple-brand shadow-md scale-100" 
                              : "border-transparent opacity-60 hover:opacity-100 hover:scale-105"
                          }`}
                        >
                          <img src={image} alt={`Thumbnail ${index + 1}`} className="h-full w-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column / Content Pages (Original layout and styling) */}
              <div className="flex-1 overflow-y-auto px-6 py-10 md:px-14 md:py-16 custom-scrollbar relative bg-[#FDFBF7] dark:bg-[#1A181E]">
                
                {/* Book Gutter Shadow (Inner spine fold) */}
                <div className="absolute inset-y-0 left-0 w-10 md:w-16 bg-gradient-to-r from-charcoal/10 via-charcoal/5 dark:from-black/60 dark:via-black/20 to-transparent pointer-events-none z-10" />
                
                {/* Decorative page lines / manuscript feel */}
                <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 95%, currentColor 95%)', backgroundSize: '100% 2rem' }} />

                <div className="relative z-10 mx-auto max-w-2xl">
                  {/* Desktop Title */}
                  <div className="hidden md:block mb-10">
                    <p className="mb-3 font-sans text-[10px] font-bold tracking-[0.3em] text-purple-brand uppercase">
                      {project.tagline}
                    </p>
                    <h2 className="font-serif text-5xl leading-[1.1] font-medium tracking-tight text-charcoal dark:text-white">
                      {project.title}
                    </h2>
                  </div>

                  {/* Tech Stack (Bookmarks) */}
                  <div className="mb-12 flex flex-wrap gap-2.5">
                    {project.techStack.map((tech) => (
                      <div
                        key={tech}
                        className="group relative flex items-center gap-2 px-4 py-1.5 font-sans text-[10px] font-bold uppercase tracking-widest text-charcoal dark:text-white/90 border border-charcoal/10 dark:border-white/10 rounded-full bg-white/50 dark:bg-white/5 shadow-sm transition-transform hover:-translate-y-0.5"
                      >
                        <Icon icon="lucide:tag" className="size-3 opacity-50" />
                        {tech}
                      </div>
                    ))}
                  </div>

                  {/* Body Content / Chapter */}
                  <div className="prose prose-sm md:prose-base dark:prose-invert max-w-none font-body leading-[1.8] text-charcoal/80 dark:text-white/80 whitespace-pre-wrap">
                    <p className="first-letter:float-left first-letter:mr-4 first-letter:mt-1 first-letter:text-7xl first-letter:font-serif first-letter:font-bold first-letter:text-purple-brand dark:first-letter:text-purple-brand-light">
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

      {/* Image Viewer */}
      {viewerIndex !== null && project && (
        <ImageViewer
          images={images}
          initialIndex={viewerIndex}
          onClose={() => setViewerIndex(null)}
        />
      )}
    </>
  )
}
