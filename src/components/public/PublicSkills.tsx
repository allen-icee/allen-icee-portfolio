import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useCollection } from '../../hooks/useCollection'
import type { Skill } from '../../types'

function ReferenceCard({ skill, index }: { skill: Skill; index: number }) {
  const totalDots = 5
  const filledDots = Math.max(1, Math.round(skill.confidence / 20))

  return (
    <motion.div
      className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-[#D2BBA0] bg-[#FDFBF7] p-5 md:p-6 shadow-[2px_4px_10px_rgba(0,0,0,0.05)] transition-all duration-400 hover:shadow-[4px_8px_20px_rgba(0,0,0,0.1)] dark:border-white/5 dark:bg-[#22201F] dark:shadow-[2px_4px_10px_rgba(0,0,0,0.4)] dark:hover:shadow-[4px_8px_20px_rgba(0,0,0,0.6)] z-10 hover:z-20"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: Math.min((index % 4) * 0.1, 0.4), ease: 'easeOut' }}
      whileHover="hover"
    >
      <motion.div
        className="absolute inset-0 z-0 pointer-events-none"
        variants={{ hover: { y: -6, scale: 1.02, transition: { duration: 0.3 } } }}
      />
      {/* We apply the actual hover transform to the wrapper to lift the card */}
      <div className="absolute inset-0 pointer-events-none transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02]" />

      {/* Very Subtle Paper Texture */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noiseFilter\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.85\\\' numOctaves=\\\'3\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noiseFilter)\\\'/%3E%3C/svg%3E")' }} />

      {/* Outer wrapper to hold content and move up on hover */}
      <div className="relative z-10 flex flex-col h-full transition-transform duration-300 group-hover:-translate-y-2 group-hover:scale-[1.02]">
        
        {/* Header (Icon + Category) */}
        <div className="mb-4 flex items-start justify-between">
          <motion.div 
            className="flex size-10 items-center justify-center text-charcoal/80 dark:text-[#EAE0D5]/80"
            variants={{ hover: { rotateZ: 8, scale: 1.1, transition: { duration: 0.4 } } }}
          >
            <Icon icon={skill.icon} className="size-8 drop-shadow-sm" />
          </motion.div>
          <span className="font-sans text-[10px] font-bold tracking-widest uppercase text-[#8B5A2B]/60 dark:text-lavender/60 border border-[#8B5A2B]/20 dark:border-lavender/20 px-2 py-0.5 rounded-sm bg-[#8B5A2B]/5 dark:bg-lavender/5">
            {skill.category}
          </span>
        </div>

        {/* Body (Name + Details) */}
        <div className="flex-1 border-b border-charcoal/10 dark:border-white/10 pb-4 mb-4">
          <h3 className="font-serif text-xl font-bold text-[#4E342E] dark:text-[#EAE0D5]">
            {skill.name}
          </h3>
          <p className="mt-1 font-body text-xs text-[#5C3A21]/70 dark:text-[#EAE0D5]/60 italic" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
            {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'} studied
          </p>
        </div>

        {/* Comfort Level (Circles) */}
        <div className="flex flex-col gap-2">
          <span className="font-sans text-[9px] uppercase tracking-widest text-[#8B5A2B]/60 dark:text-white/40">
            Comfort Level
          </span>
          <div className="flex gap-1.5" aria-label={`Comfort level ${filledDots} out of 5`}>
            {Array.from({ length: totalDots }).map((_, i) => (
              <span
                key={i}
                className={`size-2.5 rounded-full border ${i < filledDots ? 'bg-[#8B5A2B] border-[#8B5A2B] dark:bg-lavender dark:border-lavender' : 'bg-transparent border-[#8B5A2B]/30 dark:border-white/20'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hidden Note (Slides up on hover) */}
      <motion.div 
        className="absolute bottom-0 left-0 right-0 bg-[#EAE0D5] dark:bg-[#1A1412] px-5 py-3 border-t border-[#D2BBA0] dark:border-white/10 z-20 shadow-[0_-4px_10px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_10px_rgba(0,0,0,0.3)]"
        initial={{ y: '100%', opacity: 0 }}
        variants={{ hover: { y: 0, opacity: 1, transition: { duration: 0.3, ease: 'easeOut' } } }}
      >
        <p className="font-body text-xs italic text-[#5C3A21]/80 dark:text-[#EAE0D5]/80 leading-relaxed text-center" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
          "A frequently referenced tool in the collection."
        </p>
      </motion.div>
    </motion.div>
  )
}

export default function PublicSkills() {
  const { items: skills, loading } = useCollection<Skill>('skills')

  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = []
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, Skill[]>)

  return (
    <section id="skills" className="relative w-full overflow-hidden border-y border-[#D2BBA0]/50 px-4 py-20 dark:border-white/5 md:px-6 md:py-32 transition-colors duration-700">
      
      {/* Subtle Background Decorations (3-5% Opacity) */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Bookshelf outline hint */}
        <div className="absolute top-[5%] left-[5%] w-[90%] h-[90%] border-x-4 border-[#8B5A2B] dark:border-white opacity-[0.02] dark:opacity-[0.01]" />
        
        {/* Cat Paw Print */}
        <Icon icon="lucide:paw-print" className="absolute top-[12%] left-[10%] size-12 text-black opacity-[0.03] dark:text-white dark:opacity-[0.03] -rotate-12" />
        <Icon icon="lucide:paw-print" className="absolute top-[16%] left-[15%] size-10 text-black opacity-[0.03] dark:text-white dark:opacity-[0.03] rotate-12" />
        
        {/* Vinyl Record */}
        <Icon icon="lucide:disc-3" className="absolute bottom-[20%] right-[8%] size-40 text-black opacity-[0.03] dark:text-white dark:opacity-[0.02] animate-[spin_60s_linear_infinite]" />
        
        {/* Coffee Ring / Cup */}
        <Icon icon="lucide:coffee" className="absolute top-[40%] right-[12%] size-28 text-[#5C3A21] opacity-[0.04] dark:text-white dark:opacity-[0.02] rotate-[15deg]" />
        
        {/* Music Notes */}
        <Icon icon="lucide:music" className="absolute bottom-[10%] left-[12%] size-10 text-black opacity-[0.03] dark:text-white dark:opacity-[0.02] rotate-6" />
        
        {/* Manga Panel Outline Fake */}
        <div className="absolute top-[25%] left-[65%] w-64 h-80 border-[6px] border-black dark:border-white opacity-[0.02] dark:opacity-[0.01] -rotate-6" />
        <div className="absolute top-[30%] left-[63%] w-48 h-32 border-[6px] border-black dark:border-white opacity-[0.02] dark:opacity-[0.01] -rotate-6 bg-black dark:bg-white" />
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px]">
        <motion.div
          className="mb-16 text-center md:mb-24"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl font-bold tracking-tight text-[#4E342E] md:text-5xl dark:text-[#EAE0D5] drop-shadow-sm mb-6">
            The Reference Shelf
          </h2>
          <p className="mx-auto max-w-2xl font-body text-sm md:text-base leading-relaxed text-[#8B5A2B] dark:text-[#EAE0D5]/60">
            Every project begins with the right tools. These are the technologies, languages, and creative software I keep reaching for.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center gap-3 text-sm font-medium text-[#8B5A2B]/60 dark:text-white/40">
            <Icon icon="lucide:loader-circle" className="size-5 animate-spin" />
            Dusting the shelves…
          </div>
        ) : skills.length === 0 ? (
          <p className="py-12 text-center text-sm text-[#8B5A2B]/60 dark:text-[#EAE0D5]/50">The shelves are currently empty.</p>
        ) : (
          <div className="flex flex-col gap-20 md:gap-28">
            {Object.entries(groupedSkills).map(([category, categorySkills]) => (
              <div key={category} className="relative">
                {/* Shelf Label */}
                <div className="absolute -top-10 left-1/2 -translate-x-1/2 md:left-4 md:translate-x-0 z-20">
                  <div className="bg-[#D2BBA0]/40 dark:bg-white/5 border border-[#8B5A2B]/20 dark:border-white/10 px-6 py-1.5 rounded-sm shadow-sm backdrop-blur-md">
                    <h3 className="font-serif text-lg md:text-xl text-[#5C3A21] dark:text-[#EAE0D5] italic font-medium">
                      {category}
                    </h3>
                  </div>
                </div>

                {/* The Shelf Cards */}
                <div className="relative z-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pb-12 pt-6 md:pt-4 px-4 md:px-8">
                  {categorySkills.map((skill, i) => (
                    <ReferenceCard key={skill.id} skill={skill} index={i} />
                  ))}
                </div>

                {/* The Wooden Shelf Divider */}
                <div className="absolute bottom-4 left-0 right-0 h-5 rounded-sm bg-gradient-to-b from-[#C8B8A6] to-[#A39180] dark:from-[#2A2631] dark:to-[#17151A] shadow-[0_12px_20px_rgba(0,0,0,0.15)] dark:shadow-[0_12px_25px_rgba(0,0,0,0.6)] border-t border-white/40 dark:border-white/5 z-0" />
                <div className="absolute bottom-0 left-4 right-4 h-2 bg-black/10 dark:bg-black/50 blur-[3px] z-0" />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
