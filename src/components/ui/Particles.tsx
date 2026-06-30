// src/components/ui/Particles.tsx
import { motion } from 'framer-motion'

export function Fireflies({ count = 30 }: { count?: number }) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none mix-blend-multiply dark:mix-blend-screen opacity-60 dark:opacity-80 z-[1]">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-[#8B5A2B] dark:bg-[#FFF59D] shadow-[0_0_8px_rgba(139,90,43,0.5)] dark:shadow-[0_0_8px_rgba(255,245,157,0.8)]"
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

export function FloatingPetal({ className, petalIndex = 1, duration = 10, delay = 0, opacity = 1 }: { className?: string, petalIndex?: number, duration?: number, delay?: number, opacity?: number }) {
  return (
    <motion.img
      src={`/svg/petals/petal-${petalIndex}.svg`}
      className={`absolute drop-shadow-[0_0_8px_rgba(107,76,154,0.3)] dark:drop-shadow-[0_0_8px_rgba(230,230,250,0.3)] object-contain pointer-events-none z-[1] ${className}`}
      style={{ opacity }}
      animate={{ y: [-30, 60, -30], x: [-15, 30, -15], rotateZ: [0, 180, 360] }}
      transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
    />
  )
}