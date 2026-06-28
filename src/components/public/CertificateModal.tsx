import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { Icon } from '@iconify/react'

export interface ExtendedCertificate {
  id: string
  title: string
  issuer: string
  date: string
  credentialId?: string
  verificationUrl?: string
  skills: string[]
  category: string
  image: string
  description: string
}

interface CertificateModalProps {
  certificate: ExtendedCertificate | null
  onClose: () => void
  onNext: () => void
  onPrev: () => void
}

export default function CertificateModal({ certificate, onClose, onNext, onPrev }: CertificateModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const imageControls = useAnimation()
  
  // Reset zoom when certificate changes
  useEffect(() => {
    setScale(1)
    imageControls.set({ x: 0, y: 0 })
  }, [certificate, imageControls])

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
    if (certificate && modalRef.current) {
      modalRef.current.focus()
    }
  }, [certificate])

  // Prevent background scrolling
  useEffect(() => {
    if (certificate) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [certificate])

  const handleZoom = (direction: 'in' | 'out') => {
    setScale((prev) => {
      const newScale = direction === 'in' ? prev + 0.5 : prev - 0.5
      return Math.min(Math.max(1, newScale), 3) // Limit zoom between 1x and 3x
    })
  }

  const handleDoubleClick = () => {
    setScale(1)
    imageControls.start({ x: 0, y: 0, transition: { type: 'spring', bounce: 0, duration: 0.4 } })
  }

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 md:p-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Modal Container: Archival Folder Theme */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            className="relative z-10 flex h-full max-h-[90vh] w-full max-w-[95vw] md:max-w-[90vw] lg:max-w-6xl flex-col overflow-hidden rounded-md bg-[#F4EFE6] shadow-[0_20px_50px_rgba(0,0,0,0.5)] outline-none dark:bg-[#1A181E] md:flex-row ring-1 ring-black/10 dark:ring-white/10"
            initial={{ scale: 0.98, opacity: 0, y: 10, rotateX: 5 }}
            animate={{ scale: 1, opacity: 1, y: 0, rotateX: 0 }}
            exit={{ scale: 0.98, opacity: 0, y: 10, rotateX: -5 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{ perspective: '1000px' }}
          >
            {/* Paper Texture Overlay */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-multiply dark:opacity-[0.05] dark:mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.8\\\' numOctaves=\\\'3\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />

            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-50 flex size-10 items-center justify-center rounded-full bg-black/10 text-charcoal backdrop-blur-md transition-colors hover:bg-black/20 dark:bg-white/10 dark:text-white hover:dark:bg-white/20"
              aria-label="Close modal"
            >
              <Icon icon="lucide:x" className="size-5" />
            </button>

            {/* Left Column / Certificate Preview (60%) */}
            <div className="relative flex w-full shrink-0 items-center justify-center overflow-hidden bg-charcoal/5 dark:bg-black/40 md:w-[60%] border-b md:border-b-0 md:border-r border-charcoal/10 dark:border-white/10 p-8 shadow-inner">
              
              {/* Zoom Controls */}
              <div className="absolute bottom-6 left-6 z-40 flex gap-2 rounded-sm border border-charcoal/10 bg-warm-paper/90 p-1.5 shadow-sm backdrop-blur-md dark:border-white/10 dark:bg-[#1A181E]/90">
                <button onClick={() => handleZoom('out')} className="p-1 text-charcoal/60 hover:text-charcoal dark:text-white/60 dark:hover:text-white" disabled={scale <= 1}>
                  <Icon icon="lucide:zoom-out" className="size-4" />
                </button>
                <div className="w-px bg-charcoal/10 dark:bg-white/10" />
                <button onClick={() => handleZoom('in')} className="p-1 text-charcoal/60 hover:text-charcoal dark:text-white/60 dark:hover:text-white" disabled={scale >= 3}>
                  <Icon icon="lucide:zoom-in" className="size-4" />
                </button>
                <div className="w-px bg-charcoal/10 dark:bg-white/10" />
                <button onClick={handleDoubleClick} className="p-1 text-charcoal/60 hover:text-charcoal dark:text-white/60 dark:hover:text-white" title="Reset Zoom">
                  <Icon icon="lucide:maximize" className="size-4" />
                </button>
              </div>

              {/* Download Original Button */}
              <div className="absolute bottom-6 right-6 z-40">
                <a
                  href={certificate.image}
                  download
                  className="flex items-center gap-2 rounded-sm border border-charcoal/10 bg-warm-paper/90 px-3 py-2 text-xs font-medium text-charcoal shadow-sm backdrop-blur-md transition-colors hover:bg-white dark:border-white/10 dark:bg-[#1A181E]/90 dark:text-white dark:hover:bg-[#2A282E]"
                >
                  <Icon icon="lucide:download" className="size-3.5" />
                  Download Original
                </a>
              </div>

              {/* The Image Container */}
              <motion.div
                className="relative h-full w-full cursor-grab active:cursor-grabbing flex items-center justify-center p-4"
                drag={scale > 1}
                dragConstraints={{ top: -300 * (scale - 1), bottom: 300 * (scale - 1), left: -300 * (scale - 1), right: 300 * (scale - 1) }}
                dragElastic={0.1}
                onDoubleClick={handleDoubleClick}
              >
                {/* Certificate Border / Matting to look like it's mounted */}
                <div className="relative p-2 bg-white shadow-[0_4px_15px_rgba(0,0,0,0.1)] ring-1 ring-black/5 dark:bg-[#EAE5D9] dark:shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                  <motion.img
                    animate={imageControls}
                    style={{ scale }}
                    src={certificate.image}
                    alt={certificate.title}
                    className="max-h-full max-w-full object-contain pointer-events-none ring-1 ring-charcoal/10"
                    transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Right Column / Content Pages (40%) */}
            <div className="relative flex w-full flex-col overflow-y-auto px-8 py-10 md:w-[40%] md:px-10 md:py-12 custom-scrollbar bg-[#FDFBF7] dark:bg-[#151417]">
              
              <div className="relative z-10 flex flex-1 flex-col">
                
                {/* Category Badge */}
                <div className="mb-4">
                  <span className="inline-flex items-center gap-1.5 rounded-sm bg-charcoal/5 px-2.5 py-1 font-sans text-[9px] font-semibold tracking-[0.2em] uppercase text-charcoal/60 dark:bg-white/5 dark:text-white/60">
                    <Icon icon="lucide:folder-open" className="size-3" />
                    {certificate.category}
                  </span>
                </div>

                <h2 id="modal-title" className="font-serif text-2xl md:text-3xl font-medium tracking-tight text-charcoal dark:text-white/90">
                  {certificate.title}
                </h2>
                
                <div className="mt-6 space-y-4">
                  {/* Organization & Date */}
                  <div className="flex flex-col gap-1 border-b border-charcoal/10 pb-4 dark:border-white/10">
                    <p className="font-sans text-xs uppercase tracking-widest text-charcoal/50 dark:text-white/50">Issuing Organization</p>
                    <p className="font-serif text-lg text-charcoal dark:text-white/90">{certificate.issuer}</p>
                  </div>
                  
                  <div className="flex flex-col gap-1 border-b border-charcoal/10 pb-4 dark:border-white/10">
                    <p className="font-sans text-xs uppercase tracking-widest text-charcoal/50 dark:text-white/50">Issue Date</p>
                    <p className="font-serif text-lg text-charcoal dark:text-white/90">{certificate.date}</p>
                  </div>

                  {certificate.credentialId && (
                    <div className="flex flex-col gap-1 border-b border-charcoal/10 pb-4 dark:border-white/10">
                      <p className="font-sans text-xs uppercase tracking-widest text-charcoal/50 dark:text-white/50">Credential ID</p>
                      <p className="font-mono text-sm text-charcoal/80 dark:text-white/80">{certificate.credentialId}</p>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div className="mt-6">
                  <p className="font-body text-sm leading-relaxed text-charcoal/80 dark:text-white/70">
                    {certificate.description}
                  </p>
                </div>

                {/* Skills Acquired */}
                <div className="mt-8">
                  <p className="mb-3 font-sans text-xs uppercase tracking-widest text-charcoal/50 dark:text-white/50">Skills Acquired</p>
                  <div className="flex flex-wrap gap-2">
                    {certificate.skills.map((skill) => (
                      <span key={skill} className="rounded-sm border border-charcoal/10 bg-white px-2.5 py-1 font-sans text-[10px] text-charcoal/70 shadow-sm dark:border-white/10 dark:bg-black/20 dark:text-white/70">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Verification Link */}
                <div className="mt-12 mb-4">
                  {certificate.verificationUrl ? (
                    <a
                      href={certificate.verificationUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex w-full items-center justify-center gap-2 rounded-sm border border-purple-brand/30 bg-purple-brand/5 px-4 py-3 font-serif text-sm font-medium text-purple-brand transition-colors hover:bg-purple-brand/10 dark:border-purple-brand-light/30 dark:text-purple-brand-light dark:hover:bg-purple-brand-light/10"
                    >
                      <Icon icon="lucide:shield-check" className="size-4" />
                      Verify Credential
                      <Icon icon="lucide:arrow-up-right" className="size-3.5 opacity-50 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  ) : (
                    <div className="flex w-full items-center justify-center gap-2 rounded-sm border border-charcoal/10 bg-charcoal/5 px-4 py-3 font-serif text-sm text-charcoal/50 dark:border-white/10 dark:bg-white/5 dark:text-white/50">
                      <Icon icon="lucide:file-badge-2" className="size-4" />
                      Archived Record
                    </div>
                  )}
                </div>

                {/* Navigation */}
                <div className="mt-auto pt-4 flex justify-between border-t border-charcoal/10 dark:border-white/10">
                  <button
                    onClick={onPrev}
                    className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-charcoal/60 hover:text-charcoal dark:text-white/60 dark:hover:text-white transition-colors"
                  >
                    <Icon icon="lucide:arrow-left" className="size-3" /> Prev
                  </button>
                  <button
                    onClick={onNext}
                    className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-charcoal/60 hover:text-charcoal dark:text-white/60 dark:hover:text-white transition-colors"
                  >
                    Next <Icon icon="lucide:arrow-right" className="size-3" />
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
