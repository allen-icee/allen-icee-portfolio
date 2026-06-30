// src/components/public/sections/PublicHero.tsx
import { useCallback, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Icon } from '@iconify/react'
import type Lenis from 'lenis'
import { Logo } from '../../ui/Logo'
import { Fireflies, FloatingPetal } from '../../ui/Particles'

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

function FloatingOrigami({ className }: { className?: string }) {
  const [pos, setPos] = useState({
    x: -20, y: 20, rotateZ: 25, scaleX: 1, duration: 0, direction: 1
  });

  useEffect(() => {

    setPos({ x: -20, y: 20, rotateZ: 25, scaleX: 1, duration: 0, direction: 1 });

    const moveBird = () => {
      setPos(prev => {
        let isIdle = Math.random() > 0.6; 

        if (prev.x < -10 || prev.x > 110) {
          isIdle = false;
        }

        if (isIdle) {

          return {
            ...prev,
            x: prev.x + (Math.random() * 4 - 2),
            y: prev.y + (Math.random() * 4 - 2),
            duration: 4 + Math.random() * 4
          };
        } else {
          let newDirection = prev.direction;

          if (prev.direction === 1 && prev.x > 110) {
            newDirection = -1;
          } else if (prev.direction === -1 && prev.x < -10) {
            newDirection = 1;
          }

          let newX;

          if (newDirection === 1) {

            newX = prev.x + 20 + Math.random() * 40;
            if (newX > 120) newX = 120;
          } else {

            newX = prev.x - (20 + Math.random() * 40);
            if (newX < -20) newX = -20;
          }

          let dyBase = (Math.random() - 0.5) * 30; 
          let newY = prev.y + dyBase;
          if (newY < 5) newY = 5;
          if (newY > 75) newY = 75;

          const dx = newX - prev.x;
          const dy = newY - prev.y;

          let pitch = (Math.atan2(dy, Math.abs(dx)) * 180) / Math.PI;

          if (pitch > 30) pitch = 30;
          if (pitch < -30) pitch = -30;

          let rotateZ;
          if (newDirection === 1) {

            rotateZ = pitch + 45;
          } else {

            rotateZ = -45 - pitch;
          }

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
  const [quote, setQuote] = useState("Sometimes, understanding someone else helps us better understand ourselves. Welcome to mine!")
  const [displayedQuote, setDisplayedQuote] = useState("")
  const [isTyping, setIsTyping] = useState(false)

  const fetchQuote = useCallback(async () => {
    try {
      let validQuote = false;
      let newQuote = "";
      let attempts = 0;

      const BAD_WORDS = ['allah', 'buddha', 'islam', 'quran'];

      while (!validQuote && attempts < 5) {
        const res = await fetch('https://dummyjson.com/quotes/random')
        const data = await res.json()

        if (data && data.quote) {
          const textLower = data.quote.toLowerCase()

          const hasFilteredWord = BAD_WORDS.some(word => textLower.includes(word))

          if (!hasFilteredWord) {
            newQuote = `"${data.quote}" — ${data.author}`
            validQuote = true;
          }
        }
        attempts++;
      }

      if (validQuote) {
        setQuote(newQuote)
      }
    } catch (e) {
      console.error(e)
    }
  }, [])

  useEffect(() => {
    fetchQuote()
  }, [fetchQuote])

  useEffect(() => {
    if (!quote) return
    setIsTyping(true)
    let i = 0
    setDisplayedQuote("")

    const interval = setInterval(() => {
      setDisplayedQuote(quote.slice(0, i + 1))
      i++
      if (i >= quote.length) {
        clearInterval(interval)
        setIsTyping(false)
      }
    }, 40) 

    return () => clearInterval(interval)
  }, [quote])

  useEffect(() => {
    if (isTyping || !quote) return
    const timer = setTimeout(() => {
      fetchQuote()
    }, 10000)
    return () => clearTimeout(timer)
  }, [isTyping, quote, fetchQuote])
  const handleCTA = useCallback(() => scrollToSection('library-content'), [])

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

  return (
    <section id="home" className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden text-charcoal dark:text-white paper-overlay transition-colors duration-500">

      <div className="absolute inset-0 m-auto flex items-center justify-center pointer-events-none opacity-[0.03] dark:opacity-[0.05] mix-blend-multiply dark:mix-blend-screen text-charcoal dark:text-lavender">
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

      <ParallaxLayer xProgress={xProgress} yProgress={yProgress} depth={0.05}>
        <FloatingMusicNote icon="mdi:music-clef-treble" className="absolute bottom-[30%] left-[20%] size-10 blur-[1px]" duration={10} delay={1} />
        <FloatingMusicNote icon="mdi:music-note-sixteenth" className="absolute top-[25%] left-[15%] size-8 blur-[2px] opacity-50" duration={14} delay={3} />
      </ParallaxLayer>

      <ParallaxLayer xProgress={xProgress} yProgress={yProgress} depth={0.15}>
        <FloatingMusicNote icon="mdi:music-note-quarter" className="absolute top-[60%] right-[20%] size-12 opacity-60" duration={12} delay={0.5} />

        <FloatingPetal petalIndex={1} className="top-[10%] right-[30%] w-16 h-auto" duration={8} delay={0.2} />
        <FloatingPetal petalIndex={2} className="bottom-[20%] right-[15%] w-12 h-auto" duration={9} delay={1.5} />
      </ParallaxLayer>

      <ParallaxLayer xProgress={xProgress} yProgress={yProgress} depth={0.3}>
        <FloatingOrigami className="w-32 h-auto z-10" />

        <FloatingPetal petalIndex={3} className="top-[45%] left-[10%] w-20 h-auto" duration={10} delay={1} />
        <FloatingPetal petalIndex={4} className="bottom-[15%] left-[40%] w-16 h-auto" duration={11} delay={3.5} />

        <FloatingMusicNote icon="mdi:music-note-eighth" className="absolute top-[20%] right-[35%] size-16 opacity-80" duration={8} delay={2} />

        <FloatingPetal petalIndex={1} className="w-8 md:w-12 top-[10%] left-[20%]" duration={12} delay={0} />
        <FloatingPetal petalIndex={2} className="w-6 md:w-8 top-[30%] right-[15%]" duration={15} delay={2} />

        <Fireflies />

        <motion.span className="absolute bottom-[45%] right-[35%] size-2 rounded-full bg-purple-brand/60 dark:bg-white shadow-[0_0_15px_rgba(107,76,154,0.6)] dark:shadow-[0_0_15px_rgba(255,255,255,1)] mix-blend-multiply dark:mix-blend-screen" animate={{ y: [-40, 40, -40], x: [10, -10, 10], opacity: [0.5, 1, 0.5] }} transition={{ ...floatTransition, duration: 5, delay: 1.5 }} />
        <motion.span className="absolute top-[50%] left-[20%] size-2.5 rounded-full bg-purple-brand shadow-[0_0_12px_rgba(107,76,154,0.8)] mix-blend-multiply dark:mix-blend-screen" animate={{ y: [0, -20, 0], opacity: [0.6, 0.9, 0.6] }} transition={{ ...floatTransition, duration: 4, delay: 2 }} />
      </ParallaxLayer>

      <div className="relative z-10 flex flex-col items-center text-center pointer-events-none px-6 mt-8 sm:mt-16">
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

        <div className="overflow-visible py-2 px-2 md:px-10">
          <motion.h1
            className="font-serif text-[3.5rem] sm:text-7xl md:text-[6rem] leading-[1.05] text-charcoal dark:text-white tracking-tight drop-shadow-[0_0_40px_rgba(0,0,0,0.05)] dark:drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]"
            initial={{ y: '100%', opacity: 0, rotateX: -15 }}
            animate={{ y: 0, opacity: 1, rotateX: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
            style={{ perspective: 1000 }}
          >
            What Makes<br />
            <span className="italic font-light text-transparent bg-clip-text bg-gradient-to-br from-purple-brand via-charcoal to-[#8c6b5d] dark:from-lavender dark:via-white dark:to-[#b19cd9] drop-shadow-[0_0_25px_rgba(107,76,154,0.2)] dark:drop-shadow-[0_0_25px_rgba(230,230,250,0.4)] relative inline-block mt-2 md:mt-0 pr-6">
              You, You?
            </span>
          </motion.h1>
        </div>

        <motion.div
          className="mt-8 max-w-2xl font-serif text-lg sm:text-xl text-charcoal/70 dark:text-white/80 leading-relaxed min-h-[80px]"
        >
          {displayedQuote}
          <motion.span
            animate={{ opacity: [1, 0, 1] }}
            transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
            className="inline-block ml-1 font-sans font-light"
            style={{ transform: 'translateY(-2px)' }}
          >
            |
          </motion.span>
          <div className="mt-4 text-sm opacity-60 font-sans tracking-widest select-none">
            ⊂(≽^•⩊•^≼)つ
          </div>
        </motion.div>

        <motion.div
          className="mt-16 flex flex-col items-center justify-center relative pointer-events-auto"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.1 }}
          style={{
            x: useTransform(xProgress, [0, 1], [-30, 30]),
            y: useTransform(yProgress, [0, 1], [-30, 30]),
          }}
        >

          <motion.button
            onClick={handleCTA}
            className="relative z-20 mb-0 font-sans text-sm sm:text-base font-bold tracking-[0.3em] uppercase text-purple-brand dark:text-lavender hover:text-purple-brand/80 dark:hover:text-lavender/80 transition-colors drop-shadow-[0_0_10px_rgba(107,76,154,0.6)]"
            whileTap={{ scale: 0.95 }}
            animate={{ y: [-3, 3, -3] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            Who is Ice?
          </motion.button>

          <motion.div
            className="relative w-48 h-48 sm:w-64 sm:h-64 cursor-pointer -mt-20 sm:-mt-24"
            onClick={handleCTA}
          >
            <div className="absolute inset-0 bg-purple-brand/20 dark:bg-lavender/20 blur-[60px] rounded-full transition-all duration-500 hover:bg-purple-brand/30 dark:hover:bg-lavender/30" />

            <div className="absolute inset-0 z-10 flex items-center justify-center p-8">
              <motion.img
                src="/svg/other/book-paging.svg"
                alt="Animated Book"
                className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(107,76,154,0.6)] dark:drop-shadow-[0_0_15px_rgba(216,180,254,0.6)] dark:brightness-100 brightness-0 opacity-70 dark:opacity-100"
              />
            </div>

            {[...Array(12)].map((_, i) => {
              const chars = ['ᔑ', 'ʖ', 'ᓵ', '↸', 'ᒷ', '⎓', '⊣', '⍑', '╎', '⋮', 'ꖌ', 'ꖎ', 'ᒲ', 'リ', '𝙹', '!¡', 'ᑑ', '∷', 'ᓭ', 'ℸ', '⚍', '⍊', '∴', 'x', '||', '⨅']
              const randomChar = chars[Math.floor(Math.random() * chars.length)]
              return (
                <motion.div
                  key={i}
                  className="absolute top-[65%] left-1/2 z-20 font-sans text-xs font-bold text-purple-400 dark:text-lavender pointer-events-none drop-shadow-[0_0_8px_currentColor] -translate-x-1/2 -translate-y-1/2"
                  initial={{ x: 0, y: 0, opacity: 0, scale: 0.2 }}
                  animate={{
                    x: (Math.random() - 0.5) * 80,
                    y: -20 - Math.random() * 60,
                    opacity: [0, 1, 0],
                    scale: [0.5, 1.2, 0.5],
                    rotate: [0, Math.random() * 180 - 90]
                  }}
                  transition={{
                    duration: 3 + Math.random() * 4,
                    repeat: Infinity,
                    delay: Math.random() * 3,
                    ease: "easeOut"
                  }}
                >
                  {randomChar}
                </motion.div>
              )
            })}
          </motion.div>
        </motion.div>
      </div>

    </section>
  )
}