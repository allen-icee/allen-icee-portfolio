import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { useCollection } from '../../hooks/useCollection'
import type { Artwork } from '../../types'
import UIModal from '../ui/UIModal'

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
  return (
    <motion.div
      className="group relative mb-12 w-full cursor-pointer outline-none transition-all duration-500"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
      style={{ filter: isHovered ? 'brightness(0.6)' : 'brightness(1)' }}
      whileHover={{ y: -4 }}
      aria-label={`View artwork: ${artwork.title}`}
    >
      {/* Museum Frame + Matting */}
      <div className="relative mx-auto overflow-hidden bg-[#fafafa] p-3 shadow-[0_15px_30px_rgba(0,0,0,0.15)] ring-1 ring-charcoal/10 dark:bg-[#1a1a1a] dark:shadow-[0_15px_30px_rgba(0,0,0,0.5)] dark:ring-white/10 md:p-5">
        {/* Frame Border (Wood/Metal) */}
        <div className="pointer-events-none absolute inset-0 border-[8px] border-[#1f1a17] shadow-inner dark:border-[#0a0a0a] md:border-[12px]" />
        
        {/* Artwork Image */}
        <div className="relative overflow-hidden bg-charcoal/5 dark:bg-white/5">
          <div
            className="aspect-[4/5] w-full bg-cover bg-center transition-transform duration-[2000ms] ease-out group-hover:scale-105"
            style={{ backgroundImage: `url(${artwork.imageURL})` }}
            role="img"
            aria-label={artwork.title}
          />
          {/* Subtle canvas texture overlay */}
          <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.04] dark:opacity-[0.08]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'1.5\\\' numOctaves=\\\'3\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
        </div>
      </div>

      {/* Museum Placard */}
      <div className="mx-auto mt-6 max-w-[80%] border-t border-charcoal/20 pt-3 text-center dark:border-white/20">
        <p className="font-serif text-lg font-medium tracking-wide text-charcoal dark:text-white/90">
          {artwork.title}
        </p>
        <p className="mt-1 font-sans text-[9px] uppercase tracking-[0.2em] text-charcoal/50 dark:text-white/50">
          {artwork.medium}
        </p>
      </div>
    </motion.div>
  )
}

export default function PublicArtGallery() {
  const { items: artworks, loading } = useCollection<Artwork>('artworks')
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [selected, setSelected] = useState<Artwork | null>(null)

  return (
    <>
      <section id="art" className="relative bg-[#ebe6df] px-6 py-28 dark:bg-[#151417]">
        {/* Wall Texture / Lighting */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.03]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.6\\\' numOctaves=\\\'2\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.4),transparent_70%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.03),transparent_70%)]" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            className="mb-16 text-center md:mb-20"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl font-medium tracking-tight text-charcoal md:text-4xl dark:text-white/90">
              The Art Museum
            </h2>
            <p className="mt-3 font-body text-sm italic text-charcoal/60 dark:text-white/50">
              Visual explorations and captured light.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center gap-3 py-20 font-body text-sm text-charcoal/40 dark:text-white/40">
              <Icon icon="lucide:loader-2" className="size-5 animate-spin" />
              Preparing gallery...
            </div>
          ) : (
            <div className="columns-1 gap-8 sm:columns-2 lg:columns-3">
              {artworks.map((art, i) => (
                <ArtCard
                  key={art.id}
                  artwork={art}
                  index={i}
                  isHovered={hoveredId !== null && hoveredId !== art.id}
                  onHover={() => setHoveredId(art.id)}
                  onLeave={() => setHoveredId(null)}
                  onClick={() => setSelected(art)}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Artwork detail modal */}
      <UIModal
        isOpen={selected !== null}
        onClose={() => setSelected(null)}
        title={selected?.title ?? ''}
      >
        {selected && (
          <div className="flex flex-col gap-6">
            <div className="overflow-hidden rounded-md shadow-md ring-1 ring-charcoal/10 dark:ring-white/10">
              <img
                src={selected.imageURL}
                alt={selected.title}
                className="w-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <p className="flex items-center gap-2 font-sans text-xs font-semibold tracking-[0.15em] uppercase text-purple-brand/80 dark:text-purple-brand/90">
                <Icon icon="lucide:palette" className="size-4" />
                {selected.medium}
              </p>
              <p className="font-body text-sm leading-relaxed text-charcoal/80 dark:text-white/80">
                {selected.story}
              </p>
            </div>
          </div>
        )}
      </UIModal>
    </>
  )
}
