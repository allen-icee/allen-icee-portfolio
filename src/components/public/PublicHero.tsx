import { useCallback, useRef } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import type Lenis from 'lenis'
import CompButton from '../ui/CompButton'

function scrollToSection(id: string) {
  const target = document.getElementById(id)
  if (!target) return
  const lenis = (window as unknown as Record<string, Lenis | undefined>).__LENIS__
  if (lenis) {
    lenis.scrollTo(target)
  } else {
    target.scrollIntoView({ behavior: 'smooth' })
  }
}

const floatTransition = {
  repeat: Infinity,
  repeatType: 'reverse' as const,
  ease: 'easeInOut' as const,
}

function FloatingBook({ className, duration = 5, delay = 0 }: { className?: string, duration?: number, delay?: number }) {
  return (
    <motion.div
      className={`relative rounded-sm shadow-[2px_4px_12px_rgba(0,0,0,0.08)] before:absolute before:inset-y-0 before:left-0 before:w-1.5 before:rounded-l-sm before:bg-white/20 dark:shadow-[2px_4px_12px_rgba(0,0,0,0.4)] ${className}`}
      animate={{ y: [0, -12, 0], rotateZ: [-1, 1, -1] }}
      transition={{ ...floatTransition, duration, delay }}
      aria-hidden
    />
  )
}

export default function PublicHero() {
  const catClicks = useRef(0)
  const handleCTA = useCallback(() => scrollToSection('library-content'), [])

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      {/* ---- Magical Glow Aura behind text ---- */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 size-[600px] rounded-full bg-purple-brand/5 blur-[120px] dark:bg-purple-brand/10" aria-hidden />

      {/* ---- Floating background elements ---- */}

      {/* Left Stack */}
      <div className="absolute left-[8%] top-[20%] flex flex-col gap-1.5 md:left-[15%]">
        <FloatingBook className="h-5 w-16 bg-[#8c6b5d]" duration={5.5} delay={0} />
        <FloatingBook className="h-6 w-20 bg-purple-brand/60" duration={6} delay={0.2} />
        <FloatingBook className="h-4 w-14 bg-lavender" duration={5} delay={0.5} />
        <FloatingBook className="h-8 w-12 bg-[#5d4037]" duration={6.5} delay={0.8} />
      </div>

      {/* Right Stack */}
      <div className="absolute right-[8%] top-[30%] flex flex-col gap-1.5 md:right-[18%]">
        <FloatingBook className="h-4 w-14 bg-[#795548]" duration={5.2} delay={1} />
        <FloatingBook className="h-8 w-16 bg-purple-brand/50" duration={6.2} delay={1.2} />
        <FloatingBook className="h-5 w-20 bg-[#a1887f]" duration={5.8} delay={1.5} />
      </div>

      {/* Petals / Sparks */}
      <motion.span
        className="absolute left-[30%] top-[15%] size-3 rounded-full bg-purple-brand/30 shadow-[0_0_10px_rgba(107,76,154,0.4)]"
        animate={{ y: [0, -20, 0], opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ ...floatTransition, duration: 4 }}
        aria-hidden
      />
      <motion.span
        className="absolute right-[25%] top-[12%] size-2 rounded-full bg-lavender shadow-[0_0_8px_rgba(230,230,250,0.6)]"
        animate={{ y: [0, 15, 0], opacity: [0.4, 1, 0.4] }}
        transition={{ ...floatTransition, duration: 3.5, delay: 0.5 }}
        aria-hidden
      />
      <motion.span
        className="absolute bottom-[30%] left-[12%] size-4 rounded-full bg-purple-brand/20 shadow-[0_0_15px_rgba(107,76,154,0.3)]"
        animate={{ y: [0, -12, 0], opacity: [0.2, 0.6, 0.2] }}
        transition={{ ...floatTransition, duration: 5, delay: 1.5 }}
        aria-hidden
      />

      {/* ---- Content ---- */}
      <div className="relative z-10 max-w-3xl text-center">
        <motion.p
          className="mb-6 font-sans text-xs font-semibold tracking-[0.2em] uppercase text-purple-brand/70 dark:text-purple-brand/90 md:text-sm"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          A Collection of Work &amp; Wonder
        </motion.p>

        <motion.h1
          className="font-serif text-4xl leading-[1.15] text-charcoal sm:text-5xl md:text-6xl dark:text-white/95"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
        >
          Every project begins as <br className="hidden md:block" /> a blank page.
          <br />
          <span className="mt-2 block font-serif italic text-purple-brand">
            Welcome to my library.
          </span>
        </motion.h1>

        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <CompButton
            onClick={handleCTA}
            className="group relative overflow-hidden rounded-full bg-charcoal px-8 py-3.5 font-sans text-sm font-medium tracking-wide text-white shadow-xl transition-all hover:scale-105 hover:bg-purple-brand hover:shadow-purple-brand/30 dark:bg-white dark:text-charcoal dark:hover:bg-lavender"
          >
            <span className="relative z-10 flex items-center gap-2">
              <Icon icon="lucide:book-open" className="size-4 transition-transform group-hover:-rotate-12" />
              Open The Library
            </span>
          </CompButton>
        </motion.div>
      </div>

      {/* ---- Sleeping cat placeholder ---- */}
      <motion.button
        className="absolute bottom-10 left-1/2 -translate-x-1/2 cursor-pointer text-charcoal/20 transition-colors hover:text-charcoal/40 dark:text-white/20 dark:hover:text-white/40"
        animate={{ y: [0, -3, 0] }}
        transition={{ ...floatTransition, duration: 3, delay: 2 }}
        aria-label="Sleeping cat"
        onClick={() => {
          catClicks.current += 1
          if (catClicks.current >= 5) {
            catClicks.current = 0
            window.dispatchEvent(new CustomEvent('library:open-gate'))
          }
        }}
      >
        <Icon icon="lucide:cat" className="size-8" />
      </motion.button>
    </section>
  )
}
