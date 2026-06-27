import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useCollection } from '../../hooks/useCollection'
import type { Project } from '../../types'

const backVariants = {
  initial: { opacity: 0, x: -8 },
  animate: { opacity: 1, x: 0 },
}

export default function PublicProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { items: projects, loading } = useCollection<Project>('projects')

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Icon icon="lucide:loader-circle" className="size-8 animate-spin text-charcoal/30 dark:text-white/30" />
      </div>
    )
  }

  const project = projects.find((p) => p.id === id)

  if (!project) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-6">
        <Icon icon="lucide:book-x" className="size-12 text-charcoal/20 dark:text-white/20" />
        <p className="text-charcoal/50 dark:text-white/50">This project isn&rsquo;t on the shelf.</p>
        <button
          onClick={() => navigate('/')}
          className="rounded-xl bg-purple-brand px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-brand/90"
        >
          Back to Library
        </button>
      </div>
    )
  }

  return (
    <motion.div
      className="mx-auto max-w-3xl px-6 py-20"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Back button */}
      <motion.button
        onClick={() => navigate('/')}
        className="mb-10 flex items-center gap-2 text-sm text-charcoal/50 transition-colors hover:text-purple-brand dark:text-white/50 dark:hover:text-purple-brand/90"
        variants={backVariants}
        initial="initial"
        animate="animate"
        transition={{ duration: 0.3 }}
      >
        <Icon icon="lucide:arrow-left" className="size-4" />
        Back to Library
      </motion.button>

      {/* Cover + header */}
      <div className="mb-12 flex flex-col gap-8 sm:flex-row">
        <div
          className="aspect-[5/7] w-full shrink-0 rounded-2xl bg-cover bg-center shadow-lg sm:w-56"
          style={{ backgroundImage: `url(${project.coverImage})` }}
          role="img"
          aria-label={`Cover of ${project.title}`}
        />

        <div className="flex flex-col justify-center">
          <p className="mb-2 text-xs tracking-widest uppercase text-purple-brand/50">
            Case Study
          </p>
          <h1
            className="text-3xl font-medium text-charcoal dark:text-white/90"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            {project.title}
          </h1>
          <p className="mt-2 text-base italic text-charcoal/50 dark:text-white/50">
            &ldquo;{project.tagline}&rdquo;
          </p>
        </div>
      </div>

      {/* Description — ledger / textbook style */}
      <div className="rounded-2xl border border-charcoal/5 bg-white/40 p-8 shadow-sm dark:border-white/[0.06] dark:bg-white/[0.03]">
        <h2
          className="mb-4 text-lg font-medium text-charcoal dark:text-white/90"
          style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
        >
          Notes
        </h2>

        <p className="leading-relaxed text-charcoal/70 dark:text-white/70">
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="mt-8">
          <h3 className="mb-3 text-xs tracking-widest uppercase text-charcoal/40 dark:text-white/40">
            Tools &amp; Technologies
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-lavender/30 bg-lavender/15 px-3 py-1.5 text-xs font-medium text-charcoal/70 dark:border-white/[0.08] dark:bg-white/[0.04] dark:text-white/70"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* GitHub link */}
        <div className="mt-8 flex items-center gap-3 rounded-xl bg-charcoal/[0.03] p-4 dark:bg-white/[0.02]">
          <Icon icon="lucide:github" className="size-5 text-charcoal/40 dark:text-white/40" />
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-purple-brand underline-offset-2 hover:underline"
          >
            {project.githubLink}
          </a>
        </div>
      </div>

      {/* ponytail: bottom nav hint */}
      <p className="mt-10 text-center text-xs text-charcoal/30 dark:text-white/30">
        <Icon icon="lucide:arrow-left" className="mr-1 inline size-3" />
        Use the <kbd className="rounded border border-charcoal/10 bg-white/50 px-1 py-0.5 font-mono text-[10px]">Back</kbd> button or browser back to return
      </p>
    </motion.div>
  )
}
