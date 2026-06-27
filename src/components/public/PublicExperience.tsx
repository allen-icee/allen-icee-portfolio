import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useCollection } from '../../hooks/useCollection'
import type { Experience } from '../../types'

function TimelineDot() {
  return (
    <div className="relative z-10 flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-lavender/50 bg-warm-paper">
      <span className="size-2 rounded-full bg-purple-brand/60" />
    </div>
  )
}

function ExperienceCard({ exp, index }: { exp: Experience & { id: string }; index: number }) {
  return (
    <motion.div
      className="relative pl-10 pb-10 last:pb-0"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
    >
      {/* Timeline connector line */}
      <span className="absolute bottom-0 left-[15px] top-0 w-px bg-lavender/30 last:hidden" aria-hidden />

      <TimelineDot />

      <div className="mt-2 rounded-2xl border border-charcoal/5 bg-white/40 p-5 shadow-sm">
        <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <h3
            className="text-base font-medium text-charcoal dark:text-white/90"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            {exp.role}
          </h3>
          <span className="text-sm text-purple-brand/70">{exp.company}</span>
        </div>

        <p className="mt-1 text-xs tracking-wider text-charcoal/40 dark:text-white/40">
          {exp.timeline.start} – {exp.timeline.end ?? 'Present'}
        </p>

        <p className="mt-3 text-sm leading-relaxed text-charcoal/70 dark:text-white/70">
          {exp.description}
        </p>

        {exp.technologies && exp.technologies.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {exp.technologies.map((tech) => (
              <span
                key={tech}
                className="rounded-full bg-lavender/30 px-2.5 py-0.5 text-[10px] font-medium text-charcoal/50 dark:bg-white/[0.08] dark:text-white/50"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default function PublicExperience() {
  const { items: experiences, loading } = useCollection<Experience>('experience')

  return (
    <section id="experience" className="bg-warm-paper px-6 py-28">
      <div className="mx-auto max-w-2xl">
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-2xl font-medium tracking-tight text-charcoal dark:text-white/90"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            The Timeline
          </h2>
          <p className="mt-2 text-sm text-charcoal/50 dark:text-white/50">
            Chapters so far.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center gap-2 py-12 text-sm text-charcoal/30 dark:text-white/30">
            <Icon icon="lucide:loader-circle" className="size-4 animate-spin" />
            Loading…
          </div>
        ) : experiences.length === 0 ? (
          <p className="py-12 text-center text-sm text-charcoal/30 dark:text-white/30">No experience entries yet.</p>
        ) : (
          <div>
            {experiences.map((exp, i) => (
              <ExperienceCard key={exp.id} exp={exp} index={i} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
