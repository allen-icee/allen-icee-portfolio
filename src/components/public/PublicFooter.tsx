import { useState, useEffect, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Icon } from '@iconify/react'

export default function PublicFooter() {
  const containerRef = useRef<HTMLElement>(null)
  const bottomMarkerRef = useRef<HTMLDivElement>(null)
  
  const isFooterInView = useInView(containerRef, { amount: 0.6 })
  const isAtBottom = useInView(bottomMarkerRef)
  
  const [isClosingTime, setIsClosingTime] = useState(false)

  // Hidden interaction: Museum closing time
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>
    if (isFooterInView) {
      timer = setTimeout(() => {
        setIsClosingTime(true)
      }, 5000) // 5 seconds
    } else {
      setIsClosingTime(false)
    }
    return () => clearTimeout(timer)
  }, [isFooterInView])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Lighting changes based on isClosingTime
  const ambientOpacity = isClosingTime ? 0.05 : 0.3
  const spotlightOpacity = isClosingTime ? 0.9 : 0
  
  // Doors only open if we are at the bottom AND it's not closing time
  const shouldDoorsOpen = isAtBottom && !isClosingTime

  return (
    <footer 
      ref={containerRef} 
      className="relative w-full min-h-screen bg-[#141210] dark:bg-[#0A0908] flex flex-col items-center justify-end overflow-hidden transition-colors duration-1000"
    >
      
      {/* Environmental Lighting & Atmosphere */}
      <motion.div 
        animate={{ opacity: ambientOpacity }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,rgba(220,200,180,0.15),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_center,rgba(180,160,180,0.1),transparent_70%)]" 
      />
      
      {/* Closing Time Spotlight */}
      <motion.div 
        animate={{ opacity: spotlightOpacity }}
        transition={{ duration: 3, ease: "easeInOut" }}
        className="pointer-events-none absolute left-1/2 top-1/4 -translate-x-1/2 w-full max-w-2xl h-full bg-[radial-gradient(ellipse_at_top,rgba(255,230,200,0.08),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(200,200,220,0.05),transparent_60%)] z-0 mix-blend-screen"
      />

      {/* Subtle Floating Dust Particles */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden opacity-40 mix-blend-screen">
        <motion.div 
           animate={{ y: [0, -30, 0], opacity: [0, 0.4, 0] }} 
           transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
           className="absolute left-[35%] top-[40%] h-1 w-1 rounded-full bg-white blur-[1px]" 
        />
        <motion.div 
           animate={{ y: [0, -40, 0], x: [0, 15, 0], opacity: [0, 0.3, 0] }} 
           transition={{ duration: 8, repeat: Infinity, ease: "linear", delay: 2 }}
           className="absolute right-[30%] top-[55%] h-1.5 w-1.5 rounded-full bg-orange-100 blur-[2px]" 
        />
        <motion.div 
           animate={{ y: [0, -20, 0], x: [0, -10, 0], opacity: [0, 0.5, 0] }} 
           transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: 1 }}
           className="absolute left-[50%] top-[70%] h-0.5 w-0.5 rounded-full bg-white blur-[1px]" 
        />
      </div>

      {/* The Exit Doors Background (Perspective Container) */}
      <div className="absolute inset-0 z-0 flex justify-center perspective-[1500px]">
        
        {/* Warm volumetric light shining through the parted doors */}
        <motion.div 
          animate={{ opacity: shouldDoorsOpen ? 1 : 0, scale: shouldDoorsOpen ? 1.05 : 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(255,210,140,0.15),transparent_50%)] z-0 mix-blend-screen"
        />
        
        {/* Left Museum Door */}
        <motion.div 
          animate={{ 
            x: shouldDoorsOpen ? '-3%' : '0%', 
            rotateY: shouldDoorsOpen ? 6 : 0,
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute left-0 top-0 bottom-0 w-1/2 bg-[#1F1A18] dark:bg-[#12100F] border-r border-black/60 shadow-[inset_-20px_0_50px_rgba(0,0,0,0.8)] origin-left z-0"
        >
          {/* Decorative panels */}
          <div className="absolute inset-8 md:inset-12 border border-black/20 dark:border-white/5 opacity-50" />
          <div className="absolute inset-y-12 left-12 right-6 border border-black/20 dark:border-white/5 opacity-30" />
          {/* Brass Handle */}
          <div className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-1.5 md:w-2 h-40 bg-gradient-to-b from-[#4A3B32] via-[#614F44] to-[#4A3B32] rounded-sm shadow-[2px_0_5px_rgba(0,0,0,0.5)]" />
        </motion.div>
        
        {/* Right Museum Door */}
        <motion.div 
          animate={{ 
            x: shouldDoorsOpen ? '3%' : '0%', 
            rotateY: shouldDoorsOpen ? -6 : 0,
          }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute right-0 top-0 bottom-0 w-1/2 bg-[#1F1A18] dark:bg-[#12100F] border-l border-black/60 shadow-[inset_20px_0_50px_rgba(0,0,0,0.8)] origin-right z-0"
        >
          {/* Decorative panels */}
          <div className="absolute inset-8 md:inset-12 border border-black/20 dark:border-white/5 opacity-50" />
          <div className="absolute inset-y-12 right-12 left-6 border border-black/20 dark:border-white/5 opacity-30" />
          {/* Brass Handle */}
          <div className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-1.5 md:w-2 h-40 bg-gradient-to-b from-[#4A3B32] via-[#614F44] to-[#4A3B32] rounded-sm shadow-[-2px_0_5px_rgba(0,0,0,0.5)]" />
        </motion.div>
      </div>

      {/* Foreground Content */}
      <div className="relative z-10 w-full max-w-4xl px-6 flex flex-col items-center pb-24 md:pb-32 pt-32">
        
        {/* The Guestbook on Pedestal */}
        <div className="relative mb-24 md:mb-32 flex flex-col items-center">
          
          {/* Guestbook Book Open Spread */}
          <motion.div 
            initial={{ opacity: 0, y: 30, rotateX: 10 }}
            whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="relative z-10 w-full max-w-lg lg:max-w-xl bg-[#F4F1EA] dark:bg-[#EAE4D3] rounded-sm shadow-[0_40px_80px_rgba(0,0,0,0.5),inset_0_0_20px_rgba(0,0,0,0.05)] px-10 py-16 md:px-16 md:py-20 text-center ring-1 ring-black/5"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Book spine/crease shadow */}
            <div className="absolute left-1/2 top-0 bottom-0 w-12 -translate-x-1/2 bg-gradient-to-r from-black/5 via-black/10 to-black/5 mix-blend-multiply opacity-50" />
            
            <div className="relative z-10 flex flex-col items-center gap-8">
              <Icon icon="lucide:pen-tool" className="size-6 text-[#2c2621]/30 mx-auto" />
              <p className="font-serif text-lg md:text-xl lg:text-2xl italic text-[#2c2621] leading-relaxed opacity-85">
                Thank you for visiting.
                <br /><br />
                I hope you enjoyed exploring my collection.
                <br /><br />
                Until next time.
              </p>
            </div>
          </motion.div>
          
          {/* Pedestal Stand (Fades into darkness) */}
          <div className="relative w-56 h-12 bg-[#251F1C] dark:bg-[#151210] mx-auto -mt-6 shadow-[0_15px_30px_rgba(0,0,0,0.8)] z-0 rounded-b-sm border-t border-black/40" />
          <div className="relative w-40 h-40 bg-gradient-to-b from-[#251F1C] to-transparent dark:from-[#151210] mx-auto z-0 opacity-90" />
        </div>

        {/* Action & Branding Area */}
        <motion.div 
          className="flex flex-col items-center gap-20 w-full mt-auto"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.5 }}
        >
          {/* Return to Entrance */}
          <button 
            onClick={scrollToTop}
            className="group flex flex-col items-center gap-4 text-white/40 hover:text-white/90 transition-colors duration-500"
          >
            <div className="p-5 rounded-full border border-white/10 bg-white/5 group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-500 shadow-sm backdrop-blur-sm">
              <Icon icon="lucide:chevron-up" className="size-6 transition-transform duration-500 group-hover:-translate-y-2" />
            </div>
            <span className="font-sans text-[10px] uppercase tracking-[0.25em] font-medium opacity-80">
              Return to Entrance
            </span>
          </button>

          {/* Embossed Museum Stamp */}
          <div className="flex flex-col items-center text-center opacity-30 hover:opacity-60 transition-opacity duration-700 select-none">
            <div className="w-64 h-px bg-white/30 mb-6" />
            <p className="font-sans text-[10px] uppercase tracking-[0.4em] text-white font-medium mb-3">
              Personal Collection
            </p>
            <p className="font-serif text-base text-white mb-3 italic tracking-wide">
              Allen Icee A. Dequiros
            </p>
            <p className="font-sans text-[9px] uppercase tracking-[0.3em] text-white/70 mb-6">
              Est. 2026
            </p>
            <div className="w-64 h-px bg-white/30" />
          </div>

        </motion.div>

      </div>

      {/* Absolute Bottom Marker for Door Trigger */}
      <div ref={bottomMarkerRef} className="absolute bottom-0 w-full h-px opacity-0 pointer-events-none" />
    </footer>
  )
}
