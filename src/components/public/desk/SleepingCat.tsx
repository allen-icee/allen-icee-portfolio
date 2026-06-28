import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'

export function SleepingCat() {
  const [clickCount, setClickCount] = useState(0)
  const [catState, setCatState] = useState<'idle' | 'waking' | 'walking' | 'gone'>('idle')
  const [noteOpen, setNoteOpen] = useState(false)

  const handleClick = () => {
    if (catState === 'gone') return

    setClickCount((prev) => {
      const newCount = prev + 1
      if (newCount === 1) {
        setCatState('waking')
        // Go back to sleep after 3 seconds
        setTimeout(() => {
          setCatState((current) => current === 'waking' ? 'idle' : current)
        }, 3000)
      } else if (newCount >= 5) {
        setCatState('walking')
        setTimeout(() => {
          setCatState('gone')
        }, 2000) // Takes 2 seconds to walk away
      }
      return newCount
    })
  }

  // Define animations based on state
  const catAnimations = {
    idle: {
      scaleY: [1, 1.05, 1],
      transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' }
    },
    waking: {
      scaleY: [1, 1.1, 1],
      rotateZ: [-2, 2, 0],
      transition: { duration: 1, ease: 'easeInOut' }
    },
    walking: {
      x: 300,
      opacity: 0,
      transition: { duration: 2, ease: 'easeInOut' }
    },
    gone: {
      display: 'none'
    }
  }

  return (
    <div className="relative">
      {/* The Hidden Note (only fully visible/interactable when cat is gone) */}
      <AnimatePresence>
        {catState === 'gone' && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, rotateZ: -10 }}
            animate={{ opacity: 1, scale: 1, rotateZ: -5 }}
            whileHover={{ scale: 1.1, rotateZ: 0 }}
            onClick={() => setNoteOpen(true)}
            className="absolute left-4 top-2 z-0 outline-none focus-visible:ring-2 focus-visible:ring-purple-brand rounded-sm cursor-pointer"
            aria-label="Open hidden note"
          >
            <div className="flex size-10 items-center justify-center rounded-sm bg-[#FDFBF7] shadow-sm border border-[#EAE0D5] dark:bg-[#2A2A2D] dark:border-white/10 text-charcoal/40 dark:text-white/40">
              <Icon icon="lucide:mail" className="size-5" />
            </div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* The Cat */}
      {catState !== 'gone' && (
        <motion.button
          className="relative z-10 cursor-pointer text-charcoal/80 dark:text-white/80 outline-none"
          onClick={handleClick}
          animate={catAnimations[catState]}
          aria-label="Sleeping cat"
        >
          {catState === 'idle' ? (
            <Icon icon="lucide:cat" className="size-16 drop-shadow-md" />
          ) : catState === 'waking' ? (
            <div className="relative">
              <Icon icon="lucide:cat" className="size-16 drop-shadow-md" />
              {/* Zzz or surprised mark */}
              <motion.span 
                className="absolute -top-4 -right-2 text-xs font-bold text-purple-brand"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                !
              </motion.span>
            </div>
          ) : (
            <Icon icon="lucide:cat" className="size-16 drop-shadow-md" />
          )}
        </motion.button>
      )}

      {/* Modal for Note */}
      <AnimatePresence>
        {noteOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4"
            onClick={() => setNoteOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-sm w-full rounded-xl bg-[#FDFBF7] p-8 shadow-2xl dark:bg-[#1A1412] dark:border dark:border-white/10"
            >
              <button 
                onClick={() => setNoteOpen(false)}
                className="absolute right-4 top-4 text-charcoal/40 hover:text-charcoal dark:text-white/40 dark:hover:text-white"
              >
                <Icon icon="lucide:x" className="size-5" />
              </button>
              
              <h4 className="font-serif text-xl text-charcoal dark:text-white mb-4 italic">A quiet whisper...</h4>
              <p className="font-sans text-sm leading-relaxed text-charcoal/70 dark:text-white/70 mb-6">
                You found the secret beneath the paws. Thank you for taking the time to pause, click, and explore. Energy is precious, but curiosity is a gift. Keep wandering.
              </p>
              <div className="flex justify-end">
                <span className="font-serif text-sm italic text-purple-brand/80">
                  — The Sanctuary Cat
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
