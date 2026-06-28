import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Icon } from '@iconify/react'
import type { Artwork } from '../../types'

interface ArtModalProps {
  artwork: Artwork | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function ArtModal({ artwork, onClose, onNext, onPrev }: ArtModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const imageControls = useAnimation()
  
  // Reset zoom when artwork changes
  useEffect(() => {
    setScale(1)
    imageControls.set({ x: 0, y: 0 })
  }, [artwork, imageControls])

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight') onNext()
      if (e.key === 'ArrowLeft') onPrev()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, onNext, onPrev])

  // Handle focus trapping
  useEffect(() => {
    if (artwork && modalRef.current) {
      modalRef.current.focus()
    }
  }, [artwork])

  // Prevent background scrolling
  useEffect(() => {
    if (artwork) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [artwork])

  const handleZoom = (direction: 'in' | 'out') => {
    setScale((prev) => {
      const newScale = direction === 'in' ? prev + 0.5 : prev - 0.5
      return Math.min(Math.max(1, newScale), 4) // Limit zoom between 1x and 4x
    })
  }

  const handleDoubleClick = () => {
    setScale(1)
    imageControls.start({ x: 0, y: 0, transition: { type: 'spring', bounce: 0, duration: 0.4 } })
  }

  return (
    <AnimatePresence>
      {artwork && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
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
            className="relative z-10 flex h-full max-h-[90vh] w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-7xl flex-col overflow-hidden rounded-xl bg-warm-paper shadow-2xl outline-none dark:bg-[#1A181E] md:flex-row"
            initial={{ scale: 0.98, opacity: 0, y: 10 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 10 }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-50 flex size-10 items-center justify-center rounded-full bg-black/10 text-charcoal transition-colors hover:bg-black/20 dark:bg-white/10 dark:text-white hover:dark:bg-white/20"
              aria-label="Close modal"
            >
              <Icon icon="lucide:x" className="size-5" />
            </button>

            {/* Navigation Arrows */}
            <button
              onClick={onPrev}
              className="absolute left-4 top-1/2 z-50 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/50 text-charcoal shadow-md backdrop-blur-sm transition-transform hover:scale-110 dark:bg-black/50 dark:text-white"
              aria-label="Previous artwork"
            >
              <Icon icon="lucide:chevron-left" className="size-5" />
            </button>
            <button
              onClick={onNext}
              className="absolute right-4 top-1/2 z-50 -translate-y-1/2 flex size-10 items-center justify-center rounded-full bg-white/50 text-charcoal shadow-md backdrop-blur-sm transition-transform hover:scale-110 dark:bg-black/50 dark:text-white md:hidden" // Right arrow hidden on desktop if it overlaps content, but keeping it visible might be good. We'll show it.
              aria-label="Next artwork"
            >
              <Icon icon="lucide:chevron-right" className="size-5" />
            </button>

            {/* Left Column / Image Viewer (65%) */}
            <div className="relative flex w-full shrink-0 items-center justify-center overflow-hidden bg-charcoal/5 dark:bg-black/40 md:w-[65%]">
              
              {/* Zoom Controls */}
              <div className="absolute bottom-6 right-6 z-40 flex gap-2 rounded-full bg-white/80 p-2 shadow-sm backdrop-blur-sm dark:bg-black/80">
                <button onClick={() => handleZoom('out')} className="p-1 text-charcoal/70 hover:text-charcoal dark:text-white/70 dark:hover:text-white" disabled={scale <= 1}>
                  <Icon icon="lucide:zoom-out" className="size-5" />
                </button>
                <div className="w-px bg-charcoal/20 dark:bg-white/20" />
                <button onClick={() => handleZoom('in')} className="p-1 text-charcoal/70 hover:text-charcoal dark:text-white/70 dark:hover:text-white" disabled={scale >= 4}>
                  <Icon icon="lucide:zoom-in" className="size-5" />
                </button>
                <div className="w-px bg-charcoal/20 dark:bg-white/20" />
                <button onClick={handleDoubleClick} className="p-1 text-charcoal/70 hover:text-charcoal dark:text-white/70 dark:hover:text-white">
                  <Icon icon="lucide:maximize" className="size-5" />
                </button>
              </div>

              {/* The Image Container */}
              <motion.div
                className="relative h-full w-full cursor-grab active:cursor-grabbing"
                drag={scale > 1}
                dragConstraints={{ top: -500 * (scale - 1), bottom: 500 * (scale - 1), left: -500 * (scale - 1), right: 500 * (scale - 1) }}
                dragElastic={0.1}
                onDoubleClick={handleDoubleClick}
              >
                <motion.img
                  animate={imageControls}
                  style={{ scale }}
                  src={artwork.imageURL}
                  alt={artwork.title}
                  className="h-full w-full object-contain pointer-events-none" // prevent browser drag
                  transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                />
              </motion.div>
            </div>

            {/* Right Column / Content Pages (35%) */}
            <div className="relative flex w-full flex-col overflow-y-auto px-8 py-10 md:w-[35%] md:px-10 md:py-12 custom-scrollbar border-l border-charcoal/10 dark:border-white/10">
              
              {/* Decorative paper texture */}
              <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] mix-blend-overlay dark:opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'1\\\' numOctaves=\\\'2\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />

              <div className="relative z-10 flex flex-1 flex-col">
                <h2 id="modal-title" className="font-serif text-3xl font-medium tracking-wide text-charcoal dark:text-white/90">
                  {artwork.title}
                </h2>
                
                <div className="mt-3 flex items-center gap-3">
                  <span className="flex items-center gap-1.5 rounded-full bg-purple-brand/10 px-3 py-1 font-sans text-[10px] font-semibold tracking-widest uppercase text-purple-brand/90 dark:bg-purple-brand/20 dark:text-purple-brand-light">
                    <Icon icon="lucide:palette" className="size-3" />
                    {artwork.medium}
                  </span>
                  <span className="font-sans text-xs tracking-widest text-charcoal/50 dark:text-white/50 uppercase">
                    {new Date(artwork.createdAt).getFullYear()}
                  </span>
                </div>

                <div className="my-8 flex items-center justify-center opacity-30">
                  <div className="h-px w-12 bg-charcoal dark:bg-white" />
                  <Icon icon="lucide:feather" className="mx-4 size-4 text-charcoal dark:text-white" />
                  <div className="h-px w-12 bg-charcoal dark:bg-white" />
                </div>

                <div className="prose prose-sm prose-charcoal md:prose-base dark:prose-invert max-w-none font-body leading-relaxed text-charcoal/80 dark:text-white/80">
                  <p className="first-letter:float-left first-letter:mr-2 first-letter:text-4xl first-letter:font-serif first-letter:text-purple-brand dark:first-letter:text-purple-brand-light">
                    {artwork.story}
                  </p>
                </div>

                <div className="mt-auto pt-10">
                  {/* Desktop Next button positioned at bottom of text area to avoid overlapping image */}
                  <button
                    onClick={onNext}
                    className="hidden group w-full md:flex items-center justify-between rounded-md border border-charcoal/10 px-4 py-3 text-sm font-medium text-charcoal transition-all hover:bg-charcoal/5 dark:border-white/10 dark:text-white/80 dark:hover:bg-white/5"
                  >
                    <span>Next Artwork</span>
                    <Icon icon="lucide:arrow-right" className="size-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
