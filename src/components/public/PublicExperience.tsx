import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useCollection } from '../../hooks/useCollection'
import { mockExperiences } from '../../utils/mockData'
import type { Experience } from '../../types'

const OFFSETS = ['-translate-x-2', 'translate-x-3', '-translate-x-4', 'translate-x-2', 'translate-x-0']
const ROTATIONS = ['rotate-[-3deg]', 'rotate-[2deg]', 'rotate-[4deg]', 'rotate-[-2deg]', 'rotate-[1deg]']

const FOLDER_COLORS = [
  { bg: 'bg-[#e3ddec]', darkBg: 'dark:bg-[#2a2432]' }, // Violet
  { bg: 'bg-[#e5e5e5]', darkBg: 'dark:bg-[#2b2b2b]' }, // Light Gray
  { bg: 'bg-[#d1d1d1]', darkBg: 'dark:bg-[#1a1a1a]' }, // Deep Charcoal/Black
  { bg: 'bg-[#d6dbe0]', darkBg: 'dark:bg-[#23272b]' }  // Cool Slate
]

const STAMPS = [
  { text: 'CONFIDENTIAL', color: 'border-red-600/40 text-red-600/40 dark:border-red-400/50 dark:text-red-400/50' },
  { text: 'PERSONNEL FILE', color: 'border-blue-600/40 text-blue-600/40 dark:border-blue-400/50 dark:text-blue-400/50' },
  { text: 'RESTRICTED', color: 'border-purple-600/40 text-purple-600/40 dark:border-purple-400/50 dark:text-purple-400/50' },
  { text: 'ARCHIVED', color: 'border-emerald-600/40 text-emerald-600/40 dark:border-emerald-400/50 dark:text-emerald-400/50' }
]

function ArchiveCard({ exp, index }: { exp: Experience & { id: string }; index: number }) {
  const archiveNum = `ARC-${(index + 1).toString().padStart(3, '0')}`
  const offsetClass = OFFSETS[index % OFFSETS.length]
  const rotateClass = ROTATIONS[index % ROTATIONS.length]
  const stamp = STAMPS[index % STAMPS.length]
  const folder = FOLDER_COLORS[index % FOLDER_COLORS.length]

  return (
    <motion.div
      className={`relative w-full max-w-3xl mx-auto cursor-pointer ${offsetClass} ${rotateClass} z-10 transition-transform duration-500 hover:!z-50 hover:-translate-y-8`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      whileHover="hover"
    >
      {/* Folder Base (Back Layer) */}
      <motion.div
        className={`absolute inset-0 top-6 ${folder.bg} ${folder.darkBg} rounded-b-md rounded-tr-md shadow-[0_8px_20px_rgba(0,0,0,0.1)] dark:shadow-[0_8px_20px_rgba(0,0,0,0.4)] border border-white/20 dark:border-white/5`}
        variants={{ hover: { y: 2, scale: 0.995, transition: { duration: 0.4, ease: 'easeOut' } } }}
      />

      {/* Folder Tab */}
      <motion.div
        className={`absolute top-0 left-0 h-8 w-32 ${folder.bg} ${folder.darkBg} rounded-t-md flex items-center px-4 border-t border-l border-white/20 dark:border-white/5 z-0`}
        variants={{ hover: { y: 2, transition: { duration: 0.4, ease: 'easeOut' } } }}
      >
        <span className="font-mono text-[9px] font-bold tracking-widest uppercase text-[#5C3A21] dark:text-[#EAE0D5] opacity-60">
          {archiveNum}
        </span>
      </motion.div>

      {/* The Paper Insert */}
      <motion.div
        className="relative z-10 mx-2 md:mx-4 mt-8 mb-6 bg-[#FDFBF7] dark:bg-[#22201F] rounded-sm p-5 md:p-8 shadow-[0_2px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_2px_10px_rgba(0,0,0,0.4)] border border-black/5 origin-bottom"
        variants={{
          hover: {
            y: -24, // Gentle slide
            transition: { duration: 0.4, type: 'spring', bounce: 0.1 }
          }
        }}
      >
        {/* Visible Paper Texture / Ruled Lines */}
        <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_31px,#cbd5e1_31px,#cbd5e1_32px)] opacity-60 dark:opacity-30 dark:bg-[repeating-linear-gradient(transparent,transparent_31px,#ffffff15_31px,#ffffff15_32px)]" style={{ backgroundPositionY: '2rem' }} />

        {/* Faded Stamp */}
        <motion.div
          className={`absolute top-6 right-6 rotate-12 border-2 ${stamp.color} px-2 py-0.5 font-sans text-[10px] font-bold tracking-widest uppercase rounded-[1px] pointer-events-none opacity-80`}
          variants={{ hover: { opacity: 1, scale: 1.02, transition: { duration: 0.3 } } }}
        >
          {stamp.text}
        </motion.div>

        {/* Paper Clip */}
        <motion.div
          className="absolute -top-3 left-8 origin-top"
          variants={{ hover: { rotate: -5, transition: { duration: 0.4, type: 'spring' } } }}
        >
          <Icon icon="lucide:paperclip" className="size-6 text-gray-400 dark:text-gray-500 -rotate-12 drop-shadow-sm" />
        </motion.div>

        <div className="relative z-10 mt-2">
          {/* Clean Hierarchy */}
          <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-5 border-b border-charcoal/10 dark:border-white/10 pb-4">
            <div>
              <h3 className="font-serif text-xl md:text-2xl font-bold text-charcoal dark:text-[#EAE0D5]">
                {exp.role}
              </h3>
              <p className="font-sans text-xs font-semibold tracking-widest uppercase text-[#8B5A2B] dark:text-[#FFB74D]/80 mt-1">
                {exp.company}
              </p>
            </div>
            <div className="mt-2 md:mt-0 font-mono text-[10px] text-charcoal/50 dark:text-[#EAE0D5]/50 border border-charcoal/10 dark:border-white/10 px-2 py-0.5 rounded-sm bg-charcoal/[0.02] dark:bg-white/[0.02]">
              {exp.timeline.start} – {exp.timeline.end ?? 'Present'}
            </div>
          </div>

          <p className="font-body text-sm leading-relaxed text-charcoal/80 dark:text-[#EAE0D5]/80 mb-6">
            {exp.description}
          </p>

          {exp.technologies && exp.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {exp.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-sm bg-[#EAE0D5] dark:bg-[#1A1412] border border-[#C8B8A6] dark:border-white/5 px-2 py-0.5 text-[10px] font-mono text-[#5C3A21] dark:text-[#EAE0D5]/70 shadow-sm"
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
        className={`absolute bottom-0 left-0 right-0 h-10 ${folder.bg} ${folder.darkBg} rounded-b-md z-20 shadow-[0_-2px_6px_rgba(0,0,0,0.05)] dark:shadow-[0_-2px_6px_rgba(0,0,0,0.3)] flex items-center justify-center border-t border-white/20 dark:border-white/5`}
        variants={{ hover: { y: 2, scale: 0.995, transition: { duration: 0.4, ease: 'easeOut' } } }}
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
    <section id="experience" className="relative w-full overflow-hidden px-6 py-20 md:py-28 transition-colors duration-700 bg-[#F9F6F0] dark:bg-[#141316]">

      {/* Subtle Archive Dust / Texture */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02] dark:opacity-[0.01]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.85%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />

      <div className="relative z-20 mx-auto max-w-[1200px]">
        {/* Section Heading */}
        <motion.div
          className="mb-16 md:mb-20 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-charcoal dark:text-white/90 drop-shadow-sm mb-4">
            My Experience Archive
          </h2>
          <p className="font-sans text-xs md:text-sm tracking-widest uppercase text-[#8B5A2B] dark:text-[#FFB74D]/80">
            I'm actually surprised I even got employed at some point.
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
          <div className="flex flex-col -space-y-16 md:-space-y-32 pt-8 pb-32">
            {displayExperiences.map((exp, i) => (
              <ArchiveCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
