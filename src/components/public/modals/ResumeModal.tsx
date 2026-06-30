// src/components/public/modals/ResumeModal.tsx
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

  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus()
    }
  }, [isOpen])

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

  const toggleFullscreen = () => setIsFullscreen(!isFullscreen)
  const handlePrint = () => window.open(resumeUrl, '_blank')

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 md:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
        >

          <div
            className="absolute inset-0 bg-neutral-900/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            ref={modalRef}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            aria-labelledby="resume-modal-title"
            className={`relative z-10 flex flex-col overflow-hidden bg-[#EAE5D9] dark:bg-[#1E1E1E] shadow-[0_30px_60px_rgba(0,0,0,0.8)] outline-none ring-1 ring-white/20 transition-all duration-500 ease-in-out ${isFullscreen ? 'h-[100vh] w-[100vw] rounded-none' : 'h-[95vh] max-h-[1000px] w-full max-w-5xl rounded-xl'
              }`}
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >

            <div className="relative z-20 flex flex-none items-center justify-between border-b-4 border-neutral-900/10 dark:border-black/50 bg-[#D4C3A3] dark:bg-[#111] px-4 py-4 md:px-6 shadow-sm">

              <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'3\\\' numOctaves=\\\'2\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />

              <div className="flex items-center gap-4 relative z-10">

                <div className="flex items-center justify-center size-8 rounded-full bg-neutral-800 dark:bg-[#0a0a0a] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)]">
                  <div className="size-2.5 rounded-full bg-[#E84E1B] dark:bg-[#FF4500] shadow-[0_0_8px_#E84E1B] animate-pulse" />
                </div>

                <div>
                  <h2 id="resume-modal-title" className="font-mono text-sm md:text-base font-bold tracking-widest uppercase text-neutral-900 dark:text-white drop-shadow-sm">
                    Allen Icee Dequiros
                  </h2>
                  <p className="font-mono text-[9px] uppercase tracking-widest text-neutral-600 dark:text-neutral-400">
                    Track 2846: Resume
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 md:gap-3 relative z-10">
                <button
                  onClick={handlePrint}
                  className="group flex flex-col items-center gap-1"
                  title="Print Resume"
                >
                  <div className="flex items-center justify-center size-8 md:size-10 rounded-full bg-gradient-to-b from-[#EAE5D9] to-[#D4C3A3] dark:from-[#333] dark:to-[#1a1a1a] shadow-[0_2px_5px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.5)] border border-neutral-400 dark:border-neutral-700 transition-transform active:scale-95 active:shadow-inner">
                    <Icon icon="lucide:printer" className="size-4 text-neutral-800 dark:text-neutral-300 group-hover:text-[#E84E1B]" />
                  </div>
                  <span className="font-mono text-[7px] uppercase tracking-widest text-neutral-600 dark:text-neutral-400">Print</span>
                </button>

                <a
                  href={resumeUrl}
                  download
                  className="group flex flex-col items-center gap-1"
                  title="Download PDF"
                >
                  <div className="flex items-center justify-center size-8 md:size-10 rounded-full bg-gradient-to-b from-[#EAE5D9] to-[#D4C3A3] dark:from-[#333] dark:to-[#1a1a1a] shadow-[0_2px_5px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.5)] border border-neutral-400 dark:border-neutral-700 transition-transform active:scale-95 active:shadow-inner">
                    <Icon icon="lucide:download" className="size-4 text-neutral-800 dark:text-neutral-300 group-hover:text-[#E84E1B]" />
                  </div>
                  <span className="font-mono text-[7px] uppercase tracking-widest text-neutral-600 dark:text-neutral-400">Save</span>
                </a>

                <button
                  onClick={toggleFullscreen}
                  className="hidden md:flex group flex-col items-center gap-1"
                  title="Toggle Fullscreen"
                >
                  <div className="flex items-center justify-center size-10 rounded-full bg-gradient-to-b from-[#EAE5D9] to-[#D4C3A3] dark:from-[#333] dark:to-[#1a1a1a] shadow-[0_2px_5px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.5)] border border-neutral-400 dark:border-neutral-700 transition-transform active:scale-95 active:shadow-inner">
                    <Icon icon={isFullscreen ? "lucide:minimize" : "lucide:maximize"} className="size-4 text-neutral-800 dark:text-neutral-300 group-hover:text-[#E84E1B]" />
                  </div>
                  <span className="font-mono text-[7px] uppercase tracking-widest text-neutral-600 dark:text-neutral-400">Max</span>
                </button>

                <div className="h-8 w-px bg-neutral-400/50 dark:bg-neutral-800 mx-1 shadow-[1px_0_0_rgba(255,255,255,0.1)]" />

                <button
                  onClick={onClose}
                  className="group flex flex-col items-center gap-1"
                  title="Eject / Close"
                >
                  <div className="flex items-center justify-center size-8 md:size-10 rounded-full bg-gradient-to-b from-neutral-200 to-neutral-300 dark:from-neutral-800 dark:to-neutral-900 shadow-[0_2px_5px_rgba(0,0,0,0.3),inset_0_1px_1px_rgba(255,255,255,0.5)] border border-neutral-400 dark:border-black transition-transform active:scale-95 active:shadow-inner">
                    <Icon icon="lucide:power" className="size-4 text-neutral-800 dark:text-neutral-300 group-hover:text-red-500" />
                  </div>
                  <span className="font-mono text-[7px] uppercase tracking-widest text-neutral-600 dark:text-neutral-400">Eject</span>
                </button>
              </div>
            </div>

            <div className="relative z-10 flex flex-1 flex-col bg-[#F9F6F0] dark:bg-[#121212] p-2 md:p-6 shadow-[inset_0_5px_20px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_5px_20px_rgba(0,0,0,0.8)] overflow-hidden">
              <div className="relative z-10 h-full w-full overflow-hidden rounded-sm bg-white shadow-xl ring-1 ring-neutral-200 dark:ring-[#333]">

                <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F9F6F0] dark:bg-[#1a1a1a] p-6 text-center">
                  <div className="relative flex items-center justify-center size-20 rounded-full border border-dashed border-neutral-400 dark:border-neutral-600 mb-6 animate-[spin_10s_linear_infinite]">
                    <Icon icon="lucide:disc" className="size-10 text-neutral-400 dark:text-neutral-600" />
                  </div>
                  <p className="font-mono text-lg uppercase tracking-widest text-neutral-800 dark:text-white/80">Dropping Needle...</p>
                  <p className="mt-2 text-xs font-mono text-neutral-500 dark:text-white/40 uppercase">If track fails, <a href={resumeUrl} download className="text-[#E84E1B] hover:underline">download audio here</a>.</p>
                </div>

                <iframe
                  src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                  title="Resume PDF"
                  className="relative z-10 h-full w-full border-none bg-transparent"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}