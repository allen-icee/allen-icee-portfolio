import { useState } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'

import { KeeperRecord } from './desk/KeeperRecord'
import { Keychain, Glasses, QuillPen, StickyNote, PoemNote, AnalogClock } from './desk/DeskObjects'
import { GlassesModal } from './desk/GlassesModal'

function Fireflies() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-screen opacity-80 z-[1]">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#FFF59D] shadow-[0_0_8px_rgba(255,245,157,0.8)]"
          style={{
            width: Math.random() * 4 + 2 + 'px',
            height: Math.random() * 4 + 2 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            y: [0, -Math.random() * 100 - 50, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0, Math.random() * 0.8 + 0.2, 0],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  )
}

function LocalFloatingPetal({ className, petalIndex = 1, duration = 10, delay = 0 }: { className?: string, petalIndex?: number, duration?: number, delay?: number }) {
  return (
    <motion.img
      src={`/svg/petals/petal-${petalIndex}.svg`}
      className={`absolute drop-shadow-[0_0_8px_rgba(107,76,154,0.3)] dark:drop-shadow-[0_0_8px_rgba(230,230,250,0.3)] object-contain opacity-60 pointer-events-none z-[1] ${className}`}
      animate={{ y: [-30, 100, -30], x: [-15, 30, -15], rotateZ: [0, 180, 360] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    />
  )
}

export default function PublicAbout() {
  const [showGlasses, setShowGlasses] = useState(false);

  const { scrollYProgress } = useScroll()
  const bgGlowOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

  return (
    <section id="about" className="relative w-full overflow-hidden px-4 py-24 md:px-8 md:py-32 transition-colors duration-700 bg-transparent paper-overlay">
      {/* Top Blend Gradient to blend with Hero above */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-gradient-to-b from-[#FDFBF7] dark:from-[#22201F] to-transparent z-10 pointer-events-none" />

      {/* Glasses Overlay */}
      {showGlasses && <GlassesModal onClose={() => setShowGlasses(false)} />}

      {/* Match PublicHero Glows to Blend smoothly */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[800px] bg-purple-brand/10 dark:bg-purple-brand/15 blur-[120px] mix-blend-multiply dark:mix-blend-screen pointer-events-none"
        style={{ opacity: bgGlowOpacity }}
      />
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="absolute size-[500px] rounded-full bg-[#8c6b5d]/10 blur-[100px] mix-blend-multiply dark:mix-blend-screen" />
      </div>

      <Fireflies />

      {/* Background Petals for About Section */}
      <LocalFloatingPetal petalIndex={1} className="top-[10%] left-[5%] w-6 md:w-8" duration={14} delay={0} />
      <LocalFloatingPetal petalIndex={2} className="top-[40%] right-[10%] w-5 md:w-6" duration={18} delay={2} />
      <LocalFloatingPetal petalIndex={3} className="bottom-[20%] left-[15%] w-7 md:w-10" duration={16} delay={5} />
      <LocalFloatingPetal petalIndex={4} className="top-[70%] right-[25%] w-4 md:w-5" duration={20} delay={1} />

      {/* Glasses positioned top right of the section (Allowed to bleed off) */}
      {/* To position lower, change -top-4 or -top-10 to positive numbers like top-10 sm:top-20 */}
      <div className="absolute -right-4 sm:-right-12 lg:-right-20 -top-4 sm:-top-1 z-20 pointer-events-auto">
        {/* Desktop full glasses */}
        <div className="hidden lg:block">
          <Glasses onClick={() => setShowGlasses(true)} />
        </div>
        {/* Mobile/Tablet icon button */}
        <div 
          className="lg:hidden cursor-pointer bg-[#F5F5DC]/80 dark:bg-[#3E2723]/80 backdrop-blur-sm p-3 rounded-full border border-black/10 dark:border-white/10 shadow-lg hover:scale-110 transition-transform mt-8 mr-8"
          onClick={() => setShowGlasses(true)}
          title="View Glasses"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#4E342E] dark:text-[#EAE0D5]">
            <circle cx="6" cy="15" r="4"/><circle cx="18" cy="15" r="4"/><path d="M14 15a2 2 0 0 0-4 0"/><path d="M2.5 13 6 7c.7-1.5 2.5-2 4-1.5L12 7l2-1.5c1.5-.5 3.3 0 4 1.5l3.5 6"/>
          </svg>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1400px]">
        {/* Section Heading */}
        <motion.div
          className="mb-16 md:mb-24 text-center md:text-left md:ml-[10%] relative z-30"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="font-serif text-3xl md:text-5xl font-bold tracking-tight text-[#4E342E] dark:text-[#EAE0D5] drop-shadow-sm dark:drop-shadow-md mb-4">
            Want to know About Me?
          </h2>
          <p className="font-sans text-sm md:text-base tracking-widest uppercase text-[#8B5A2B] dark:text-[#FFB74D]/80">
            Hmmm! You're interested in me?
          </p>
        </motion.div>

        {/* Asymmetrical Desk Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start justify-center relative">

          {/* LEFT: Journal and Left Objects */}
          <div className="w-full lg:w-[65%] shrink-0 flex items-end relative">

            {/* Quill Ink Overlaying Bottom Left */}
            <motion.div
              className="absolute -left-12 sm:-left-20 -bottom-8 sm:-bottom-12 z-40 w-32 h-32 sm:w-48 sm:h-48 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <img src="/svg/other/quill-ink.svg" alt="Ink Bottle" className="w-full h-full object-contain filter drop-shadow-[0_30px_40px_rgba(0,0,0,0.8)] dark:drop-shadow-[0_30px_40px_rgba(0,0,0,0.9)]" />
            </motion.div>

            {/* Quill Pen Overlaying Bottom Right */}
            <motion.div
              className="hidden lg:block absolute -right-16 sm:-right-[19rem] -bottom-16 sm:bottom-5 z-50 pointer-events-none"
              initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
              whileInView={{ opacity: 1, scale: 0.7, rotate: -15 }}
              viewport={{ once: true }}
            >
              <QuillPen />
            </motion.div>

            {/* The Physical Journal Container */}
            <motion.div
              className="relative flex flex-col overflow-hidden rounded-r-2xl rounded-l-md bg-[#FDFBF7] shadow-[20px_30px_60px_rgba(0,0,0,0.4)] dark:bg-[#22201F] dark:shadow-[20px_30px_60px_rgba(0,0,0,0.8)] md:flex-row md:rounded-2xl rotate-[-1deg] transform-origin-center w-full"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >

              {/* Paper stacking edges (bottom & right) */}
              <div className="pointer-events-none absolute bottom-0 right-0 top-0 w-[4px] border-l border-black/5 bg-[repeating-linear-gradient(to_bottom,#f5f5f5,#f5f5f5_2px,#e0e0e0_2px,#e0e0e0_4px)] opacity-50 dark:border-black/40 dark:bg-[repeating-linear-gradient(to_bottom,#333,#333_2px,#222_2px,#222_4px)]" />
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-[4px] border-t border-black/5 bg-[repeating-linear-gradient(to_right,#f5f5f5,#f5f5f5_2px,#e0e0e0_2px,#e0e0e0_4px)] opacity-50 dark:border-black/40 dark:bg-[repeating-linear-gradient(to_right,#333,#333_2px,#222_2px,#222_4px)]" />

              {/* Center Spine (Desktop only) */}
              <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-12 -translate-x-1/2 bg-gradient-to-r from-transparent via-black/10 to-transparent dark:via-black/50 md:block z-10" />
              <div className="pointer-events-none absolute bottom-0 left-1/2 top-0 hidden w-px -translate-x-1/2 bg-black/10 dark:bg-black/80 shadow-[1px_0_2px_rgba(255,255,255,0.5)] dark:shadow-[1px_0_2px_rgba(255,255,255,0.1)] md:block z-10" />

              {/* Bookmark Ribbon */}
              <div
                className="absolute top-0 right-[15%] w-5 h-28 bg-purple-brand filter drop-shadow-md z-0 transform -translate-y-2"
                style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 12px), 0 100%)' }}
              />

              {/* Left Page */}
              <div className="relative w-full p-8 md:w-1/2 md:p-12 lg:p-16">
                {/* Ruled lines background */}
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_31px,#e5e7eb_31px,#e5e7eb_32px)] opacity-60 dark:bg-[repeating-linear-gradient(transparent,transparent_31px,#ffffff10_31px,#ffffff10_32px)]" style={{ backgroundPositionY: '2.5rem' }} />

                {/* Margin line */}
                <div className="pointer-events-none absolute bottom-0 left-8 top-0 w-px bg-red-400/30 dark:bg-red-500/20 md:left-12 lg:left-16" />

                <div className="relative z-10 ml-4">
                  <div className="mb-6 border-b border-charcoal/10 pb-2 dark:border-white/10 md:mb-8 md:pb-4 flex justify-between items-end">
                    <h2 className="font-serif text-2xl font-medium tracking-tight text-charcoal md:text-3xl dark:text-[#EAE0D5]">
                      To Every Species
                    </h2>
                    <span className="font-body text-xs text-charcoal/40 dark:text-[#EAE0D5]/40 italic" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
                      Oct 30
                    </span>
                  </div>

                  <div className="prose max-w-none font-body text-[13px] leading-6 text-charcoal/80 dark:text-[#EAE0D5]/80 md:text-sm md:leading-7 [&_p]:mb-6 [&_p:last-child]:mb-0 [&_p]:break-words">
                    <p>Well look at you. You actually clicked the About section. Good job taking the initiative to get to know me!</p>
                    <p>So my name is Allen Icee Dequiros. Most people out in the real world call me Allen, but my family calls me Ice. Since you made it this far into my little space, you can just call me Ice too.</p>
                    <p>I am technically a web developer, but let us be real, I mostly just vibe code most of the time lol. I do digital arts as well. I am not trying to master it or anything though. I just do it for fun hehe. When I am not doing all of that, you can find me wandering through my thoughts, surviving on ice cream, living in the color gray, and consuming amount of books, manga, manhwas, anime, and movies.</p>

                    {/* Mobile-only content that flows to right page on desktop */}
                    <div className="md:hidden">
                      <p className="mt-8">I am a very curious fellow who is always interested in learning all kinds of new things since what's there to lose. If you ever feel like no one is there for you, I won't be there too TT_TT but you do need a counselor for your deep life problems? I got you. Do you need a professional judger to roast your bad choices? I definitely got you lol.</p>
                      <p>Adulting is really hard, and life is definitely scary, but try to move forward with me even on the days it's terrifying, ok. At the end of the day, the ones who make it all worth it are the ones we love the most.</p>
                      <p>Anyway, thanks for taking the time to know me. Oh, and I am highly open to taking donations lol since I'm broke (≧▽≦).</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Page (Visible on Desktop) */}
              <div className="relative hidden w-1/2 p-8 md:flex md:flex-col md:p-12 lg:p-16">
                {/* Ruled lines background */}
                <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(transparent,transparent_31px,#e5e7eb_31px,#e5e7eb_32px)] opacity-60 dark:bg-[repeating-linear-gradient(transparent,transparent_31px,#ffffff10_31px,#ffffff10_32px)]" style={{ backgroundPositionY: '2.5rem' }} />

                <div className="relative z-10 ml-4 flex h-full flex-col">
                  <div className="flex justify-end opacity-40 mb-2 lg:mb-6">
                    <span className="font-serif text-sm">Pg. 20</span>
                  </div>

                  <div className="prose max-w-none font-body text-[13px] leading-6 text-charcoal/80 dark:text-[#EAE0D5]/80 md:text-sm md:leading-7 [&_p]:mb-6 [&_p:last-child]:mb-0 [&_p]:break-words pt-4 lg:pt-8">
                    <p>I am a very curious fellow who is always interested in learning all kinds of new things since what's there to lose. If you ever feel like no one is there for you, I won't be there too TT_TT but you do need a counselor for your deep life problems? I got you. Do you need a professional judger to roast your bad choices? I definitely got you lol.</p>
                    <p>Adulting is really hard, and life is definitely scary, but try to move forward with me even on the days it's terrifying, ok. At the end of the day, the ones who make it all worth it are the ones we love the most.</p>
                    <p>Anyway, thanks for taking the time to know me. Oh, and I am highly open to taking donations lol since I'm broke (≧▽≦).</p>
                  </div>

                  <div className="mt-auto pt-8 flex justify-end">
                    <motion.p
                      className="font-serif text-xl italic text-purple-brand/80 dark:text-lavender/90 font-medium transform -rotate-2"
                      style={{ fontFamily: '"Brush Script MT", cursive, font-serif' }}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      Sincerely, Ice
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
                    Sincerely, Ice
                  </motion.p>
                </div>
              </div>

            </motion.div>
          </div>

          {/* RIGHT: Desk Objects (35% width on desktop) */}
          <motion.div
            className="w-full lg:w-[35%] relative flex flex-col gap-12 sm:gap-16 lg:gap-20 items-center justify-center lg:items-start lg:pl-10 mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
          >
            {/* Top row of objects */}
            <div className="flex flex-row flex-wrap gap-8 sm:gap-12 w-full justify-center lg:justify-start items-center z-10 shrink-0">
              <PoemNote className="w-40 sm:w-auto mt-0 ml-0 lg:mt-10 lg:-ml-10" />
              <StickyNote
                title="Building"
                content="Me, Myself, and Icee."
                color="bg-[#E1BEE7] dark:bg-[#CE93D8]/90"
                rotate="-rotate-7"
                className="mt-6 ml-0 lg:mt-[7.5rem] lg:ml-12 w-40 sm:w-auto relative z-0 transition-colors"
              />
            </div>

            {/* The Record Player, Watch & Keychain */}
            <div className="relative flex flex-col xl:flex-row items-center justify-center lg:justify-start gap-4 sm:gap-8 w-full z-20 mt-8">
              <div className="relative mt-0 ml-0 lg:mt-10 lg:ml-10">
                <KeeperRecord />
                {/* Overflows from Record */}
                {/* To manipulate position, change -right-8 or -top-12 to different numbers */}
                <div className="absolute -right-8 sm:-right-20 -top-28 sm:-top-44 z-40 scale-[0.7] sm:scale-100 origin-bottom transition-transform">
                  <Keychain />
                </div>
              </div>
              {/* The Watch (AnalogClock) */}
              <div className="mt-8 xl:mt-0 z-30 ml-0 lg:-ml-10">
                <AnalogClock />
              </div>
            </div>

          </motion.div>

        </div>
      </div>
    </section>
  )
}
