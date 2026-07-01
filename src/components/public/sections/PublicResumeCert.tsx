// src/components/public/sections/PublicResumeCert.tsx
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { Fireflies, FloatingPetal } from '../../ui/Particles'
import ResumeModal from '../modals/ResumeModal'
import CertModal from '../modals/CertModal'
import { Logo } from '../../ui/Logo'
import { certificates as mockCertificates } from '../../../data/certificatesData'
import { useCollection } from '../../../hooks/useCollection'
import type { Certificate } from '../../../types'
import { ref, getDownloadURL } from 'firebase/storage'
import { storage } from '../../../services/firebaseConfig'




export default function PublicResumeCert() {
  const { items: dbCerts } = useCollection<Certificate>('certificates')
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null)
  const [isResumeOpen, setIsResumeOpen] = useState(false)
  const [resumeUrl, setResumeUrl] = useState<string>('/placeholder-resume.pdf')
  
  const audioRef = useRef<HTMLAudioElement>(null)
  const [isHovered, setIsHovered] = useState(false)
  const [currentTrack, setCurrentTrack] = useState<string>('/audio/jazz.mp3')

  const TRACKS = [
    '/audio/ambient.mp3',
    '/audio/cute.mp3',
    '/audio/funky.mp3',
    '/audio/jazz.mp3',
    '/audio/jpop.mp3'
  ]

  const playRandomTrack = () => {
    const randomTrack = TRACKS[Math.floor(Math.random() * TRACKS.length)]
    setCurrentTrack(randomTrack)
    setIsHovered(true)
  }

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3 // Lower the volume to 30%
      if (isHovered || isResumeOpen) {
        audioRef.current.play().catch(e => console.log('Audio autoplay prevented:', e))
      } else {
        audioRef.current.pause()
      }
    }
  }, [isHovered, isResumeOpen, currentTrack])

  useEffect(() => {
    getDownloadURL(ref(storage, 'images/resume.pdf'))
      .then(url => setResumeUrl(url))
      .catch(() => setResumeUrl('/placeholder-resume.pdf'))
  }, [])

  const dbCertsSorted = [...dbCerts].sort((a, b) => a.title.localeCompare(b.title))
  const mockCertsSorted = [...mockCertificates].sort((a, b) => a.title.localeCompare(b.title))
  const certificates = dbCerts.length > 0 ? dbCertsSorted : mockCertsSorted

  return (
    <>
      <section id="resume" className="relative overflow-hidden py-16 md:py-20 bg-transparent section-pattern-dots transition-colors duration-500">

        <Fireflies count={15} />
        <FloatingPetal petalIndex={1} className="top-[10%] left-[8%] w-6 md:w-10" duration={12} delay={0} opacity={0.4} />
        <FloatingPetal petalIndex={3} className="bottom-[20%] right-[12%] w-5 md:w-8" duration={16} delay={4} opacity={0.3} />

        <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">

          <motion.div
            className="mb-8 md:mb-12 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-charcoal dark:text-white/90 drop-shadow-sm mb-4">
              My Resume & Certifications
            </h2>
            <p className="font-sans text-xs md:text-sm tracking-widest uppercase text-purple-brand dark:text-purple-brand/90">
              The boring, formal stuff you actually came here for.
            </p>
          </motion.div>

          <div className="flex flex-col gap-12 md:gap-16">

            <div>
              <motion.div
                className="relative mx-auto w-full max-w-[280px] sm:max-w-[320px] md:max-w-[360px]"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div 
                  className="relative overflow-visible group"
                  onMouseEnter={playRandomTrack}
                  onMouseLeave={() => setIsHovered(false)}
                >

                  <div 
                    onClick={() => setIsResumeOpen(true)}
                    role="button"
                    tabIndex={0}
                    className="absolute top-[2%] bottom-[2%] right-0 aspect-square rounded-full bg-[#111] dark:bg-black shadow-2xl transition-transform duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] group-hover:translate-x-[40%] md:group-hover:translate-x-[50%] flex items-center justify-center border border-white/10 z-0 cursor-pointer"
                  >

                    <div className="w-full h-full rounded-full relative flex items-center justify-center group-hover:animate-[spin_4s_linear_infinite]">

                      <div className="absolute inset-1 rounded-full border border-white/5" />
                      <div className="absolute inset-3 rounded-full border border-white/5" />
                      <div className="absolute inset-6 rounded-full border border-white/5" />
                      <div className="absolute inset-10 rounded-full border border-white/5" />
                      <div className="absolute inset-14 rounded-full border border-white/5" />
                      <div className="absolute inset-0 rounded-full opacity-40 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.1)_45deg,transparent_90deg,transparent_180deg,rgba(255,255,255,0.1)_225deg,transparent_270deg)]" />

                      <div className="w-[35%] aspect-square rounded-full bg-[#6B4C9A] dark:bg-[#4C3B73] border-[3px] border-[#111] dark:border-black flex items-center justify-center shadow-inner relative z-10 overflow-hidden">

                        <Logo className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-auto text-[#FDFBF7] opacity-80 drop-shadow-md z-10" />

                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#111] dark:bg-[#F9F6F0] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] z-30" />
                      </div>
                    </div>
                  </div>

                  <div className="relative z-10 overflow-hidden rounded-sm bg-[#EAE5D9] dark:bg-[#1E1E1E] p-5 sm:p-6 md:p-8 shadow-[-10px_0_20px_rgba(0,0,0,0.1)] dark:shadow-[8px_0_30px_rgba(0,0,0,0.9)] border border-[#D4C3A3] dark:border-[#333] aspect-square flex flex-col justify-between transition-colors duration-300">

                    <div className="absolute inset-0 flex items-center justify-center opacity-[0.08] dark:opacity-[0.12] pointer-events-none z-0">
                      <Logo className="w-[60%] h-auto text-neutral-900 dark:text-[#FDFBF7]" />
                    </div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] aspect-square rounded-full border-[8px] border-black/5 dark:border-white/[0.03] blur-[4px] pointer-events-none z-10" />

                    <div className="relative z-20 flex justify-between items-start">
                      <div>
                        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-neutral-900 dark:text-[#FDFBF7] drop-shadow-sm leading-none transition-colors">
                          Resume
                        </h3>
                        <p className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-[#E84E1B] dark:text-[#FF7A50] mt-2 font-bold transition-colors">
                          Allen Icee Dequiros
                        </p>
                      </div>

                      <a
                        href={resumeUrl}
                        download
                        className="group relative z-30 flex items-center justify-center size-14 sm:size-16 md:size-20 bg-gradient-to-br from-[#FFD166] to-[#F4A261] dark:from-[#FFB703] dark:to-[#FB8500] text-neutral-900 font-black font-sans text-[11px] sm:text-[12px] md:text-[14px] uppercase tracking-tighter leading-none drop-shadow-xl rotate-12 transition-all hover:scale-110 hover:rotate-0 overflow-hidden"
                        style={{ clipPath: 'polygon(50% 0%, 60.3% 15.6%, 75% 6.7%, 78.1% 23.4%, 93.3% 25%, 86.6% 40.3%, 100% 50%, 86.6% 59.7%, 93.3% 75%, 78.1% 76.6%, 75% 93.3%, 60.3% 84.4%, 50% 100%, 39.7% 84.4%, 25% 93.3%, 21.9% 76.6%, 6.7% 75%, 13.4% 59.7%, 0% 50%, 13.4% 40.3%, 6.7% 25%, 21.9% 23.4%, 25% 6.7%, 39.7% 15.6%)' }}
                        title="Download Document"
                      >

                        <div className="absolute top-0 bottom-0 left-0 w-8 bg-white/50 -skew-x-[20deg] blur-[2px] animate-[slide-shine_3s_ease-in-out_infinite] pointer-events-none" />
                        <style>{`
                          @keyframes slide-shine {
                            0% { transform: translateX(-400%); }
                            20% { transform: translateX(400%); }
                            100% { transform: translateX(400%); }
                          }
                        `}</style>

                        <span className="text-center block transform -rotate-12 group-hover:rotate-0 transition-transform">
                          Get<br />It!
                        </span>
                      </a>
                    </div>

                    <div className="relative z-20 flex items-end justify-between mt-8">
                      <div className="font-mono text-[7px] sm:text-[8px] uppercase tracking-widest text-neutral-800/50 dark:text-white/40 space-y-1 transition-colors">
                        <p>STEREO LP</p>
                        <p>33 ⅓ RPM</p>
                        <p>⊂⁠(⁠≽^•⩊•^≼⁠)⁠つ</p>
                      </div>

                      <button
                        onClick={() => setIsResumeOpen(true)}
                        className="group/btn flex items-center justify-center size-10 sm:size-12 md:size-14 rounded-full border-2 border-neutral-900/80 dark:border-[#FDFBF7]/70 bg-transparent transition-all hover:bg-neutral-900 dark:hover:bg-[#FDFBF7] hover:scale-105 shadow-md"
                        title="Play / View Record"
                      >
                        <Icon icon="lucide:play" className="size-4 sm:size-5 text-neutral-900/80 dark:text-[#FDFBF7]/70 group-hover/btn:text-[#FDFBF7] dark:group-hover/btn:text-neutral-900 ml-0.5 sm:ml-1 transition-colors" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="w-full flex justify-center opacity-20 dark:opacity-10 py-2">
              <div className="h-px w-full max-w-2xl bg-charcoal dark:bg-white" />
            </div>

            <div className="grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-3">
              {certificates.map((cert, i) => (
                <motion.button
                  key={cert.id}
                  onClick={() => setSelectedCertIndex(i)}
                  className="group relative flex h-48 md:h-64 w-full flex-col overflow-hidden rounded-sm bg-[#121212] text-left outline-none border border-[#333] transition-all duration-300 hover:border-[#6B4C9A] hover:shadow-[0_10px_30px_rgba(76,59,115,0.2)] hover:-translate-y-1"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >

                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105 opacity-60 mix-blend-luminosity group-hover:opacity-100 group-hover:mix-blend-normal"
                    style={{ backgroundImage: `url(${cert.image})` }}
                  />

                  <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/50 to-black/20 transition-opacity duration-300 group-hover:from-black/90 group-hover:via-black/40" />

                  <div className="absolute inset-0 flex flex-col justify-between p-4 md:p-5 z-10 text-white">
                    <div>
                      <div className="flex flex-col md:flex-row md:justify-between items-start w-full mb-3 gap-1 md:gap-0">
                        <span className="font-mono text-[8px] md:text-[10px] uppercase tracking-[0.2em] text-[#9A7BCA] bg-black/40 px-1.5 py-0.5 rounded-sm backdrop-blur-sm border border-[#9A7BCA]/30 max-w-full truncate">
                          {cert.issuer}
                        </span>
                        <span className="font-mono text-[8px] md:text-[10px] text-white/50">
                          {cert.date}
                        </span>
                      </div>

                      <h4 className="font-serif text-sm md:text-lg font-medium leading-snug text-white/95 drop-shadow-md">
                        {cert.title}
                      </h4>
                    </div>

                    <div className="font-mono text-[8px] md:text-[9px] uppercase tracking-[0.3em] text-white/30 group-hover:text-white/80 transition-colors w-full text-center mb-1">
                      &lt; VERIFY &gt;
                    </div>
                  </div>

                  <div className="absolute inset-2 md:inset-2.5 rounded-sm border-t border-l border-white/30 border-b border-r border-black/60 shadow-[inset_0_0_15px_rgba(255,255,255,0.1)] pointer-events-none z-20 mix-blend-overlay" />
                </motion.button>
              ))}
            </div>

          </div>
        </div>
      </section>

      <CertModal
        certificate={selectedCertIndex !== null ? certificates[selectedCertIndex] : null}
        onClose={() => setSelectedCertIndex(null)}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        resumeUrl={resumeUrl}
      />

      <audio ref={audioRef} src={currentTrack} loop />
    </>
  )
}