import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

export function CoffeeMug() {
  return (
    <motion.div 
      className="group relative flex flex-col items-center cursor-pointer"
      whileHover="hover"
    >
      {/* Steam */}
      <div className="absolute -top-10 flex gap-1 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-700">
        <motion.div 
          className="w-1 h-8 rounded-full bg-white/20 dark:bg-white/10 blur-[2px]"
          variants={{ hover: { y: -15, opacity: [0, 0.5, 0], scaleY: [1, 1.5, 1], transition: { duration: 2, repeat: Infinity, ease: 'linear' } } }}
        />
        <motion.div 
          className="w-1.5 h-10 rounded-full bg-white/20 dark:bg-white/10 blur-[3px]"
          variants={{ hover: { y: -20, opacity: [0, 0.6, 0], scaleY: [1, 1.2, 1], transition: { duration: 2.5, repeat: Infinity, ease: 'linear', delay: 0.5 } } }}
        />
        <motion.div 
          className="w-1 h-6 rounded-full bg-white/20 dark:bg-white/10 blur-[2px]"
          variants={{ hover: { y: -10, opacity: [0, 0.4, 0], scaleY: [1, 1.3, 1], transition: { duration: 1.8, repeat: Infinity, ease: 'linear', delay: 1 } } }}
        />
      </div>

      {/* Mug Body (CSS drawing) */}
      <div className="relative z-10 w-14 h-16 rounded-b-xl rounded-t-sm bg-gradient-to-br from-[#EAE0D5] to-[#C8B8A6] dark:from-[#2A2A2D] dark:to-[#1A1A1C] shadow-lg border border-white/40 dark:border-white/5 flex items-start justify-center pt-1">
        <div className="w-12 h-3 rounded-[100%] bg-[#5C3A21] shadow-[inset_0_2px_4px_rgba(0,0,0,0.5)] border border-[#3E2723]" />
      </div>
      {/* Mug Handle */}
      <div className="absolute -right-3 top-3 w-6 h-10 rounded-r-full border-4 border-[#C8B8A6] dark:border-[#1A1A1C] border-l-0" />
    </motion.div>
  )
}

export function FountainPen() {
  return (
    <motion.div 
      className="group relative flex items-center cursor-pointer rotate-[35deg]"
      whileHover="hover"
    >
      {/* Ink Sparkle */}
      <motion.span 
        className="absolute -left-2 top-1/2 -translate-y-1/2 size-2 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,1)] opacity-0 pointer-events-none"
        variants={{ hover: { opacity: [0, 1, 0], scale: [0.5, 1.5, 0.5], transition: { duration: 1.5, repeat: Infinity } } }}
      />
      
      {/* Nib */}
      <div className="w-4 h-2 rounded-l-full bg-gradient-to-r from-yellow-300 to-yellow-600 shadow-sm border-r border-black/20" />
      {/* Body */}
      <div className="w-24 h-3 rounded-r-sm bg-gradient-to-b from-[#1A1A1C] via-[#2A2A2D] to-[#0A0A0C] shadow-md flex items-center px-1">
        <div className="w-full h-px bg-white/10" />
      </div>
      {/* Cap/End */}
      <div className="w-2 h-3 rounded-r-md bg-yellow-600" />
    </motion.div>
  )
}

export function ReadingGlasses() {
  return (
    <motion.div 
      className="group relative flex gap-1 cursor-pointer"
      whileHover="hover"
    >
      {/* Left Lens */}
      <div className="relative w-12 h-8 rounded-[40%_40%_50%_50%] border-2 border-amber-900/80 shadow-[2px_2px_4px_rgba(0,0,0,0.2)] bg-blue-100/10 backdrop-blur-[1px] overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -rotate-45 -translate-x-full"
          variants={{ hover: { translateX: ['-100%', '100%'], transition: { duration: 0.8, ease: 'easeInOut' } } }}
        />
      </div>
      {/* Bridge */}
      <div className="w-3 h-1 mt-2 rounded-t-full border-t-2 border-amber-900/80" />
      {/* Right Lens */}
      <div className="relative w-12 h-8 rounded-[40%_40%_50%_50%] border-2 border-amber-900/80 shadow-[2px_2px_4px_rgba(0,0,0,0.2)] bg-blue-100/10 backdrop-blur-[1px] overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -rotate-45 -translate-x-full"
          variants={{ hover: { translateX: ['-100%', '100%'], transition: { duration: 0.8, ease: 'easeInOut', delay: 0.1 } } }}
        />
      </div>
      {/* Arms folding behind */}
      <div className="absolute top-1 -left-2 w-14 h-4 border-l-2 border-t-2 border-amber-900/60 rounded-tl-lg -z-10 rotate-12 blur-[1px]" />
      <div className="absolute top-1 -right-2 w-14 h-4 border-r-2 border-t-2 border-amber-900/60 rounded-tr-lg -z-10 -rotate-12 blur-[1px]" />
    </motion.div>
  )
}

export function StickyNote({ title, content, color, rotate, className = '' }: { title: string, content: string, color: string, rotate: string, className?: string }) {
  return (
    <motion.div
      className={`group relative flex flex-col p-4 shadow-[2px_4px_8px_rgba(0,0,0,0.15)] dark:shadow-[2px_4px_12px_rgba(0,0,0,0.3)] origin-top-left cursor-pointer ${color} ${rotate} ${className}`}
      whileHover={{ scale: 1.05, rotateZ: 0, zIndex: 10 }}
      transition={{ duration: 0.3 }}
    >
      {/* Edge curl simulation */}
      <motion.div 
        className="absolute bottom-0 right-0 w-6 h-6 bg-black/5 rounded-tl-xl transition-transform origin-bottom-right"
        variants={{ hover: { scale: 1.5, opacity: 0.8 } }}
      />
      <span className="font-sans text-[10px] font-bold tracking-wider uppercase text-charcoal/50 mb-2 border-b border-charcoal/10 pb-1">
        {title}
      </span>
      <p className="font-body text-sm leading-relaxed text-charcoal/80" style={{ fontFamily: '"Comic Sans MS", cursive, sans-serif' }}>
        {content}
      </p>
    </motion.div>
  )
}
