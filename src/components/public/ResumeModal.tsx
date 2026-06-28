import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

interface ResumeModalProps {
  isOpen: boolean
  onClose: () => void
  resumeUrl: string
}

export default function ResumeModal({ isOpen, onClose, resumeUrl }: ResumeModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isFullscreen) {
          setIsFullscreen(false)
        } else {
          onClose()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, isFullscreen])

  // Handle focus trapping
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

  // Prevent background scrolling
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const handlePrint = () => {
    // Open the PDF in a new tab to trigger print
    window.open(resumeUrl, '_blank')
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8"
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

          {/* Modal Container: Leather Folder Theme */}
          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            className={`relative z-10 flex flex-col overflow-hidden rounded-xl bg-[#2A1D15] shadow-[0_30px_60px_rgba(0,0,0,0.8)] outline-none ring-1 ring-white/10 transition-all duration-500 ease-in-out ${
              isFullscreen ? 'h-[100vh] w-[100vw] rounded-none' : 'h-[95vh] max-h-[1000px] w-full max-w-5xl'
            }`}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Leather Texture Overlay */}
            <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.6\\\' numOctaves=\\\'4\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />

            {/* Folder Header / Toolbar */}
            <div className="relative z-20 flex flex-none items-center justify-between border-b border-white/5 bg-[#170E09]/80 px-4 py-3 backdrop-blur-md md:px-6">
              <div className="flex items-center gap-3">
                <Icon icon="lucide:file-text" className="size-5 text-[#D4C3A3]" />
                <h2 id="resume-modal-title" className="font-serif text-lg font-medium tracking-wide text-[#D4C3A3] drop-shadow-sm">
                  Curriculum Vitae
                </h2>
                <span className="hidden rounded-sm bg-white/5 px-2 py-0.5 font-sans text-[10px] uppercase tracking-widest text-white/40 md:inline-block">
                  Confidential
                </span>
              </div>

              <div className="flex items-center gap-2 md:gap-4">
                <button
                  onClick={handlePrint}
                  className="flex items-center justify-center rounded-sm p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-[#D4C3A3]"
                  title="Print Resume"
                >
                  <Icon icon="lucide:printer" className="size-4.5" />
                </button>
                <a
                  href={resumeUrl}
                  download
                  className="flex items-center justify-center rounded-sm p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-[#D4C3A3]"
                  title="Download PDF"
                >
                  <Icon icon="lucide:download" className="size-4.5" />
                </a>
                <button
                  onClick={toggleFullscreen}
                  className="hidden items-center justify-center rounded-sm p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-[#D4C3A3] md:flex"
                  title="Toggle Fullscreen"
                >
                  <Icon icon={isFullscreen ? "lucide:minimize" : "lucide:maximize"} className="size-4.5" />
                </button>
                <div className="h-6 w-px bg-white/10" />
                <button
                  onClick={onClose}
                  className="flex items-center justify-center rounded-sm p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
                  title="Close folder"
                >
                  <Icon icon="lucide:x" className="size-5" />
                </button>
              </div>
            </div>

            {/* Folder Body / PDF Viewer Area */}
            <div className="relative z-10 flex flex-1 flex-col bg-[#EAE5D9] p-2 dark:bg-[#222] md:p-6 shadow-inner overflow-hidden">
              {/* Paper Texture behind PDF */}
              <div className="pointer-events-none absolute inset-0 z-0 opacity-50 mix-blend-multiply dark:opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'1\\\' numOctaves=\\\'2\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
              
              <div className="relative z-10 h-full w-full overflow-hidden rounded-sm bg-white shadow-[0_5px_15px_rgba(0,0,0,0.2)] ring-1 ring-black/5 dark:bg-[#1a1a1a] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                {/* Fallback overlay in case PDF fails to load or while loading */}
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-warm-paper dark:bg-[#1a1a1a] p-6 text-center">
                  <Icon icon="lucide:file-text" className="mb-4 size-16 text-charcoal/20 dark:text-white/10" />
                  <p className="font-serif text-lg text-charcoal/60 dark:text-white/50">Viewing Document...</p>
                  <p className="mt-2 text-sm text-charcoal/40 dark:text-white/40">If the document doesn't load, you can <a href={resumeUrl} download className="underline hover:text-purple-brand">download it here</a>.</p>
                </div>

                {/* The embedded PDF */}
                <iframe
                  src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  title="Resume PDF"
                  className="relative z-10 h-full w-full border-none bg-transparent"
                  loading="lazy"
                />
              </div>
            </div>
            
            {/* Folder Decorative Details */}
            {/* Bookmark ribbon hanging from top */}
            <div className="absolute right-12 top-0 z-30 h-16 w-4 bg-purple-brand shadow-sm dark:bg-[#6B4C9A]" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)' }} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
