// src/components/public/components/CompEnvironment.tsx
import { useContext, useMemo } from 'react'
import { motion } from 'framer-motion'
import { ThemeContext } from '../../../context/ThemeContext'

interface Particle {
  id: number
  x: number
  y: number
  size: number
  duration: number
  delay: number
  drift: number
}

function generateParticles(count: number, minSize: number, maxSize: number): Particle[] {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: minSize + Math.random() * (maxSize - minSize),
    duration: 4 + Math.random() * 6,
    delay: Math.random() * 8,
    drift: -15 + Math.random() * 30,
  }))
}

const petalPath =
  'M0,0 C2,-3 6,-4 8,-2 C10,0 9,3 6,4 C3,5 1,3 0,0Z'

export default function CompEnvironment() {
  const { theme } = useContext(ThemeContext)
  const isDark = theme === 'dark'

  const petals = useMemo(() => generateParticles(isDark ? 2 : 6, 8, 14), [isDark])
  const stars = useMemo(() => generateParticles(isDark ? 5 : 3, 2, 5), [isDark])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
      aria-hidden
    >

      {petals.map((p) => (
        <motion.div
          key={`petal-${p.id}`}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: [0, -30, 0, 20, 0],
            x: [0, p.drift, p.drift * 0.5, p.drift * 0.8, 0],
            rotate: [0, 30, -20, 15, 0],
            opacity: [0.4, 0.7, 0.3, 0.6, 0.4],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        >
          <svg
            width={p.size}
            height={p.size * 0.7}
            viewBox="0 0 10 7"
            fill="none"
          >
            <path
              d={petalPath}
              fill={isDark ? '#6B4C9A' : '#E6E6FA'}
              opacity={isDark ? 0.5 : 0.7}
            />
          </svg>
        </motion.div>
      ))}

      {stars.map((p) => (
        <motion.div
          key={`star-${p.id}`}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: isDark ? [0, -60, 0] : [0, -20, 0],
            x: [0, p.drift * 0.3, 0],
            opacity: isDark ? [0, 0.8, 0] : [0.1, 0.3, 0.1],
            scale: isDark ? [0.5, 1.2, 0.5] : [1, 1.1, 1],
          }}
          transition={{
            duration: p.duration * 1.2,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        >
          {isDark ? (
            <span
              className="block rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background:
                  'radial-gradient(circle, rgba(230,230,250,0.9) 0%, rgba(107,76,154,0.3) 60%, transparent 100%)',
                boxShadow: '0 0 6px rgba(230,230,250,0.4)',
              }}
            />
          ) : (
            <span
              className="block rounded-full bg-purple-brand/10"
              style={{ width: p.size, height: p.size }}
            />
          )}
        </motion.div>
      ))}
    </div>
  )
}