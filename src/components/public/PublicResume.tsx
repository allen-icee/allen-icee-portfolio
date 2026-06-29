import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Icon } from '@iconify/react'
import ResumeModal from './ResumeModal'
import ImageViewer from './ImageViewer'

interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  credentialId?: string
  category?: string
  verificationUrl?: string
  image: string
}

const certificates: Certificate[] = [
  {
    id: 'aws-dev',
    title: 'AWS Certified Developer',
    issuer: 'Amazon Web Services',
    date: 'Oct 2024',
    credentialId: 'AWS-DEV-982374',
    category: 'Cloud Architecture',
    verificationUrl: '#',
    image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'gcp-eng',
    title: 'Google Cloud Engineer',
    issuer: 'Google Cloud',
    date: 'Mar 2023',
    credentialId: 'GCP-ACE-112233',
    category: 'Cloud Engineering',
    verificationUrl: '#',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=800&auto=format&fit=crop',
  },
  {
    id: 'meta-fe',
    title: 'Meta Frontend Developer',
    issuer: 'Meta / Coursera',
    date: 'Jan 2023',
    credentialId: 'META-FE-554433',
    category: 'Web Development',
    verificationUrl: '#',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
  },
]

export default function PublicResume() {
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  // Dummy resume URL for demonstration
  const dummyResumeUrl = '/placeholder-resume.pdf'
  const certImages = certificates.map(c => c.image)

  const renderCertPanel = (index: number) => {
    const cert = certificates[index]
    return (
      <div className="p-8 md:p-10 flex flex-col h-full text-white/90">
        <h3 className="font-serif text-3xl font-medium mb-8 leading-snug drop-shadow-sm">{cert.title}</h3>
        
        <div className="flex flex-col gap-6">
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Issuing Organization</p>
            <p className="font-serif text-lg text-white/80">{cert.issuer}</p>
          </div>
          
          <div>
            <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Issue Date</p>
            <p className="font-serif text-lg text-white/80">{cert.date}</p>
          </div>
          
          {cert.credentialId && (
            <div>
              <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40 mb-1">Credential ID</p>
              <p className="font-mono text-sm text-white/60 tracking-wider bg-white/5 inline-block px-2 py-1 rounded-sm border border-white/10">{cert.credentialId}</p>
            </div>
          )}
        </div>

        {cert.verificationUrl && (
          <div className="mt-12 lg:mt-auto pt-8">
            <a 
              href={cert.verificationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center gap-3 w-full p-4 border border-white/20 bg-white/5 hover:bg-white/10 transition-colors rounded-sm"
            >
              <Icon icon="lucide:external-link" className="size-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              <span className="font-sans text-xs font-semibold uppercase tracking-[0.2em]">Verify Credential</span>
            </a>
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      <section id="resume" className="relative overflow-hidden py-16 md:py-20 bg-[#F9F6F0] dark:bg-[#141316]">
        
        {/* Subtle Background Texture */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-multiply dark:opacity-[0.05] dark:mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.7\\\' numOctaves=\\\'3\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />

        <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">

          {/* Section Header */}
          <motion.div
            className="mb-14 md:mb-20 text-center"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl font-medium tracking-tight text-charcoal md:text-5xl dark:text-white/90">
              My Resume & Certifications
            </h2>
            <div className="my-5 flex items-center justify-center opacity-30 dark:opacity-40">
              <div className="h-px w-16 bg-charcoal dark:bg-white" />
              <Icon icon="lucide:archive" className="mx-4 size-5 text-charcoal dark:text-white" />
              <div className="h-px w-16 bg-charcoal dark:bg-white" />
            </div>
            <p className="font-serif text-lg italic text-charcoal/60 dark:text-white/50">
              The boring, formal stuff you actually came here for.
            </p>
          </motion.div>

          <div className="flex flex-col gap-12 md:gap-16">

            {/* Resume Archive Document */}
            <div>
              <motion.div
                className="relative mx-auto w-full max-w-4xl"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                {/* Archival Mounting Board / Frame */}
                <div className="relative overflow-hidden bg-[#2c2621] p-3 md:p-4 shadow-[0_15px_40px_rgba(0,0,0,0.12)] ring-1 ring-charcoal/10 dark:bg-[#12100E] dark:shadow-[0_15px_40px_rgba(0,0,0,0.6)] dark:ring-white/5">
                  {/* Wood/Matting texture */}
                  <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.8\\\' numOctaves=\\\'3\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
                  
                  {/* Inner Matting */}
                  <div className="relative bg-[#FDFBF7] dark:bg-[#1F1B18] p-6 sm:p-8 md:p-10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.15)] dark:shadow-[inset_0_2px_10px_rgba(0,0,0,0.6)] border border-[#D5CFB9] dark:border-black/50">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                      
                      {/* Visual Document Representation */}
                      <div className="relative w-32 md:w-40 shrink-0">
                        <div className="aspect-[1/1.414] w-full bg-[#FCFBF8] dark:bg-[#E2DDD3] shadow-[4px_6px_15px_rgba(0,0,0,0.1)] dark:shadow-[4px_6px_15px_rgba(0,0,0,0.4)] p-3 border border-black/5 flex flex-col justify-between">
                          <div className="w-full flex justify-center pt-2">
                            <Icon icon="lucide:file-text" className="size-8 text-[#2c2621]/40" />
                          </div>
                          <div className="w-full space-y-1.5 opacity-40">
                            <div className="h-0.5 w-full bg-charcoal" />
                            <div className="h-0.5 w-5/6 bg-charcoal" />
                            <div className="h-0.5 w-full bg-charcoal" />
                            <div className="h-0.5 w-4/6 bg-charcoal" />
                          </div>
                        </div>
                        {/* Subtly overlapping seal */}
                        <div className="absolute -bottom-3 -right-3 size-10 rounded-full bg-[#8B5A2B] shadow-md border-2 border-[#EFEBE4] dark:border-[#1C1816] flex items-center justify-center">
                           <Icon icon="lucide:award" className="size-5 text-[#EFEBE4]" />
                        </div>
                      </div>

                      {/* Meta Information & Actions */}
                      <div className="flex-1 text-center md:text-left flex flex-col items-center md:items-start relative z-10">
                        <div className="mb-3 inline-flex items-center gap-1.5 border border-charcoal/20 dark:border-white/10 px-2 py-1 font-sans text-[9px] uppercase tracking-[0.2em] text-charcoal/60 dark:text-white/60">
                          Document No. CV-2024
                        </div>
                        
                        <h3 className="mb-2 font-serif text-2xl md:text-3xl font-medium tracking-wide text-charcoal dark:text-white/90">
                          Curriculum Vitae
                        </h3>
                        <p className="mb-8 font-serif italic text-sm md:text-base text-charcoal/60 dark:text-white/50 max-w-lg">
                          Preserved records of professional experience, academic history, and technical competencies.
                        </p>

                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 w-full">
                          <button
                            onClick={() => setIsResumeOpen(true)}
                            className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-sm bg-[#1a1614] px-6 py-3 font-sans text-xs uppercase tracking-[0.15em] font-medium text-[#EFEBE4] shadow-sm transition-all hover:bg-[#2c2621]"
                          >
                            <Icon icon="lucide:eye" className="size-4 opacity-80" />
                            Examine Document
                          </button>

                          <a
                            href={dummyResumeUrl}
                            download
                            className="group flex-1 sm:flex-none inline-flex items-center justify-center gap-2 rounded-sm border border-charcoal/20 dark:border-white/20 bg-transparent px-6 py-3 font-sans text-xs uppercase tracking-[0.15em] font-medium text-charcoal dark:text-white transition-all hover:bg-charcoal/5 dark:hover:bg-white/5"
                          >
                            <Icon icon="lucide:download" className="size-4 opacity-80 transition-transform group-hover:-translate-y-0.5" />
                            Download Copy
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Divider */}
            <div className="w-full flex justify-center opacity-20 dark:opacity-10 py-2">
              <div className="h-px w-full max-w-2xl bg-charcoal dark:bg-white" />
            </div>

            {/* Curated Certificate Gallery */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((cert, i) => (
                <motion.button
                  key={cert.id}
                  onClick={() => setSelectedCertIndex(i)}
                  className="group relative flex flex-col text-left outline-none"
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                >
                  {/* Museum Display Frame */}
                  <div className="relative w-full overflow-hidden bg-[#2c2621] dark:bg-[#12100E] p-2 shadow-[0_4px_15px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_15px_rgba(0,0,0,0.4)] transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.12)] dark:group-hover:shadow-[0_10px_25px_rgba(0,0,0,0.6)]">
                    <div className="relative bg-[#FDFBF7] dark:bg-[#1F1B18] p-4 border border-black/5 dark:border-white/5 h-full flex flex-col">
                      
                      {/* Visual Preview */}
                      <div className="aspect-[4/3] w-full mb-5 overflow-hidden bg-black/5 dark:bg-black/30 relative">
                        <img 
                          src={cert.image} 
                          alt={cert.title}
                          className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105 group-hover:opacity-100"
                        />
                        {/* Inner mat shadow */}
                        <div className="absolute inset-0 shadow-[inset_0_0_8px_rgba(0,0,0,0.15)] pointer-events-none" />
                      </div>

                      <div className="mt-auto">
                        <p className="font-sans text-[9px] uppercase tracking-[0.2em] text-charcoal/50 dark:text-white/40 mb-1.5 flex justify-between">
                          <span>{cert.issuer}</span>
                          <span>{cert.date}</span>
                        </p>
                        <h4 className="font-serif text-[15px] font-medium leading-snug text-charcoal dark:text-white/90 group-hover:text-[#6B4C9A] dark:group-hover:text-[#9A7BCA] transition-colors">
                          {cert.title}
                        </h4>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* Viewers/Modals */}
      <AnimatePresence>
        {selectedCertIndex !== null && (
          <ImageViewer
            images={certImages}
            initialIndex={selectedCertIndex}
            onClose={() => setSelectedCertIndex(null)}
            altText="Certificate Preview"
            renderSidePanel={renderCertPanel}
          />
        )}
      </AnimatePresence>

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        resumeUrl={dummyResumeUrl}
      />
    </>
  )
}
