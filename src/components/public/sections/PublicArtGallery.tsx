// src/components/public/sections/PublicArtGallery.tsx
import { useState, useMemo, memo, Suspense, lazy } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import { Fireflies, FloatingPetal } from '../../ui/Particles'
import { useCollection } from '../../../hooks/useCollection'
import type { MockArtwork as Artwork } from '../../../types'

const ImageViewer = lazy(() => import('../components/ImageViewer'))

const ArtCard = memo(function ArtCard({
  artwork,
  onClick,
  index,
  variant = 'large'
}: {
  artwork: Artwork
  onClick: () => void
  index: number
  variant?: 'large' | 'small'
}) {

  const sizeClass =
    variant === 'large'
      ? (index % 2 === 0 ? 'w-32 sm:w-40 md:w-48 lg:w-[16rem]' : 'w-40 sm:w-48 md:w-56 lg:w-[18rem]')
      : (index % 2 === 0 ? 'w-20 sm:w-24 md:w-28 lg:w-[9rem]' : 'w-24 sm:w-28 md:w-32 lg:w-[11rem]')

  return (
    <div
      className="group relative flex flex-col items-center flex-shrink-0 cursor-pointer outline-none transition-transform duration-500 hover:-translate-y-4 hover:z-50 mx-2 md:mx-4"
      onClick={onClick}
      aria-label={`View artwork: ${artwork.title}`}
    >

      <div className="pointer-events-none absolute -bottom-16 w-[110%] h-6 bg-black/15 blur-lg rounded-[100%] transition-opacity duration-500 group-hover:opacity-30 opacity-10 dark:bg-black/40" />

      <div className="relative z-10 p-2 md:p-4 shadow-[4px_12px_24px_rgba(0,0,0,0.4)] dark:shadow-[6px_15px_30px_rgba(0,0,0,0.8)] bg-[#2a1b12] dark:bg-[#120c08] rounded-[1px] transition-shadow duration-500 group-hover:shadow-[8px_20px_40px_rgba(0,0,0,0.5)] group-hover:dark:shadow-[10px_25px_50px_rgba(0,0,0,0.9)] overflow-hidden">

        <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 w-[150%] h-[150%] bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.15),transparent_60%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.08),transparent_60%)] z-30 opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

        <div className="absolute inset-0 border-t-[4px] border-l-[4px] border-b-[4px] border-r-[4px] md:border-t-[6px] md:border-l-[6px] md:border-b-[6px] md:border-r-[6px] border-t-[#593922] border-l-[#4a2f1b] border-r-[#2a1a0e] border-b-[#1c1109] dark:border-t-[#22160d] dark:border-l-[#191009] dark:border-r-[#0c0704] dark:border-b-[#050302] shadow-[inset_0_5px_10px_rgba(0,0,0,0.8)] pointer-events-none z-20">
          <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.4\\\' numOctaves=\\\'3\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
        </div>

        <div className="absolute inset-[4px] md:inset-[6px] shadow-[inset_0_2px_8px_rgba(0,0,0,0.6)] pointer-events-none z-20" />

        <div className="relative bg-[#fdfbf7] dark:bg-[#e8e4db] p-[2px] md:p-[4px] shadow-[0_1px_2px_rgba(0,0,0,0.4)] z-10">
          <div className="absolute inset-0 border border-black/10 dark:border-black/20 pointer-events-none" />

          <div className={`relative shadow-[inset_0_0_4px_rgba(0,0,0,0.2)] ${sizeClass} bg-black/5 dark:bg-black/10 overflow-hidden`}>
            <img src={artwork.image} alt={artwork.title} className="w-full h-auto object-cover" loading="lazy" />

            <div className="pointer-events-none absolute inset-0 mix-blend-multiply opacity-[0.03] dark:opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'1.5\\\' numOctaves=\\\'3\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
          </div>
        </div>
      </div>

      <div className="mt-3 relative z-20 flex flex-col items-center">
        <div className="bg-[#fdfbf7]/90 dark:bg-[#1a1a1a]/90 border border-black/5 dark:border-white/5 px-3 py-1.5 rounded-[1px] relative text-center backdrop-blur-sm transform transition-transform duration-500 group-hover:scale-105">
          <h4 className="font-sans font-medium text-[#2d2d2d] dark:text-white/80 text-[8px] md:text-[9px] tracking-widest leading-tight uppercase">
            {artwork.title}
          </h4>
          <div className="w-4 h-px bg-black/10 dark:bg-white/10 mx-auto my-1" />
          <p className="font-sans text-[7px] text-[#2d2d2d]/50 dark:text-white/40 uppercase tracking-[0.2em]">
            {artwork.medium}
          </p>
        </div>
      </div>
    </div>
  )
})

export default function PublicArtGallery() {
  const { items: artworks, loading } = useCollection<Artwork>('artworks')
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)

  const images = artworks.map((a) => a.image)

  const curatedColumns = useMemo(() => {
    const cols: { type: 'single' | 'stacked'; items: { artwork: Artwork; originalIndex: number }[] }[] = []
    let i = 0
    let patternStep = 0
    while (i < artworks.length) {
      if (patternStep % 2 === 0) {

        if (i + 1 < artworks.length) {
          cols.push({
            type: 'stacked',
            items: [
              { artwork: artworks[i], originalIndex: i },
              { artwork: artworks[i + 1], originalIndex: i + 1 }
            ]
          })
          i += 2
        } else {

          cols.push({
            type: 'single',
            items: [{ artwork: artworks[i], originalIndex: i }]
          })
          i += 1
        }
      } else {

        cols.push({
          type: 'single',
          items: [{ artwork: artworks[i], originalIndex: i }]
        })
        i += 1
      }
      patternStep++
    }
    return cols
  }, [artworks])

  return (
    <>
      <section id="art" className="relative overflow-hidden py-24 md:py-32 bg-transparent transition-colors duration-500">

        <Fireflies count={15} />
        <FloatingPetal petalIndex={2} className="top-[25%] left-[5%] w-4 md:w-6" duration={14} delay={0} opacity={0.5} />
        <FloatingPetal petalIndex={4} className="bottom-[15%] right-[10%] w-6 md:w-8" duration={17} delay={2} opacity={0.3} />

        <div className="pointer-events-none absolute inset-0 opacity-[0.03] mix-blend-overlay dark:opacity-[0.05]" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.6\\\' numOctaves=\\\'2\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,248,240,0.8),transparent_80%)] dark:bg-[radial-gradient(ellipse_at_top,rgba(255,248,240,0.06),transparent_80%)]" />

        <div className="pointer-events-none absolute top-0 left-0 right-0 h-[400px] bg-gradient-to-b from-[#fcf5eb]/20 dark:from-white/5 to-transparent blur-[50px]" />

        <div className="relative z-10">
          <motion.div
            className="mb-4 md:mb-8 flex flex-col items-center text-center px-6"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-serif text-3xl md:text-5xl font-medium tracking-tight text-charcoal dark:text-white/90 drop-shadow-sm mb-4">
              My Art Gallery
            </h2>
            <p className="font-sans text-xs md:text-sm tracking-widest uppercase text-purple-brand dark:text-purple-brand/90">
              What I do when I'm avoiding reality.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex items-center justify-center gap-3 py-16 font-body text-sm text-charcoal/40 dark:text-white/40">
              <Icon icon="lucide:loader-2" className="size-5 animate-spin" />
              Preparing the exhibition...
            </div>
          ) : (
            <div className="relative w-full pt-8 pb-32 md:pt-12 md:pb-48 flex items-center justify-center">

              <div className="w-full relative z-10 flex select-none py-4 md:py-8">
                <div className="flex animate-gallery-marquee items-center" style={{ width: 'max-content' }}>

                  {curatedColumns.map((col, colIndex) => (
                    <div key={`col1-${colIndex}`} className="flex flex-col justify-center px-2 md:px-4 h-[400px] md:h-[500px] lg:h-[600px]">
                      {col.type === 'single' ? (
                        <ArtCard artwork={col.items[0].artwork} index={col.items[0].originalIndex} onClick={() => setViewerIndex(col.items[0].originalIndex)} variant="large" />
                      ) : (
                        <div className={`flex flex-col gap-8 md:gap-12 h-full ${colIndex % 4 === 0 ? 'justify-start pt-6 md:pt-10' : 'justify-center'}`}>
                          <ArtCard artwork={col.items[0].artwork} index={col.items[0].originalIndex} onClick={() => setViewerIndex(col.items[0].originalIndex)} variant="small" />
                          <ArtCard artwork={col.items[1].artwork} index={col.items[1].originalIndex} onClick={() => setViewerIndex(col.items[1].originalIndex)} variant="small" />
                        </div>
                      )}
                    </div>
                  ))}

                  {curatedColumns.map((col, colIndex) => (
                    <div key={`col2-${colIndex}`} className="flex flex-col justify-center px-2 md:px-4 h-[400px] md:h-[500px] lg:h-[600px]">
                      {col.type === 'single' ? (
                        <ArtCard artwork={col.items[0].artwork} index={col.items[0].originalIndex} onClick={() => setViewerIndex(col.items[0].originalIndex)} variant="large" />
                      ) : (
                        <div className={`flex flex-col gap-8 md:gap-12 h-full ${colIndex % 4 === 0 ? 'justify-start pt-6 md:pt-10' : 'justify-center'}`}>
                          <ArtCard artwork={col.items[0].artwork} index={col.items[0].originalIndex} onClick={() => setViewerIndex(col.items[0].originalIndex)} variant="small" />
                          <ArtCard artwork={col.items[1].artwork} index={col.items[1].originalIndex} onClick={() => setViewerIndex(col.items[1].originalIndex)} variant="small" />
                        </div>
                      )}
                    </div>
                  ))}

                </div>
              </div>

              <div className="absolute z-0 bottom-0 left-0 right-0 h-[100px] bg-gradient-to-t from-black/10 dark:from-black/40 to-transparent pointer-events-none" />

              <div className="hidden md:block pointer-events-none absolute left-0 -bottom-8 md:-bottom-12 w-32 md:w-48 lg:w-64 z-40 opacity-90 drop-shadow-[10px_20px_20px_rgba(0,0,0,0.4)] dark:drop-shadow-[10px_20px_25px_rgba(0,0,0,0.8)]">
                <img src="/svg/other/cat-statue.svg" alt="Cat Statue" className="w-full h-auto object-contain" />
              </div>

              <div className="hidden md:block pointer-events-none absolute right-0 -bottom-8 md:-bottom-12 w-32 md:w-48 lg:w-64 z-40 opacity-90 drop-shadow-[-10px_20px_20px_rgba(0,0,0,0.4)] dark:drop-shadow-[-10px_20px_25px_rgba(0,0,0,0.8)]">
                <img src="/svg/other/cat-statue.svg" alt="Cat Statue" className="w-full h-auto object-contain scale-x-[-1]" />
              </div>

              <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 -bottom-12 md:-bottom-16 z-30 opacity-95">
                <img src="/svg/other/bench.svg" alt="Museum Bench" className="w-[400px] md:w-[600px] lg:w-[800px] h-auto object-cover drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)]" />
              </div>

            </div>
          )}
        </div>
      </section>

      {viewerIndex !== null && (
        <Suspense fallback={null}>
          <ImageViewer
            images={images}
            initialIndex={viewerIndex}
            onClose={() => setViewerIndex(null)}
          />
        </Suspense>
      )}
    </>
  )
}