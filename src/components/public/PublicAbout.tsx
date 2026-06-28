import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebaseConfig'
import { mockJournal } from '../../utils/mockData'

import { KeeperRecord } from './desk/KeeperRecord'
import { SleepingCat } from './desk/SleepingCat'
import { CoffeeMug, FountainPen, ReadingGlasses, StickyNote } from './desk/DeskObjects'

function DustParticles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-40 dark:opacity-20">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#FFD54F]"
          style={{
            width: Math.random() * 4 + 1 + 'px',
            height: Math.random() * 4 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -Math.random() * 100 - 50],
            x: [0, Math.random() * 50 - 25],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'linear',
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  )
}

export default function PublicAbout() {
  const [title, setTitle] = useState(mockJournal.title)
  const [bodyHTML, setBodyHTML] = useState('')
  const [signature, setSignature] = useState('')
  const [ready, setReady] = useState(false)

  const { scrollYProgress } = useScroll()
  const bgGlowOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const snap = await getDoc(doc(db, 'settings', 'journal'))
        if (cancelled) return

        if (snap.exists()) {
          const data = snap.data()
          setTitle(data.title ?? mockJournal.title)
          setBodyHTML(data.body ?? mockJournal.body)
          setSignature(data.signature ?? mockJournal.signature)
        } else {
          setBodyHTML(mockJournal.body)
          setSignature(mockJournal.signature)
        }
      } catch {
        if (!cancelled) {
          setBodyHTML(mockJournal.body)
          setSignature(mockJournal.signature)
        }
      } finally {
        if (!cancelled) setReady(true)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  if (!ready) return null

  return (
    <section id="about" className="relative w-full overflow-hidden px-4 py-24 md:px-8 md:py-32 transition-colors duration-700">

      {/* Wood Texture / Noise Overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03] dark:opacity-[0.02]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
      
      {/* Amber Light Glow */}
      <motion.div 
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(255,183,77,0.15),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,167,38,0.08),transparent_70%)] pointer-events-none"
        style={{ opacity: bgGlowOpacity }}
      />

      <DustParticles />

      <div className="relative mx-auto max-w-[1400px]">
        {/* Section Heading */}
        <motion.div 
          className="mb-16 md:mb-24 text-center md:text-left md:ml-[10%] relative z-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#4E342E] dark:text-[#EAE0D5] drop-shadow-sm dark:drop-shadow-md mb-4">
            The Keeper's Desk
          </h2>
          <p className="font-sans text-sm md:text-base tracking-widest uppercase text-[#8B5A2B] dark:text-[#FFB74D]/80">
            "Every safe space has someone quietly keeping the light on."
          </p>
        </motion.div>

        {/* Asymmetrical Desk Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-center">
          
          {/* LEFT: The Journal (60-65% width on desktop) */}
          <motion.div
            className="w-full lg:w-[60%] shrink-0 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            {/* The Physical Journal Container */}
            <div className="relative flex flex-col overflow-hidden rounded-r-2xl rounded-l-md bg-[#FDFBF7] shadow-[20px_30px_60px_rgba(0,0,0,0.4)] dark:bg-[#22201F] dark:shadow-[20px_30px_60px_rgba(0,0,0,0.8)] md:flex-row md:rounded-2xl rotate-[-1deg] transform-origin-center">
              
              {/* Paper stacking edges (bottom & right) */}
              <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[4px] border-l border-black/5 bg-[repeating-linear-gradient(to_bottom,#f5f5f5,#f5f5f5_2px,#e0e0e0_2px,#e0e0e0_4px)] opacity-50 dark:border-black/40 dark:bg-[repeating-linear-gradient(to_bottom,#333,#333_2px,#222_2px,#222_4px)]" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[4px] border-t border-black/5 bg-[repeating-linear-gradient(to_right,#f5f5f5,#f5f5f5_2px,#e0e0e0_2px,#e0e0e0_4px)] opacity-50 dark:border-black/40 dark:bg-[repeating-linear-gradient(to_right,#333,#333_2px,#222_2px,#222_4px)]" />

              {/* Center Spine (Desktop only) */}
              <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-black/50 md:block z-10" />
              <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-black/10 dark:bg-black/80 shadow-[1px_0_2px_rgba(255,255,255,0.5)] dark:shadow-[1px_0_2px_rgba(255,255,255,0.1)] md:block z-10" />

              {/* Bookmark Ribbon */}
              <div className="absolute top-0 right-[20%] w-3 h-24 bg-[#8B0000] shadow-md z-0 transform -translate-y-2 rounded-b-sm" />

              {/* Coffee Stain Ring */}
              <span className="pointer-events-none absolute -right-16 -top-16 size-48 rounded-full border-[3px] border-[#8B5A2B]/20 dark:border-[#8B5A2B]/40 blur-[1px] mix-blend-multiply dark:mix-blend-color-burn z-0" aria-hidden />

              {/* Left Page */}
              <div className="relative w-full p-8 md:w-1/2 md:p-12 lg:p-16">
                {/* Ruled lines background */}
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_31px,#e5e7eb_31px,#e5e7eb_32px)] opacity-60 dark:bg-[repeating-linear-gradient(transparent,transparent_31px,#ffffff10_31px,#ffffff10_32px)]" style={{ backgroundPositionY: '2.5rem' }} />
                
                {/* Margin line */}
                <div className="pointer-events-none absolute bottom-0 left-8 top-0 w-px bg-red-400/30 dark:bg-red-500/20 md:left-12 lg:left-16" />

                <div className="relative z-10 ml-4">
                  <div className="mb-6 border-b border-charcoal/10 pb-2 dark:border-white/10 md:mb-8 md:pb-4 flex justify-between items-end">
                    <h2 className="font-serif text-2xl font-medium tracking-tight text-charcoal md:text-3xl dark:text-[#EAE0D5]">
                      {title}
                    </h2>
                    <span className="font-body text-xs text-charcoal/40 dark:text-[#EAE0D5]/40 italic" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
                      Nov 11
                    </span>
                  </div>

                  <div
                    className="prose prose-sm max-w-none font-body leading-8 text-charcoal/80 dark:text-[#EAE0D5]/80 md:prose-base [&_p]:mb-8 [&_p:last-child]:mb-0 [&_p]:break-words"
                    dangerouslySetInnerHTML={{ __html: bodyHTML }}
                  />
                </div>
              </div>

              {/* Right Page (Visible on Desktop) */}
              <div className="relative hidden w-1/2 p-8 md:block md:p-12 lg:p-16">
                {/* Ruled lines background */}
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_31px,#e5e7eb_31px,#e5e7eb_32px)] opacity-60 dark:bg-[repeating-linear-gradient(transparent,transparent_31px,#ffffff10_31px,#ffffff10_32px)]" style={{ backgroundPositionY: '2.5rem' }} />
                
                <div className="relative z-10 ml-4 flex h-full flex-col justify-between">
                  <div className="flex justify-end opacity-40">
                    <span className="font-serif text-sm">Pg. 42</span>
                  </div>
                  
                  <div className="mt-auto pt-12 flex justify-end">
                    <motion.p
                      className="font-serif text-xl italic text-purple-brand/80 dark:text-lavender/90 font-medium transform -rotate-2"
                      style={{ fontFamily: '"Brush Script MT", cursive, font-serif' }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      {signature}
                    </motion.p>
                  </div>
                </div>
              </div>

              {/* Mobile Signature */}
              <div className="relative p-8 pt-0 md:hidden border-t border-black/5 dark:border-white/5 mt-8">
                <div className="relative z-10 ml-4 pt-4 flex justify-end">
                  <motion.p
                    className="font-serif text-xl italic text-purple-brand/80 dark:text-lavender/90 font-medium transform -rotate-2"
                    style={{ fontFamily: '"Brush Script MT", cursive, font-serif' }}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    {signature}
                  </motion.p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* RIGHT: Desk Objects (35% width on desktop) */}
          <motion.div
            className="w-full lg:w-[35%] relative flex flex-row flex-wrap lg:flex-col gap-8 sm:gap-12 lg:gap-10 items-center justify-center lg:items-start lg:pl-10 mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            {/* Top row of objects */}
            <div className="flex gap-8 sm:gap-12 w-full justify-center lg:justify-start items-end z-10 shrink-0">
              <CoffeeMug />
              <ReadingGlasses />
            </div>

            {/* The Record */}
            <div className="w-auto flex justify-center lg:justify-start z-20 mt-2 lg:mt-8 rotate-2 shrink-0">
              <KeeperRecord />
            </div>

            {/* Sticky Notes */}
            <div className="flex flex-col sm:flex-row gap-6 w-full justify-center lg:justify-start z-10 mt-6 lg:-ml-6 shrink-0">
              <StickyNote 
                title="Currently Reading" 
                content="The Name of the Wind" 
                color="bg-[#FFF9C4] dark:bg-[#FFF59D]/90" 
                rotate="-rotate-3" 
                className="w-40 sm:w-auto"
              />
              <StickyNote 
                title="Building" 
                content="A quiet space" 
                color="bg-[#FFCC80] dark:bg-[#FFB74D]/90" 
                rotate="rotate-6"
                className="mt-2 sm:mt-6 w-40 sm:w-auto"
              />
            </div>

            {/* The Cat & Pen */}
            <div className="flex flex-row gap-8 sm:gap-16 w-full justify-center lg:justify-end items-end z-30 mt-8 lg:mt-10 shrink-0">
              <div className="mb-4">
                <FountainPen />
              </div>
              <div className="bg-[#2A1F1B]/10 dark:bg-[#0A080C]/40 p-4 rounded-full shadow-[inset_0_5px_15px_rgba(0,0,0,0.1)] dark:shadow-[inset_0_5px_15px_rgba(0,0,0,0.5)] blur-[0.5px]">
                <SleepingCat />
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}
