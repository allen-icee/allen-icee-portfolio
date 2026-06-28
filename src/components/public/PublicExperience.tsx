import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useCollection } from '../../hooks/useCollection'
import { mockExperiences } from '../../utils/mockData'
import type { Experience } from '../../types'

function ArchiveCard({ exp, index }: { exp: Experience & { id: string }; index: number }) {
  const archiveNum = `ARC-${(index + 1).toString().padStart(3, '0')}`

  return (
    <motion.div
      className="relative w-full max-w-3xl mx-auto cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: Math.min(index * 0.1, 0.5) }}
      whileHover="hover"
    >
      {/* Folder Base (Back Layer) */}
      <motion.div 
        className="absolute inset-0 top-8 bg-[#D2BBA0] dark:bg-[#2C211D] rounded-b-xl rounded-tr-xl shadow-[0_8px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.4)] border border-white/20 dark:border-white/5" 
        variants={{ hover: { y: -4, transition: { duration: 0.4, ease: 'easeOut' } } }}
      />
      {/* Folder Tab */}
      <motion.div 
        className="absolute top-0 left-0 h-8 w-36 bg-[#D2BBA0] dark:bg-[#2C211D] rounded-t-lg flex items-center px-4 border-t border-l border-white/20 dark:border-white/5"
        variants={{ hover: { y: -4, transition: { duration: 0.4, ease: 'easeOut' } } }}
      >
        <span className="font-mono text-[10px] font-bold tracking-[0.2em] uppercase text-[#5C3A21] dark:text-[#EAE0D5] opacity-70">
          {archiveNum}
        </span>
      </motion.div>

      {/* The Paper Insert */}
      <motion.div 
        className="relative z-10 mx-2 md:mx-6 mt-10 mb-8 bg-[#FDFBF7] dark:bg-[#22201F] rounded-sm p-6 md:p-10 shadow-[0_4px_12px_rgba(0,0,0,0.1)] dark:shadow-[0_4px_12px_rgba(0,0,0,0.6)]"
        variants={{ hover: { y: -16, transition: { duration: 0.4, ease: 'easeOut' } } }}
      >
        {/* Paper texture / rules */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_31px,#e5e7eb_31px,#e5e7eb_32px)] opacity-50 dark:bg-[repeating-linear-gradient(transparent,transparent_31px,#ffffff10_31px,#ffffff10_32px)]" style={{ backgroundPositionY: '2.5rem' }} />
        
        {/* Faded Stamp */}
        <div className="absolute top-6 right-6 rotate-12 border-2 border-red-500/20 text-red-500/20 px-3 py-1 font-sans text-xs font-bold tracking-widest uppercase rounded-sm pointer-events-none">
          Preserved
        </div>

        {/* Paper Clip */}
        <Icon icon="lucide:paperclip" className="absolute -top-3 left-10 size-8 text-gray-400 dark:text-gray-500 -rotate-12 drop-shadow-sm" />

        <div className="relative z-10">
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-6 border-b border-charcoal/10 dark:border-white/10 pb-4">
            <div>
              <h3 className="font-serif text-2xl font-bold text-charcoal dark:text-[#EAE0D5]">
                {exp.role}
              </h3>
              <p className="font-sans text-sm font-semibold tracking-widest uppercase text-purple-brand/80 dark:text-lavender mt-1">
                {exp.company}
              </p>
            </div>
            <div className="mt-3 md:mt-0 font-mono text-xs text-charcoal/50 dark:text-[#EAE0D5]/50 border border-charcoal/10 dark:border-white/10 px-2 py-1 rounded-sm bg-charcoal/[0.02] dark:bg-white/[0.02]">
              {exp.timeline.start} – {exp.timeline.end ?? 'Present'}
            </div>
          </div>

          <p className="font-body text-sm md:text-base leading-relaxed text-charcoal/80 dark:text-[#EAE0D5]/80 mb-8" style={{ fontFamily: '"Courier New", Courier, monospace' }}>
            {exp.description}
          </p>

          {exp.technologies && exp.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-sm bg-[#EAE0D5] dark:bg-[#1A1412] border border-[#C8B8A6] dark:border-white/5 px-2 py-1 text-[10px] font-mono text-[#5C3A21] dark:text-[#EAE0D5]/70 shadow-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </motion.div>

      {/* Folder Front Lip */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-b from-[#C8B8A6] to-[#D2BBA0] dark:from-[#251B17] dark:to-[#2C211D] rounded-b-xl z-20 shadow-[0_-2px_8px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_8px_rgba(0,0,0,0.3)] flex items-center justify-center border-t border-white/20 dark:border-white/5"
        variants={{ hover: { y: -4, transition: { duration: 0.4, ease: 'easeOut' } } }}
      >
        <div className="w-full h-px bg-[#5C3A21]/10 dark:bg-white/5 mx-4" />
      </motion.div>
    </motion.div>
  )
}

export default function PublicExperience() {
  const { items: experiences, loading } = useCollection<Experience>('experience')

  const displayExperiences = experiences.length > 0 ? experiences : mockExperiences

  return (
    <section id="experience" className="relative w-full overflow-hidden px-6 py-28 transition-colors duration-700">

      {/* Subtle Archive Dust / Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.01]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <div className="relative z-20 mx-auto max-w-[1400px]">
        {/* Section Heading */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#4E342E] dark:text-[#EAE0D5] drop-shadow-sm dark:drop-shadow-md mb-4">
            The Archive Room
          </h2>
          <p className="font-sans text-sm md:text-base tracking-widest uppercase text-[#8B5A2B] dark:text-[#FFB74D]/80">
            Preserved records of past endeavors
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-sm text-[#8B5A2B] dark:text-[#EAE0D5]/50">
            <Icon icon="lucide:loader-circle" className="size-4 animate-spin" />
            Dusting off records…
          </div>
        ) : displayExperiences.length === 0 ? (
          <p className="py-12 text-center text-sm text-[#8B5A2B] dark:text-[#EAE0D5]/50">The archives are currently empty.</p>
        ) : (
          <div className="flex flex-col gap-16 md:gap-24">
            {displayExperiences.map((exp, i) => (
              <ArchiveCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
