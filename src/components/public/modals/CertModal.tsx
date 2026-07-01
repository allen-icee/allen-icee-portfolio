// src/components/public/modals/CertModal.tsx
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import type { Certificate } from '../../../types'

interface CertModalProps {
  certificate: Certificate | null
  onClose: () => void
}

export default function CertModal({ certificate, onClose }: CertModalProps) {
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
    if (certificate) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [certificate])

  return (
    <>
      <AnimatePresence>
        {certificate && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >

            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => { if (!isFullscreen) onClose() }}
              aria-hidden="true"
            />

            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby="cert-modal-title"
              data-lenis-prevent="true"
              className="relative z-10 flex max-h-[95svh] md:max-h-[95svh] w-full max-w-6xl flex-col overflow-y-auto md:overflow-hidden rounded-xl md:rounded-lg bg-[#FDFBF7] shadow-2xl outline-none dark:bg-[#1A181E] md:flex-row [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
              initial={{ scale: 0.95, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, y: 20, opacity: 0 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >

              <button
                onClick={onClose}
                className="absolute right-4 top-4 z-50 flex size-10 items-center justify-center rounded-full bg-black/10 text-charcoal transition-colors hover:bg-black/20 dark:bg-white/10 dark:text-white hover:dark:bg-white/20 md:right-6 md:top-6"
                aria-label="Close modal"
              >
                <Icon icon="lucide:x" className="size-5" />
              </button>

              <div className="relative w-full shrink-0 md:w-[45%] lg:w-[50%] flex flex-col bg-[#F5F3EC] dark:bg-[#121114] border-r border-charcoal/10 dark:border-white/10">

                <div className="md:hidden p-6 pb-2">
                  <h2
                    id="cert-modal-title"
                    className="font-serif text-xl md:text-2xl font-medium tracking-wide text-charcoal dark:text-white leading-tight"
                  >
                    {certificate.title}
                  </h2>
                </div>

                <div className="md:flex-1 md:overflow-hidden p-6 md:p-10 flex flex-col items-center justify-center">
                  <div className="relative group w-full max-w-md mx-auto shadow-xl rounded-sm md:rounded-md bg-black/5 dark:bg-white/5 border-[4px] md:border-[8px] border-white dark:border-[#222]">
                    <button
                      type="button"
                      onClick={() => setIsFullscreen(true)}
                      className="block w-full h-full cursor-zoom-in"
                      aria-label="View full certificate"
                    >
                      <img
                        src={certificate.image}
                        alt={`${certificate.title} Certificate`}
                        className="h-auto w-full object-contain transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </button>

                    <button
                      type="button"
                      onClick={() => setIsFullscreen(true)}
                      className="absolute bottom-4 right-4 text-charcoal/80 dark:text-white/80 hover:text-charcoal dark:hover:text-white drop-shadow-md transition hover:scale-110 focus:outline-none opacity-0 group-hover:opacity-100 p-2"
                      aria-label="Fullscreen image"
                    >
                      <Icon icon="lucide:maximize" className="size-6" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="md:flex-1 md:overflow-y-auto px-6 py-10 md:px-14 md:py-16 relative bg-[#FDFBF7] dark:bg-[#1A181E] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

                <div className="absolute inset-y-0 left-0 w-10 md:w-16 bg-gradient-to-r from-charcoal/10 via-charcoal/5 dark:from-black/60 dark:via-black/20 to-transparent pointer-events-none z-10" />

                <div className="pointer-events-none absolute inset-0 z-0 opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'linear-gradient(to bottom, transparent 95%, currentColor 95%)', backgroundSize: '100% 2rem' }} />

                <div className="relative z-10 mx-auto max-w-xl h-full flex flex-col justify-center">

                  <div className="hidden md:block mb-10">
                    <p className="mb-3 font-sans text-[10px] font-bold tracking-[0.3em] text-[#9A7BCA] uppercase">
                      Certificate of Completion
                    </p>
                    <h2 className="font-serif text-3xl lg:text-5xl leading-[1.1] font-medium tracking-tight text-charcoal dark:text-white">
                      {certificate.title}
                    </h2>
                  </div>

                  {certificate.category && (
                    <div className="mb-8 md:mb-12 flex flex-wrap gap-2.5">
                      <div className="group relative flex items-center gap-1.5 md:gap-2 px-3 py-1 md:px-4 md:py-1.5 font-sans text-[9px] md:text-[10px] font-bold uppercase tracking-widest text-charcoal dark:text-white/90 border border-charcoal/10 dark:border-white/10 rounded-full bg-white/50 dark:bg-white/5 shadow-sm">
                        <Icon icon="lucide:award" className="size-3 text-[#9A7BCA]" />
                        {certificate.category}
                      </div>
                    </div>
                  )}

                  <div className="flex flex-col gap-4 md:gap-8">
                    <div>
                      <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40 dark:text-white/40 mb-2">
                        Issuing Organization
                      </p>
                      <p className="font-serif text-base md:text-2xl text-charcoal/90 dark:text-white/90">
                        {certificate.issuer}
                      </p>
                    </div>

                    <div>
                      <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-charcoal/40 dark:text-white/40 mb-1.5 md:mb-2">
                        Issue Date
                      </p>
                      <p className="font-serif text-base md:text-2xl text-charcoal/90 dark:text-white/90">
                        {certificate.date}
                      </p>
                    </div>

                    {certificate.endDate && (
                      <div>
                        <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-charcoal/40 dark:text-white/40 mb-1.5 md:mb-2">
                          Expiration Date
                        </p>
                        <p className="font-serif text-base md:text-2xl text-charcoal/90 dark:text-white/90">
                          {certificate.endDate}
                        </p>
                      </div>
                    )}

                    {certificate.credentialId && (
                      <div>
                        <p className="font-sans text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-charcoal/40 dark:text-white/40 mb-1.5 md:mb-2">
                          Credential ID
                        </p>
                        <p className="font-mono text-[11px] md:text-base text-charcoal/70 dark:text-white/60 tracking-wider bg-black/5 dark:bg-white/5 inline-block px-2.5 py-1 md:px-3 md:py-1.5 rounded-sm border border-black/10 dark:border-white/10 shadow-inner">
                          {certificate.credentialId}
                        </p>
                      </div>
                    )}
                  </div>

                  {certificate.verificationUrl && (
                    <div className="mt-12 md:mt-16 pt-8 border-t border-charcoal/10 dark:border-white/10">
                      <a
                        href={certificate.verificationUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 rounded-full bg-[#9A7BCA]/10 dark:bg-[#9A7BCA]/20 border border-[#9A7BCA]/30 dark:border-[#9A7BCA]/40 font-mono text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-[#9A7BCA] transition-all hover:bg-[#9A7BCA] hover:text-white dark:hover:text-white shadow-sm hover:shadow-[0_0_20px_rgba(154,123,202,0.4)] hover:-translate-y-0.5"
                      >
                        <Icon icon="lucide:shield-check" className="size-4 md:size-5 transition-transform group-hover:scale-110" />
                        Verify Credential
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isFullscreen && certificate && (
          <motion.div
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsFullscreen(false)}
          >
            <button
              className="absolute right-6 top-6 text-white/50 hover:text-white transition-colors p-2"
              onClick={() => setIsFullscreen(false)}
              aria-label="Close fullscreen"
            >
              <Icon icon="lucide:x" className="size-8" />
            </button>

            <img
              src={certificate.image}
              alt={certificate.title}
              className="max-w-full max-h-full object-contain shadow-2xl rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}