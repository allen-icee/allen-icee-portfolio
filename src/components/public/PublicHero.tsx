import { useCallback, useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Icon } from '@iconify/react'
import type Lenis from 'lenis'
import { Logo } from '../ui/Logo'

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

function ParallaxLayer({ children, xProgress, yProgress, depth, className = '' }: { children: React.ReactNode, xProgress: any, yProgress: any, depth: number, className?: string }) {
  const x = useTransform(xProgress, [-0.5, 0.5], [-depth * 100, depth * 100])
  const y = useTransform(yProgress, [-0.5, 0.5], [-depth * 100, depth * 100])
  return (
    <motion.div style={{ x, y }} className={`absolute inset-0 pointer-events-none ${className}`}>
      {children}
    </motion.div>
  )
}

function FloatingMusicNote({ icon = "lucide:music", className, duration = 12, delay = 0 }: { icon?: string, className?: string, duration?: number, delay?: number }) {
  return (
    <motion.div
      className={`absolute text-purple-brand/30 dark:text-lavender/30 mix-blend-multiply dark:mix-blend-screen ${className}`}
      animate={{ y: [-20, 20, -20], x: [-10, 10, -10], rotateZ: [-15, 15, -15] }}
      transition={{ ...floatTransition, duration, delay }}
    >
      <Icon icon={icon} className="w-full h-full" />
    </motion.div>
  )
}

function FloatingPetal({ className, petalIndex = 1, duration = 10, delay = 0 }: { className?: string, petalIndex?: number, duration?: number, delay?: number }) {
  return (
    <motion.img
      src={`/svg/petals/petal-${petalIndex}.svg`}
      className={`absolute drop-shadow-[0_0_8px_rgba(107,76,154,0.3)] dark:drop-shadow-[0_0_8px_rgba(230,230,250,0.3)] object-contain ${className}`}
      animate={{ y: [-30, 30, -30], x: [-15, 15, -15], rotateZ: [0, 180, 360] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    />
  )
}

function FloatingOrigami({ className }: { className?: string }) {
  const [pos, setPos] = useState({
    x: -20, y: 20, rotateZ: 25, scaleX: 1, duration: 0, direction: 1
  });

  useEffect(() => {
    // Initial random position off screen left
    setPos({ x: -20, y: 20, rotateZ: 25, scaleX: 1, duration: 0, direction: 1 });

    const moveBird = () => {
      setPos(prev => {
        let isIdle = Math.random() > 0.6; // 40% chance to idle

        // If bird is off-screen, don't idle! Keep it moving so it comes back.
        if (prev.x < -10 || prev.x > 110) {
          isIdle = false;
        }

        if (isIdle) {
          // Idle in place with slight bobbing
          return {
            ...prev,
            x: prev.x + (Math.random() * 4 - 2),
            y: prev.y + (Math.random() * 4 - 2),
            duration: 4 + Math.random() * 4
          };
        } else {
          let newDirection = prev.direction;

          // Check if we need to turn around (because we flew entirely off screen)
          if (prev.direction === 1 && prev.x > 110) {
            newDirection = -1;
          } else if (prev.direction === -1 && prev.x < -10) {
            newDirection = 1;
          }

          let newX;

          if (newDirection === 1) {
            // Flying right
            newX = prev.x + 20 + Math.random() * 40;
            if (newX > 120) newX = 120;
          } else {
            // Flying left
            newX = prev.x - (20 + Math.random() * 40);
            if (newX < -20) newX = -20;
          }

          let dyBase = (Math.random() - 0.5) * 30; // Max 15vh up or down
          let newY = prev.y + dyBase;
          if (newY < 5) newY = 5;
          if (newY > 75) newY = 75;

          const dx = newX - prev.x;
          const dy = newY - prev.y;

          // --- THE MATH FIX ---
          // 1. Calculate Pitch: Treat all flights as if they are going Right. 
          // Math.abs(dx) forces the math into the right hemisphere to find pure up/down pitch.
          let pitch = (Math.atan2(dy, Math.abs(dx)) * 180) / Math.PI;

          // 2. Clamp the pitch so the origami doesn't dive-bomb or climb straight up
          if (pitch > 30) pitch = 30;
          if (pitch < -30) pitch = -30;

          // 3. Apply the correct rotation formula based on direction
          let rotateZ;
          if (newDirection === 1) {
            // Flying Right: Native image faces NE (-45°). 
            // Adding 45 zeroes it to flat Right (0°), then we add our pitch.
            rotateZ = pitch + 45;
          } else {
            // Flying Left: scaleX(-1) flips the native NE image to face NW (-135°).
            // To pitch up or down while flipped, the geometry simplifies to this exact formula:
            rotateZ = -45 - pitch;
          }
          // --------------------

          const dist = Math.sqrt(dx * dx + dy * dy);
          let duration = dist / 4;
          if (duration < 6) duration = 6;
          if (duration > 20) duration = 20;

          return {
            x: newX,
            y: newY,
            scaleX: newDirection,
            rotateZ,
            duration,
            direction: newDirection
          };
        }
      });
    };

    const interval = setInterval(moveBird, 6000);
    const timeout = setTimeout(moveBird, 100);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <motion.div
      className={`absolute top-0 left-0 ${className}`}
      animate={{
        x: `${pos.x}vw`,
        y: `${pos.y}vh`,
        rotateZ: pos.rotateZ
      }}
      transition={{
        duration: pos.duration,
        ease: 'easeInOut'
      }}
    >
      <div style={{ transform: `scaleX(${pos.scaleX})` }} className="w-full h-full transition-transform duration-500">
        <img src="/svg/other/origami-crane.svg" alt="Origami Crane" className="relative w-full h-auto object-contain drop-shadow-xl opacity-80 dark:opacity-60" />
      </div>
    </motion.div>
  );
}

export default function PublicHero() {
  const handleCTA = useCallback(() => scrollToSection('library-content'), [])
  const catClicks = useRef(0)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 }
  const xProgress = useSpring(mouseX, springConfig)
  const yProgress = useSpring(mouseY, springConfig)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5)
      mouseY.set(e.clientY / window.innerHeight - 0.5)
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mouseX, mouseY])

  const btnRef = useRef<HTMLButtonElement>(null)
  const btnX = useMotionValue(0)
  const btnY = useMotionValue(0)
  const btnXSpring = useSpring(btnX, { stiffness: 150, damping: 15, mass: 0.1 })
  const btnYSpring = useSpring(btnY, { stiffness: 150, damping: 15, mass: 0.1 })

  const handleBtnMouseMove = (e: React.MouseEvent) => {
    if (!btnRef.current) return
    const { left, top, width, height } = btnRef.current.getBoundingClientRect()
    const x = e.clientX - (left + width / 2)
    const y = e.clientY - (top + height / 2)
    btnX.set(x * 0.2)
    btnY.set(y * 0.2)
  }
  const handleBtnMouseLeave = () => {
    btnX.set(0)
    btnY.set(0)
  }

  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-charcoal dark:text-white paper-overlay transition-colors duration-500">

      <div className="absolute inset-0 m-auto flex items-center justify-center pointer-events-none opacity-[0.03] dark:opacity-[0.03] mix-blend-multiply dark:mix-blend-screen text-charcoal dark:text-lavender">
        <Logo className="w-[40vw] max-w-[400px] h-auto" />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <motion.div
          className="size-[800px] rounded-full bg-purple-brand/10 dark:bg-purple-brand/15 blur-[120px] mix-blend-multiply dark:mix-blend-screen"
          animate={{ scale: [1, 1.05, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute size-[500px] rounded-full bg-[#8c6b5d]/10 blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      {/* Layer 1: Distant Background */}
      <ParallaxLayer xProgress={xProgress} yProgress={yProgress} depth={0.05}>
        <FloatingMusicNote icon="mdi:music-clef-treble" className="absolute bottom-[30%] left-[20%] size-10 blur-[1px]" duration={10} delay={1} />
        <FloatingMusicNote icon="mdi:music-note-sixteenth" className="absolute top-[25%] left-[15%] size-8 blur-[2px] opacity-50" duration={14} delay={3} />
      </ParallaxLayer>

      {/* Layer 2: Midground */}
      <ParallaxLayer xProgress={xProgress} yProgress={yProgress} depth={0.15}>
        <FloatingMusicNote icon="mdi:music-note-quarter" className="absolute top-[60%] right-[20%] size-12 opacity-60" duration={12} delay={0.5} />

        <FloatingPetal petalIndex={1} className="top-[10%] right-[30%] w-16 h-auto" duration={8} delay={0.2} />
        <FloatingPetal petalIndex={2} className="bottom-[20%] right-[15%] w-12 h-auto" duration={9} delay={1.5} />
      </ParallaxLayer>

      {/* Layer 3: Foreground */}
      <ParallaxLayer xProgress={xProgress} yProgress={yProgress} depth={0.3}>
        <FloatingOrigami className="w-32 h-auto z-10" />

        <FloatingPetal petalIndex={3} className="top-[45%] left-[10%] w-20 h-auto" duration={10} delay={1} />
        <FloatingPetal petalIndex={4} className="bottom-[15%] left-[40%] w-16 h-auto" duration={11} delay={3.5} />

        <FloatingMusicNote icon="mdi:music-note-eighth" className="absolute top-[20%] right-[35%] size-16 opacity-80" duration={8} delay={2} />

        <motion.span className="absolute bottom-[45%] right-[35%] size-2 rounded-full bg-purple-brand/60 dark:bg-white shadow-[0_0_15px_rgba(107,76,154,0.6)] dark:shadow-[0_0_15px_rgba(255,255,255,1)] mix-blend-multiply dark:mix-blend-screen" animate={{ y: [-40, 40, -40], x: [10, -10, 10], opacity: [0.5, 1, 0.5] }} transition={{ ...floatTransition, duration: 5, delay: 1.5 }} />
        <motion.span className="absolute top-[50%] left-[20%] size-2.5 rounded-full bg-purple-brand shadow-[0_0_12px_rgba(107,76,154,0.8)] mix-blend-multiply dark:mix-blend-screen" animate={{ y: [0, -20, 0], opacity: [0.6, 0.9, 0.6] }} transition={{ ...floatTransition, duration: 4, delay: 2 }} />
      </ParallaxLayer>

      {/* Layer 4: The Core Gateway / Cat */}
      <ParallaxLayer xProgress={xProgress} yProgress={yProgress} depth={0.08} className="flex flex-col items-center justify-end pb-24 md:pb-32">
        <div className="relative">
          <motion.div className="w-64 h-10 rounded-[100%] bg-gradient-to-r from-transparent via-purple-brand/20 to-transparent blur-[12px] dark:opacity-70 opacity-40" animate={{ scale: [0.95, 1.05, 0.95] }} transition={{ ...floatTransition, duration: 4 }} />
          <motion.button
            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 text-charcoal/40 dark:text-white/50 transition-colors hover:text-charcoal/70 dark:hover:text-white/90 cursor-pointer outline-none pointer-events-auto"
            animate={{ y: [0, -4, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            onClick={() => {
              catClicks.current += 1
              if (catClicks.current >= 5) {
                catClicks.current = 0
                window.dispatchEvent(new CustomEvent('library:open-gate'))
              }
            }}
            aria-label="Sleeping cat trigger"
          >
            <Icon icon="lucide:cat" className="size-10 drop-shadow-[0_0_15px_rgba(0,0,0,0.1)] dark:drop-shadow-[0_0_15px_rgba(255,255,255,0.3)] transition-transform hover:scale-110 duration-300" />
          </motion.button>
        </div>
      </ParallaxLayer>

      {/* Center Typography */}
      <div className="relative z-10 flex flex-col items-center text-center pointer-events-none mt-[-80px] px-6">
        <div className="overflow-hidden mb-6">
          <motion.p
            className="font-sans text-xs sm:text-sm font-semibold tracking-[0.3em] uppercase text-purple-brand/80 dark:text-lavender/90"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          >
            Purpose in the Process
          </motion.p>
        </div>

        <div className="overflow-hidden py-2 px-2 md:px-10">
          <motion.h1
            className="font-serif text-[3.5rem] sm:text-7xl md:text-[6rem] leading-[1.05] text-charcoal dark:text-white tracking-tight drop-shadow-[0_0_40px_rgba(0,0,0,0.05)] dark:drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            initial={{ y: '100%', opacity: 0, rotateX: -15 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ perspective: 1000 }}
          >
            Pause and <br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-br from-purple-brand via-charcoal to-[#8c6b5d] dark:from-lavender dark:via-white dark:to-[#b19cd9] drop-shadow-[0_0_25px_rgba(107,76,154,0.2)] dark:drop-shadow-[0_0_25px_rgba(230,230,250,0.4)] relative inline-block mt-2 md:mt-0">
              Be With Me
            </span>
          </motion.h1>
        </div>

        <motion.p
          className="mt-8 max-w-2xl font-serif text-lg sm:text-xl text-charcoal/70 dark:text-white/80 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          Time doesn't stop, but please, take a breath. If today was the only certainty you had, how much of yourself would you simply let be?
        </motion.p>

        <motion.div
          className="mt-14 pointer-events-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
        >
          <motion.button
            ref={btnRef}
            onMouseMove={handleBtnMouseMove}
            onMouseLeave={handleBtnMouseLeave}
            onClick={handleCTA}
            style={{ x: btnXSpring, y: btnYSpring }}
            className="group relative overflow-hidden rounded-full bg-white border border-charcoal/10 dark:bg-white/5 dark:border-white/15 shadow-sm px-10 py-5 backdrop-blur-md transition-all duration-300 hover:bg-warm-paper dark:hover:bg-white/10 hover:border-purple-brand/30 dark:hover:border-white/30 hover:shadow-[0_0_40px_rgba(107,76,154,0.15)] dark:hover:shadow-[0_0_40px_rgba(107,76,154,0.5)]"
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-purple-brand/5 dark:via-white/10 to-transparent transition-transform duration-1000 ease-out group-hover:translate-x-full" />
            <span className="relative z-10 flex items-center gap-3 font-sans text-sm font-semibold tracking-[0.15em] uppercase text-charcoal dark:text-white">
              <Icon icon="lucide:sparkles" className="size-4 text-purple-brand dark:text-lavender transition-transform group-hover:rotate-12 group-hover:scale-125" />
              Walk With Ice
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}