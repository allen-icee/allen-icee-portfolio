import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Logo } from '../../ui/Logo'

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true)
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    // Check reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    // Prevent scrolling while splash is visible
    document.body.style.overflow = 'hidden'

    // 2.5 seconds max duration for the splash screen
    const timer = setTimeout(() => {
      setIsVisible(false)
      document.body.style.overflow = 'unset'
    }, 2500)

    return () => {
      clearTimeout(timer)
      document.body.style.overflow = 'unset'
    }
  }, [])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black text-[#fdfbf7]"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          {/* Subtle background radial gradient with purple tint */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(107,76,154,0.15)_0%,transparent_70%)] pointer-events-none" />

          <div className="relative flex items-center justify-center w-48 h-48 sm:w-64 sm:h-64 rounded-full bg-[#111] dark:bg-black shadow-[0_0_50px_rgba(107,76,154,0.1),inset_0_0_10px_rgba(255,255,255,0.05)] border border-white/10 z-0">
            <div className="w-full h-full rounded-full relative flex items-center justify-center animate-[spin_4s_linear_infinite]">
              {/* Vinyl grooves */}
              <div className="absolute inset-2 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-4 sm:inset-5 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-8 sm:inset-10 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-12 sm:inset-16 rounded-full border border-white/5 pointer-events-none" />
              <div className="absolute inset-16 sm:inset-22 rounded-full border border-white/5 pointer-events-none" />

              {/* Shimmer/Reflection overlay mimicking vinyl texture */}
              <div className="absolute inset-0 rounded-full opacity-40 bg-[conic-gradient(from_0deg,transparent,rgba(255,255,255,0.1)_45deg,transparent_90deg,transparent_180deg,rgba(255,255,255,0.1)_225deg,transparent_270deg)] pointer-events-none" />

              {/* Center label (Purple/Gray/Black theme) */}
              <div className="w-[35%] aspect-square rounded-full bg-[#6B4C9A] border-[3px] border-[#111] flex items-center justify-center shadow-inner relative z-10 overflow-hidden">
                {/* Logo */}
                <Logo className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-auto text-[#FDFBF7] opacity-80 drop-shadow-md z-10" />

                {/* Central Hole */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-[#111] shadow-[inset_0_2px_4px_rgba(0,0,0,0.8)] z-30" />
              </div>
            </div>
          </div>

          <motion.p
            className="mt-12 font-sans text-[9px] sm:text-[10px] tracking-[0.4em] uppercase text-white/50 font-medium"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Entering Icee's World
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
