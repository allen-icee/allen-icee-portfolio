import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useCollection } from '../../hooks/useCollection'
import type { Artwork } from '../../types'
import ArtModal from './ArtModal'

function ArtCard({
  artwork,
  isHovered,
  onHover,
  onLeave,
  onClick,
  index,
}: {
  artwork: Artwork
  isHovered: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
  index: number
}) {
  // Generate a consistent pseudo-random rotation and sizing for the staggered look
  const rotation = useMemo(() => {
    const rotations = [-2, -1, 0, 1, 2, 3, -3]
    return rotations[index % rotations.length]
  }, [index])

  // Generate size classes based on index to create an asymmetrical gallery
  const sizeClass = useMemo(() => {
    if (index % 5 === 0) return 'md:w-[45%] w-full'
    if (index % 5 === 1) return 'md:w-[35%] w-full'
    if (index % 5 === 2) return 'md:w-[25%] w-full'
    if (index % 5 === 3) return 'md:w-[30%] w-full'
    return 'md:w-[40%] w-full'
  }, [index])

  const marginClass = useMemo(() => {
    if (index % 3 === 0) return 'md:mt-12'
    if (index % 3 === 1) return 'md:-mt-8'
    return 'md:mt-24'
  }, [index])

  return (
    <motion.div
      className={`group relative flex-shrink-0 cursor-pointer outline-none transition-all duration-700 ${sizeClass} ${marginClass}`}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.8, delay: (index % 3) * 0.15, ease: 'easeOut' }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{
        rotate: rotation,
        filter: isHovered ? 'brightness(0.7) blur(2px)' : 'brightness(1) blur(0px)',
        zIndex: isHovered ? 0 : 10 // Lower z-index when blurred so hovered item is on top
      }}
      whileHover={{ 
        y: -10, 
        scale: 1.02, 
        rotate: 0,
        zIndex: 50,
        transition: { duration: 0.4, ease: 'easeOut' }
      }}
      aria-label={`View artwork: ${artwork.title}`}
    >
      <div className="relative">
        {/* Soft Lavender Glow on Hover */}
        <div className="absolute -inset-4 z-0 rounded-xl bg-purple-brand/20 opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 dark:bg-purple-brand/30" />

        {/* Frame + Matting */}
        <div className="relative z-10 mx-auto overflow-hidden bg-[#FDFBF7] p-4 shadow-[2px_10px_20px_rgba(0,0,0,0.15)] ring-1 ring-[#e5dfd5] transition-shadow duration-500 group-hover:shadow-[5px_20px_40px_rgba(0,0,0,0.25)] dark:bg-[#1a1a1a] dark:shadow-[5px_15px_30px_rgba(0,0,0,0.6)] dark:ring-white/5 dark:group-hover:shadow-[10px_30px_50px_rgba(0,0,0,0.8)] md:p-6 lg:p-8">
          
          {/* Frame Border (Textured Wood) */}
          <div className="pointer-events-none absolute inset-0 border-[6px] border-[#3e2b20] shadow-inner dark:border-[#14100c] md:border-[10px]">
            <div className="absolute inset-0 opacity-20 mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.9\\\' numOctaves=\\\'3\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
          </div>
          
          {/* Subtle Paper Mat shadow */}
          <div className="pointer-events-none absolute inset-4 border border-black/5 shadow-[inset_0_2px_8px_rgba(0,0,0,0.05)] dark:border-white/5 dark:shadow-[inset_0_2px_10px_rgba(0,0,0,0.4)] md:inset-6 lg:inset-8" />
          
          {/* Artwork Image */}
          <div className="relative bg-charcoal/5 dark:bg-white/5 shadow-sm">
            <div
              className="aspect-auto w-full"
            >
              <img src={artwork.imageURL} alt={artwork.title} className="w-full h-auto object-cover" loading="lazy" />
            </div>
            
            {/* Subtle canvas texture overlay on image */}
            <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.03] dark:opacity-[0.06]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'1.5\\\' numOctaves=\\\'3\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />

            {/* Hover Overlay */}
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-gradient-to-t from-warm-paper/95 via-warm-paper/80 to-warm-paper/40 opacity-0 backdrop-blur-[2px] transition-all duration-500 group-hover:opacity-100 dark:from-surface/95 dark:via-surface/80 dark:to-surface/40">
              <div className="translate-y-4 text-center transition-transform duration-500 group-hover:translate-y-0">
                <p className="font-serif text-2xl font-medium text-charcoal dark:text-white/90 drop-shadow-sm">{artwork.title}</p>
                <div className="my-2 mx-auto h-px w-8 bg-purple-brand/50" />
                <p className="font-sans text-[10px] uppercase tracking-widest text-charcoal/60 dark:text-white/60">{artwork.medium}</p>
                <div className="mt-6 flex items-center gap-2 rounded-full border border-purple-brand/30 bg-purple-brand/5 px-4 py-2 font-serif text-sm text-purple-brand backdrop-blur-sm dark:border-purple-brand/50 dark:bg-purple-brand/10 dark:text-purple-brand-light">
                  <Icon icon="lucide:book-open" className="size-4" />
                  <span>Open Illustration</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Handwritten Label */}
        <div className="mt-6 text-center opacity-80 group-hover:opacity-100 transition-opacity duration-300">
          <p className="font-serif italic text-charcoal/70 dark:text-white/60">
            {artwork.title}
          </p>
          <p className="mt-1 font-sans text-[9px] uppercase tracking-widest text-charcoal/40 dark:text-white/40">
            {new Date(artwork.createdAt).getFullYear()}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function PublicArtGallery() {
  const { items: artworks, loading } = useCollection<Artwork>('artworks')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)

  const handleNext = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex + 1) % artworks.length)
    }
  }

  const handlePrev = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((selectedIndex - 1 + artworks.length) % artworks.length)
    }
  }

  return (
    <>
      <section id="art" className="relative overflow-hidden px-6 py-24 md:py-32">
        {/* Wall Texture / Lighting / Dust */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay dark:opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.6\\\' numOctaves=\\\'2\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.4),transparent_80%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_80%)]" />
        
        {/* Floating dust particles / lavender petals (subtle) */}
        <div className="pointer-events-none absolute left-[10%] top-[20%] h-1 w-1 rounded-full bg-charcoal/10 blur-[1px] dark:bg-white/10" />
        <div className="pointer-events-none absolute right-[15%] top-[10%] h-1.5 w-1.5 rounded-full bg-purple-brand/10 blur-[1px] dark:bg-purple-brand/20" />
        <div className="pointer-events-none absolute left-[5%] bottom-[30%] h-[2px] w-3 -rotate-45 bg-charcoal/5 dark:bg-white/5" />

        <div className="relative z-10 mx-auto max-w-[1400px]">
          <motion.div
            className="mb-24 flex flex-col items-center text-center md:mb-32"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-4xl font-medium tracking-tight text-charcoal md:text-5xl dark:text-white/90">
              Illustration Room
            </h2>
            <div className="my-6 flex items-center justify-center opacity-50">
              <div className="h-px w-16 bg-charcoal/30 dark:bg-white/30" />
              <Icon icon="lucide:feather" className="mx-4 size-5 text-charcoal dark:text-white" />
              <div className="h-px w-16 bg-charcoal/30 dark:bg-white/30" />
            </div>
            <p className="font-serif italic text-lg text-charcoal/60 dark:text-white/50">
              Where colors become stories.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center gap-3 py-32 font-body text-sm text-charcoal/40 dark:text-white/40">
              <Icon icon="lucide:loader-2" className="size-5 animate-spin" />
              Opening the sketchbook...
            </div>
          ) : (
            <div className="flex flex-wrap justify-center gap-10 md:gap-x-16 md:gap-y-24">
              {artworks.map((art, i) => (
                <ArtCard
                  key={art.id}
                  artwork={art}
                  index={i}
                  isHovered={hoveredId !== null && hoveredId !== art.id}
                  onHover={() => setHoveredId(art.id)}
                  onLeave={() => setHoveredId(null)}
                  onClick={() => setSelectedIndex(i)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Custom Art Modal */}
      <ArtModal
        artwork={selectedIndex !== null ? artworks[selectedIndex] : null}
        onClose={() => setSelectedIndex(null)}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </>
  )
}
