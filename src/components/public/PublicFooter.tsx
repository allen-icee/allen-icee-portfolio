import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useTheme } from '../../context/ThemeContext'

const personalityIcons = [
  { id: 'books', icon: 'lucide:book-heart', title: 'Books', tooltip: 'Where every idea begins.' },
  { id: 'music', icon: 'lucide:music', title: 'Music', tooltip: 'My favorite coding companion.' },
  { id: 'cats', icon: 'lucide:cat', title: 'Cats', tooltip: 'The true owners of this library.' },
  { id: 'movies', icon: 'lucide:film', title: 'Movies', tooltip: 'Stories beyond the pages.' },
  { id: 'art', icon: 'lucide:palette', title: 'Art', tooltip: 'Colors on a canvas.' },
  { id: 'code', icon: 'lucide:code-2', title: 'Code', tooltip: 'Magic written in logic.' },
]

const techStack = [
  { id: 'react', name: 'React', icon: 'logos:react' },
  { id: 'ts', name: 'TypeScript', icon: 'logos:typescript-icon' },
  { id: 'fb', name: 'Firebase', icon: 'logos:firebase' },
  { id: 'framer', name: 'Framer Motion', icon: 'logos:framer' },
  { id: 'tw', name: 'Tailwind CSS', icon: 'logos:tailwindcss-icon' },
  { id: 'vite', name: 'Vite', icon: 'logos:vitejs' },
]

export default function PublicFooter() {
  const [catClicks, setCatClicks] = useState(0)
  const [hoveredIcon, setHoveredIcon] = useState<string | null>(null)
  
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const handleBackToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleCatClick = () => {
    setCatClicks((prev) => Math.min(prev + 1, 5))
  }

  const isCatAwake = catClicks >= 5

  return (
    <footer className="relative overflow-hidden pb-16 pt-24 md:pb-24 md:pt-32">
      {/* Texture & Atmosphere */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-multiply dark:opacity-[0.05] dark:mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.85\\\' numOctaves=\\\'3\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-charcoal/5 to-transparent dark:from-black/40" />

      {/* Decorative Book Spine Divider */}
      <div className="absolute top-0 inset-x-0 flex justify-center opacity-30 dark:opacity-20">
        <div className="w-full max-w-lg flex items-center justify-center gap-4 py-8">
          <div className="h-[2px] w-full border-t-2 border-dotted border-charcoal dark:border-white" />
          <Icon icon="lucide:book-open" className="size-4 shrink-0 text-charcoal dark:text-white" />
          <div className="h-[2px] w-full border-t-2 border-dotted border-charcoal dark:border-white" />
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6 md:px-8 text-center flex flex-col items-center">
        
        {/* Main Quote */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: 'easeOut' }}
        >
          <h2 className="font-serif text-2xl md:text-4xl leading-relaxed text-charcoal dark:text-white/90 max-w-2xl mx-auto px-4" style={{ lineHeight: '1.6' }}>
            "The library is always open for another visit."
          </h2>
        </motion.div>

        {/* Signature */}
        <motion.div
          className="mb-24 flex flex-col items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          <p className="font-sans text-xs uppercase tracking-widest text-charcoal/40 dark:text-white/40 mb-4">
            Made with curiosity, coffee, books, and countless late nights.
          </p>
          <p className="font-serif text-3xl italic text-charcoal dark:text-white/80" style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}>
            — Macee
          </p>
        </motion.div>

        <div className="w-full flex flex-col md:flex-row items-center md:items-start justify-between gap-16 border-t border-charcoal/10 pt-16 dark:border-white/10">
          
          {/* Left Column: Tech Stack */}
          <div className="flex-1 text-center md:text-left">
            <h4 className="mb-6 flex items-center justify-center md:justify-start gap-2 font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/50 dark:text-white/50">
              <Icon icon="lucide:library" className="size-3" />
              Crafted Using
            </h4>
            <div className="flex flex-wrap justify-center md:justify-start gap-3 max-w-[300px]">
              {techStack.map((tech) => (
                <div key={tech.id} className="group relative flex items-center gap-2 rounded-sm border-t-[3px] border-t-charcoal/10 border-x border-b border-x-charcoal/5 border-b-charcoal/5 bg-[#FDFBF7] px-3 py-1.5 shadow-[0_2px_5px_rgba(0,0,0,0.02)] transition-all hover:-translate-y-0.5 hover:border-t-purple-brand hover:shadow-md dark:border-t-white/10 dark:border-x-white/5 dark:border-b-white/5 dark:bg-[#1A181E] dark:hover:border-t-purple-brand-light">
                  <Icon icon={tech.icon} className="size-3.5 grayscale transition-all group-hover:grayscale-0 dark:brightness-200 dark:group-hover:brightness-100" />
                  <span className="font-sans text-[10px] uppercase tracking-wider text-charcoal/60 dark:text-white/60">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Middle Column: Personality Icons */}
          <div className="flex-1 flex flex-col items-center">
            <div className="flex items-center gap-6">
              {personalityIcons.map((item) => (
                <div 
                  key={item.id} 
                  className="relative group cursor-pointer"
                  onMouseEnter={() => setHoveredIcon(item.id)}
                  onMouseLeave={() => setHoveredIcon(null)}
                >
                  <Icon icon={item.icon} className="size-5 text-charcoal/30 transition-all duration-300 group-hover:-translate-y-1 group-hover:text-purple-brand dark:text-white/30 dark:group-hover:text-purple-brand-light" />
                  
                  {/* Tooltip */}
                  <AnimatePresence>
                    {hoveredIcon === item.id && (
                      <motion.div
                        className="absolute bottom-full left-1/2 mb-3 w-max -translate-x-1/2 rounded-sm bg-charcoal px-3 py-1.5 shadow-lg dark:bg-white"
                        initial={{ opacity: 0, y: 5, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 5, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="absolute -bottom-1 left-1/2 h-2 w-2 -translate-x-1/2 rotate-45 bg-charcoal dark:bg-white" />
                        <p className="relative z-10 font-sans text-[10px] tracking-wide text-white dark:text-charcoal">
                          {item.tooltip}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Actions */}
          <div className="flex-1 flex flex-col items-center md:items-end gap-6">
            
            {/* Back to Top */}
            <button
              onClick={handleBackToTop}
              className="group relative flex items-center justify-center overflow-hidden rounded-sm border border-charcoal/10 bg-[#FDFBF7] px-6 py-3 shadow-[0_2px_10px_rgba(0,0,0,0.02)] transition-all hover:border-purple-brand/30 hover:shadow-lg dark:border-white/10 dark:bg-[#1A181E] dark:hover:border-purple-brand-light/30"
            >
              <div className="absolute inset-0 bg-purple-brand/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100 dark:bg-purple-brand-light/5" />
              <div className="relative z-10 flex items-center gap-3">
                <Icon icon="lucide:book-up" className="size-4 text-charcoal/60 transition-transform duration-500 group-hover:-translate-y-1 dark:text-white/60 group-hover:text-purple-brand dark:group-hover:text-purple-brand-light" />
                <span className="font-serif text-xs font-medium text-charcoal/80 transition-colors group-hover:text-purple-brand dark:text-white/80 dark:group-hover:text-purple-brand-light">Return to the First Page</span>
              </div>
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="group flex items-center gap-2 text-charcoal/40 transition-colors hover:text-charcoal dark:text-white/40 dark:hover:text-white"
              aria-label="Toggle Theme"
            >
              <Icon icon={isDark ? "lucide:moon-star" : "lucide:lamp"} className="size-4" />
              <span className="font-sans text-[10px] uppercase tracking-widest">{isDark ? 'Evening Mode' : 'Daytime Mode'}</span>
            </button>

          </div>
        </div>

        {/* Bottom Copyright & Easter Egg */}
        <div className="mt-20 w-full flex items-end justify-between">
          <div className="text-left max-w-sm">
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-charcoal/40 dark:text-white/40 mb-2">
              © 2026 Macee Yu-Dequiros
            </p>
            <p className="font-serif text-xs italic text-charcoal/30 dark:text-white/30">
              Every page, illustration, project, and story belongs to its respective creator. Designed and crafted with care.
            </p>
          </div>

          {/* Easter Egg: Sleeping Cat */}
          <div 
            className="group relative cursor-pointer opacity-50 transition-opacity hover:opacity-100"
            onClick={handleCatClick}
            title={isCatAwake ? "Meow!" : "Shh... sleeping."}
          >
            {/* SVG Cat */}
            <svg width="40" height="30" viewBox="0 0 100 80" className="text-charcoal fill-current dark:text-white/80 transition-transform duration-300 group-hover:scale-105">
              {!isCatAwake ? (
                // Sleeping Cat Path
                <path d="M 20 60 C 20 40 40 30 50 30 C 60 30 80 40 80 60 C 80 65 75 70 70 70 L 30 70 C 25 70 20 65 20 60 Z M 35 35 L 30 20 L 45 30 Z M 65 35 L 70 20 L 55 30 Z M 40 50 C 42 55 48 55 50 50 C 52 55 58 55 60 50" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                // Awake / Waving Cat Path
                <>
                  <path d="M 30 70 C 30 50 40 40 50 40 C 60 40 70 50 70 70 Z M 40 40 L 35 25 L 45 35 Z M 60 40 L 65 25 L 55 35 Z" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  {/* Eyes */}
                  <circle cx="45" cy="50" r="2" fill="currentColor" />
                  <circle cx="55" cy="50" r="2" fill="currentColor" />
                  {/* Nose */}
                  <path d="M 48 55 L 52 55 L 50 58 Z" fill="currentColor" />
                  {/* Waving Paw (Animated) */}
                  <motion.path 
                    d="M 70 60 C 80 50 90 40 85 30 C 80 20 75 30 70 40" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="3" 
                    strokeLinecap="round"
                    animate={{ rotate: [0, 15, -10, 15, 0], originX: 0, originY: 1 }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  />
                </>
              )}
            </svg>
            {!isCatAwake && catClicks > 0 && (
              <div className="absolute -top-4 right-0 font-mono text-[10px] text-charcoal/40 dark:text-white/40">
                zZz
              </div>
            )}
          </div>

        </div>
      </div>
    </footer>
  )
}
