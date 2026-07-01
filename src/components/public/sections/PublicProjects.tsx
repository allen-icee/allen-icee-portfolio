// src/components/public/sections/PublicProjects.tsx
import { useState, useCallback, useMemo, useEffect, memo, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { Fireflies, FloatingPetal } from '../../ui/Particles'
import { Icon } from '@iconify/react'
import { useCollection } from '../../../hooks/useCollection'
import type { MockProject as Project } from '../../../types'
import { MOCK_PROJECTS } from '../../../data/projectsData'

const BookModal = lazy(() => import('../modals/BookModal'))


const BookCard = memo(function BookCard({ project, index, onSelect }: { project: Project; index: number; onSelect: (p: Project) => void }) {
  const handleClick = useCallback(() => {
    onSelect(project)
  }, [onSelect, project])

  const [mainTitle, subTitle] = project.title.includes(':')
    ? project.title.split(':')
    : [project.title, null]

  return (
    <motion.button
      className="group relative flex w-36 h-52 sm:w-56 sm:h-[320px] md:w-64 md:h-[360px] shrink-0 flex-col overflow-visible text-left transition-all duration-500 z-10 hover:z-50 focus:outline-none"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.1, ease: 'easeOut' }}
      onClick={handleClick}
      aria-label={`Open project book: ${project.title}`}
      whileHover={{
        y: -20,
        scale: 1.05,
        transition: { duration: 0.3, ease: 'easeOut' }
      }}
      style={{ perspective: '1200px' }}
    >
      <div className="absolute -bottom-4 left-4 right-0 h-6 bg-black/40 blur-[10px] rounded-[100%] transition-opacity duration-300 group-hover:opacity-60" />

      <div
        className="relative flex h-full w-full flex-col rounded-r-[4px] rounded-l-sm bg-white shadow-xl transition-all duration-500 group-hover:shadow-2xl dark:shadow-[8px_12px_20px_rgba(0,0,0,0.8)]"
        style={{
          transformStyle: 'preserve-3d',
          transform: 'rotateY(-15deg) rotateX(5deg)',
        }}
      >

        <div
          className="absolute top-0 bottom-0 left-0 w-8 origin-right bg-[#e4e4e7] dark:bg-[#d4d4d8] rounded-l-sm border-r border-black/5 flex items-center justify-between py-6 overflow-hidden shadow-[inset_-2px_0_5px_rgba(0,0,0,0.1)]"
          style={{ transform: 'rotateY(-90deg) translateX(-100%)', transformOrigin: 'left' }}
        >
          <span className="text-gray-400 text-[9px] uppercase tracking-[0.3em] font-bold whitespace-nowrap -rotate-90">
            Vol. {index + 1}
          </span>
          <span className="text-[#0f172a] text-[10px] font-serif font-black tracking-widest whitespace-nowrap -rotate-90 uppercase truncate w-[200px] text-center">
            {mainTitle}
          </span>
        </div>

        <div
          className="absolute top-[2px] bottom-[2px] right-0 w-6 origin-left bg-[#E8E4D9] dark:bg-[#c4bfae] shadow-inner rounded-r-[3px] overflow-hidden"
          style={{ transform: 'rotateY(90deg) translateX(100%)', transformOrigin: 'right' }}
        >
          <div className="h-full w-full opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(to bottom, transparent, transparent 1px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0.15) 2px)' }} />
        </div>

        <div
          className="absolute top-0 left-[1px] right-[1px] h-2 origin-bottom bg-[#E8E4D9] dark:bg-[#c4bfae] shadow-inner"
          style={{ transform: 'rotateX(90deg) translateY(-100%)', transformOrigin: 'top' }}
        >
          <div className="h-full w-full opacity-50" style={{ backgroundImage: 'repeating-linear-gradient(to right, transparent, transparent 1px, rgba(0,0,0,0.15) 1px, rgba(0,0,0,0.15) 2px)' }} />
        </div>

        <div
          className="relative flex h-full w-full flex-col overflow-hidden rounded-r-[4px] rounded-l-[1px] bg-charcoal border border-black/5"
          style={{ transform: 'translateZ(1px)' }}
        >
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
            style={{ backgroundImage: `url(${project.coverImage})` }}
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/10 opacity-90 transition-opacity duration-300 group-hover:opacity-70" />

          <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-6 z-10 text-[#FDFBF7]">

            <div className="flex justify-between items-start w-full">
              <span className="font-sans text-[9px] tracking-[0.25em] font-medium uppercase text-white/80">
                Vol. {String(index + 1).padStart(2, '0')}
              </span>
              <div className="flex flex-col items-center justify-center border border-white/20 px-1.5 py-1 backdrop-blur-sm bg-black/10">
                <img src="/logo/logo.svg" alt="AID" className="h-3 w-auto mb-0.5 opacity-80 brightness-0 invert" />
                <span className="font-mono text-[5px] tracking-[0.2em] text-white/60 uppercase">
                  AID
                </span>
              </div>
            </div>

            <div className="mb-1">
              <h3 className="font-serif text-lg sm:text-2xl md:text-[28px] leading-[1.05] font-normal tracking-[-0.01em] text-white/95 drop-shadow-md">
                {mainTitle}
              </h3>

              {subTitle && (
                <h4 className="font-serif text-[10px] sm:text-[12px] md:text-[13px] text-white/70 mt-1.5 sm:mt-2.5 leading-snug drop-shadow-sm font-light">
                  {subTitle.trim()}
                </h4>
              )}

              <div className="w-8 sm:w-10 h-px bg-white/40 my-2 sm:my-4" />

              <p className="font-sans text-[7px] sm:text-[8px] md:text-[9px] tracking-[0.15em] uppercase text-white/60 font-semibold leading-relaxed max-w-[90%]">
                {project.tagline}
              </p>
            </div>
          </div>

          <div className="absolute top-0 bottom-0 left-[6px] md:left-[10px] w-[5px] bg-gradient-to-r from-black/80 via-black/30 to-transparent mix-blend-multiply pointer-events-none z-20" />
          <div className="absolute top-0 bottom-0 left-[5px] md:left-[9px] w-[1px] bg-white/40 mix-blend-overlay shadow-[1px_0_3px_rgba(0,0,0,0.8)] pointer-events-none z-20" />

          <div className="absolute inset-0 rounded-r-[4px] rounded-l-[1px] border border-white/10 mix-blend-overlay shadow-[inset_0_0_15px_rgba(0,0,0,0.4)] pointer-events-none z-20" />

          <div className="absolute inset-2 md:inset-[12px] rounded-sm border-t border-l border-white/40 border-b border-r border-black/40 shadow-[inset_0_0_15px_rgba(255,255,255,0.15)] pointer-events-none z-20 mix-blend-overlay" />
        </div>
      </div>
    </motion.button>
  )
})

export default function PublicProjects() {
  const { items: dbProjects, loading } = useCollection<Project>('projects')
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)

  const projects = useMemo(() => {
    if (loading) return []
    const baseProjects = dbProjects.length > 0 ? dbProjects : MOCK_PROJECTS
    return [...baseProjects].sort((a, b) => a.title.localeCompare(b.title))
  }, [dbProjects, loading])

  const [chunkSize, setChunkSize] = useState(3)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      setChunkSize(mobile ? 2 : 3)
    }

    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const rows = useMemo(() => {
    const chunked = []
    for (let i = 0; i < projects.length; i += chunkSize) {
      chunked.push(projects.slice(i, i + chunkSize))
    }
    return chunked
  }, [projects, chunkSize])

  const visibleRows = useMemo(() => {
    if (isExpanded || !isMobile) return rows
    return rows.slice(0, 2) // Show only 2 rows (4 projects) on mobile initially
  }, [rows, isExpanded, isMobile])

  return (
    <section id="projects" className="relative overflow-hidden py-24 md:py-32 bg-transparent section-pattern-dots transition-colors duration-500">
      <Fireflies count={15} />
      <FloatingPetal petalIndex={3} className="top-[15%] left-[10%] w-5 md:w-8" duration={15} delay={1} opacity={0.4} />
      <FloatingPetal petalIndex={1} className="bottom-[25%] right-[5%] w-6 md:w-10" duration={18} delay={3} opacity={0.3} />

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <motion.div
          className="mb-8 text-center md:mb-12"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-charcoal dark:text-white/90 drop-shadow-sm mb-4">
            My Project Shelves
          </h2>
          <p className="font-sans text-xs md:text-sm tracking-widest uppercase text-purple-brand dark:text-purple-brand/90">
            Things I built that made me look productive
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-32 font-body text-sm text-charcoal/40 dark:text-white/40">
            <Icon icon="lucide:loader-2" className="size-6 animate-spin" />
            Dusting off shelves...
          </div>
        ) : (
          <div className="relative flex flex-col gap-y-16 md:gap-y-24">
            {visibleRows.map((row, rowIndex) => (
              <div key={rowIndex} className="relative w-full flex flex-col items-center">

                <div className="relative z-20 w-full flex flex-wrap justify-center items-end gap-4 sm:gap-10 md:gap-16 pb-0 px-2 md:px-8">
                  {row.map((p: any, i: any) => (
                    <BookCard key={p.id} project={p} index={rowIndex * chunkSize + i} onSelect={setSelectedProject} />
                  ))}
                </div>

                <div className="relative z-10 w-[110%] max-w-[1200px] flex flex-col items-center -mt-[8px]">

                  <div
                    className="w-full h-[32px] bg-gradient-to-b from-[#8c5932] to-[#57351c] dark:from-[#312015] dark:to-[#170e08] relative overflow-hidden"
                    style={{ clipPath: 'polygon(3% 0, 97% 0, 100% 100%, 0% 100%)' }}
                  >

                    <div className="absolute bottom-0 w-full h-[18px] bg-black/50 blur-[8px]" />

                    <div className="absolute top-0 w-full h-px bg-white/20 blur-[1px]" />

                    <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(0,0,0,0.2) 40px, rgba(0,0,0,0.2) 80px)' }} />
                  </div>

                  <div className="w-full h-[22px] bg-gradient-to-r from-[#38210f] via-[#5c3a1e] to-[#38210f] dark:from-[#0a0604] dark:via-[#24150b] dark:to-[#0a0604] rounded-b-[4px] shadow-[0_35px_50px_-15px_rgba(0,0,0,0.9)] dark:shadow-[0_45px_65px_-10px_rgba(0,0,0,1)] border-t border-[#a67142]/40 dark:border-white/10 relative overflow-hidden">

                    <div className="absolute top-[1px] left-0 right-0 h-[1.5px] bg-white/20 mix-blend-overlay" />

                    <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.9\\\' numOctaves=\\\'3\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
                  </div>

                </div>

              </div>
            ))}

            {isMobile && rows.length > 2 && (
              <div className="mt-8 flex justify-center w-full relative z-20">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="group flex items-center gap-3 px-6 py-3 rounded-full border border-purple-brand/30 dark:border-lavender/30 bg-white/5 dark:bg-black/20 backdrop-blur-sm text-purple-brand dark:text-lavender hover:bg-purple-brand/10 dark:hover:bg-lavender/10 transition-all duration-300"
                >
                  <span className="font-mono text-[10px] uppercase tracking-widest font-bold">
                    {isExpanded ? "Close Projects" : "Browse More Projects"}
                  </span>
                  <Icon icon={isExpanded ? "lucide:chevron-up" : "lucide:chevron-down"} className="size-4 group-hover:translate-y-0.5 transition-transform" />
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      <Suspense fallback={null}>
        <BookModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      </Suspense>
    </section>
  )
}