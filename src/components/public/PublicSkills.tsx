import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useCollection } from '../../hooks/useCollection'
import type { Skill } from '../../types'

function SpellCard({ skill, index }: { skill: Skill; index: number }) {
  // Convert 0-100 to 1-5 runes
  const totalRunes = 5
  const filledRunes = Math.max(1, Math.round(skill.confidence / 20))

  return (
    <motion.div
      className="group relative flex flex-col justify-between overflow-hidden rounded-sm border border-[#E8DCC7] bg-[#F9F6F0] p-5 shadow-[2px_4px_12px_rgba(0,0,0,0.06)] transition-all duration-400 hover:shadow-[4px_8px_20px_rgba(107,76,154,0.15)] dark:border-[#3D3648] dark:bg-[#25232A] dark:shadow-[2px_4px_12px_rgba(0,0,0,0.5)] dark:hover:shadow-[4px_8px_20px_rgba(139,107,194,0.2)]"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.02 }}
    >
      {/* Scroll Texture Overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noiseFilter\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.85\\\' numOctaves=\\\'3\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noiseFilter)\\\'/%3E%3C/svg%3E")' }} />

      {/* Folded Corner Effect */}
      <div className="pointer-events-none absolute -right-4 -top-4 size-8 rotate-45 bg-[#E8DCC7]/50 dark:bg-[#3D3648]/50" />

      {/* Header (Icon + Category) */}
      <div className="relative z-10 mb-6 flex items-start justify-between">
        <div className="flex size-12 items-center justify-center rounded-sm border border-charcoal/10 bg-[#EFEBE1] text-charcoal shadow-inner dark:border-white/10 dark:bg-[#1A181D] dark:text-purple-brand/90 transition-transform duration-300 group-hover:scale-110 group-hover:bg-purple-brand/10 group-hover:text-purple-brand">
          <Icon icon={skill.icon} className="size-6" />
        </div>
        <span className="font-sans text-[9px] font-bold tracking-widest uppercase text-purple-brand/60 dark:text-purple-brand/80">
          {skill.category}
        </span>
      </div>

      {/* Body (Name + Details) */}
      <div className="relative z-10 flex-1">
        <h3 className="font-serif text-lg font-medium text-charcoal dark:text-white/90">
          {skill.name}
        </h3>
        <p className="mt-1 font-body text-xs italic text-charcoal/60 dark:text-white/50">
          {skill.yearsOfExperience} {skill.yearsOfExperience === 1 ? 'year' : 'years'} studied
        </p>
      </div>

      {/* Runic Mastery Indicator (Replaces SaaS Progress Bar) */}
      <div className="relative z-10 mt-6 flex items-center justify-between border-t border-charcoal/5 pt-4 dark:border-white/5">
        <span className="font-sans text-[10px] uppercase tracking-widest text-charcoal/40 dark:text-white/40">
          Mastery
        </span>
        <div className="flex gap-1" aria-label={`Mastery level ${filledRunes} out of 5`}>
          {Array.from({ length: totalRunes }).map((_, i) => {
            const isFilled = i < filledRunes
            return (
              <motion.div
                key={i}
                initial={false}
                animate={{
                  scale: isFilled ? [1, 1.2, 1] : 1,
                  opacity: isFilled ? 1 : 0.2
                }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
                className={`flex size-3 items-center justify-center rotate-45 border ${isFilled ? 'border-purple-brand bg-purple-brand/80 shadow-[0_0_8px_rgba(107,76,154,0.6)] dark:bg-purple-brand/90' : 'border-charcoal/20 bg-transparent dark:border-white/20'}`}
              />
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}

export default function PublicSkills() {
  const { items: skills, loading } = useCollection<Skill>('skills')

  return (
    <section id="skills" className="relative border-y border-charcoal/5 bg-[#F2EDE4] px-4 py-20 dark:border-white/5 dark:bg-[#1C1A20] md:px-6 md:py-32">
      <div className="mx-auto max-w-6xl">
        <motion.div
          className="mb-12 text-center md:mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl font-medium tracking-tight text-charcoal md:text-4xl dark:text-white/90">
            The Spellbook
          </h2>
          <p className="mt-3 font-body text-sm italic text-charcoal/60 dark:text-white/50">
            Tools, languages, and incantations I reach for every day.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex min-h-[200px] items-center justify-center gap-3 text-sm font-medium text-charcoal/40 dark:text-white/40">
            <Icon icon="lucide:sparkles" className="size-5 animate-pulse text-purple-brand/60" />
            Reading scrolls…
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {skills.map((skill, i) => (
              <SpellCard key={skill.id} skill={skill} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
