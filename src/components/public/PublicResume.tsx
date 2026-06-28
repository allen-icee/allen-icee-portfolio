import { useState } from 'react'
import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'
import CertificateModal, { type ExtendedCertificate } from './CertificateModal'
import ResumeModal from './ResumeModal'

// Extended mock data for the Archive Room theme
const certificates: ExtendedCertificate[] = [
  { 
    id: 'aws-dev',
    title: 'AWS Certified Developer', 
    issuer: 'Amazon Web Services', 
    date: 'Oct 2024', 
    credentialId: 'AWS-DEV-982374',
    category: 'Cloud Architecture',
    skills: ['AWS', 'Serverless', 'DynamoDB', 'API Gateway', 'Lambda'],
    verificationUrl: '#',
    image: 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?q=80&w=800&auto=format&fit=crop', // Placeholder abstract/certificate-like image
    description: 'Validates technical expertise in developing and maintaining applications on the AWS platform. This credential confirms mastery of core AWS services, uses, and basic AWS architecture best practices.'
  },
  { 
    id: 'gcp-eng',
    title: 'Google Cloud Engineer', 
    issuer: 'Google Cloud', 
    date: 'Mar 2023', 
    credentialId: 'GCP-ACE-112233',
    category: 'Cloud Engineering',
    skills: ['Google Cloud Platform', 'Kubernetes', 'Compute Engine', 'IAM'],
    verificationUrl: '#',
    image: 'https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?q=80&w=800&auto=format&fit=crop',
    description: 'Demonstrates the ability to deploy applications, monitor operations, and manage enterprise solutions. This certification ensures proficiency in using Google Cloud Console and the command-line interface to perform common platform-based tasks.'
  },
  { 
    id: 'meta-fe',
    title: 'Meta Frontend Developer', 
    issuer: 'Meta / Coursera', 
    date: 'Jan 2023', 
    credentialId: 'META-FE-554433',
    category: 'Web Development',
    skills: ['React', 'JavaScript', 'UI/UX', 'Version Control', 'HTML/CSS'],
    verificationUrl: '#',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800&auto=format&fit=crop',
    description: 'A comprehensive professional certificate covering the complete frontend development lifecycle. This credential verifies the ability to build interactive user interfaces and scalable web applications using React and modern web technologies.'
  },
]

export default function PublicResume() {
  const [selectedCertIndex, setSelectedCertIndex] = useState<number | null>(null)
  const [isResumeOpen, setIsResumeOpen] = useState(false)

  // Dummy resume URL for demonstration
  const dummyResumeUrl = '/placeholder-resume.pdf'

  const handleNextCert = () => {
    if (selectedCertIndex !== null) {
      setSelectedCertIndex((selectedCertIndex + 1) % certificates.length)
    }
  }

  const handlePrevCert = () => {
    if (selectedCertIndex !== null) {
      setSelectedCertIndex((selectedCertIndex - 1 + certificates.length) % certificates.length)
    }
  }

  return (
    <>
      <section id="resume" className="relative overflow-hidden py-24 md:py-32">
        {/* Archive Room Atmosphere Details */}
        <div className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-multiply dark:opacity-[0.05] dark:mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.7\\\' numOctaves=\\\'3\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
        
        <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
          
          <motion.div
            className="mb-20 text-center md:mb-28"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl font-medium tracking-tight text-charcoal md:text-5xl dark:text-white/90">
              The Archive Room
            </h2>
            <div className="my-6 flex items-center justify-center opacity-40">
              <div className="h-px w-16 bg-charcoal dark:bg-white" />
              <Icon icon="lucide:archive" className="mx-4 size-5 text-charcoal dark:text-white" />
              <div className="h-px w-16 bg-charcoal dark:bg-white" />
            </div>
            <p className="font-serif text-lg italic text-charcoal/60 dark:text-white/50">
              A carefully preserved collection of credentials and milestones.
            </p>
          </motion.div>

          {/* 1. Archive of Achievements (Certificates) */}
          <div className="mb-32">
            <motion.h3 
              className="mb-10 font-serif text-2xl font-medium text-charcoal dark:text-white/80"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Archive of Achievements
            </motion.h3>
            
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((cert, i) => (
                <motion.button
                  key={cert.id}
                  className="group relative flex flex-col text-left outline-none"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: 'easeOut' }}
                  onClick={() => setSelectedCertIndex(i)}
                  whileHover={{ y: -8, scale: 1.02, transition: { duration: 0.3 } }}
                >
                  {/* Leather Portfolio Insert / Framed Backing */}
                  <div className="relative flex w-full flex-col overflow-hidden rounded-md bg-[#2A1D15] p-2 shadow-[0_10px_20px_rgba(0,0,0,0.2)] transition-shadow duration-300 group-hover:shadow-[0_15px_30px_rgba(0,0,0,0.3)] dark:bg-[#1A110D]">
                    
                    <div className="absolute inset-0 opacity-[0.15] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'1\\\' numOctaves=\\\'2\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />

                    {/* Premium Paper Document */}
                    <div className="relative flex flex-1 flex-col rounded-sm bg-[#FDFBF7] p-6 ring-1 ring-charcoal/5 dark:bg-[#222]">
                      {/* Lavender Glow on Hover */}
                      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-brand/0 to-purple-brand/0 opacity-0 transition-all duration-500 group-hover:from-purple-brand/5 group-hover:to-transparent group-hover:opacity-100" />
                      
                      <div className="relative z-10">
                        {/* Decorative header */}
                        <div className="mb-4 flex items-start justify-between opacity-60">
                          <Icon icon="lucide:award" className="size-6 text-charcoal dark:text-white" />
                          <span className="font-sans text-[9px] uppercase tracking-widest text-charcoal dark:text-white">Archived</span>
                        </div>
                        
                        <h4 className="mb-2 font-serif text-xl font-medium leading-snug text-charcoal dark:text-white/90">
                          {cert.title}
                        </h4>
                        <p className="font-sans text-xs uppercase tracking-widest text-charcoal/50 dark:text-white/50">
                          {cert.issuer}
                        </p>
                        
                        <div className="mt-8 flex items-center justify-between border-t border-charcoal/10 pt-4 dark:border-white/10">
                          <p className="font-serif italic text-charcoal/60 dark:text-white/60">{cert.date}</p>
                          {/* Preview icon appears on hover */}
                          <Icon icon="lucide:eye" className="size-4 -translate-x-2 text-purple-brand opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 dark:text-purple-brand-light" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* 2. Resume & Curriculum Vitae */}
          <div>
            <motion.h3 
              className="mb-10 font-serif text-2xl font-medium text-charcoal dark:text-white/80"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              Resume &amp; Curriculum Vitae
            </motion.h3>

            <motion.div
              className="relative mx-auto max-w-4xl"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              {/* Premium Leather Folder Resume Card */}
              <div className="relative overflow-hidden rounded-lg bg-[#2A1D15] shadow-[0_20px_40px_rgba(0,0,0,0.3)] ring-1 ring-white/10 dark:shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                {/* Leather Texture */}
                <div className="absolute inset-0 opacity-[0.2] mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\\\'0 0 200 200\\\' xmlns=\\\'http://www.w3.org/2000/svg\\\'%3E%3Cfilter id=\\\'noise\\\'%3E%3CfeTurbulence type=\\\'fractalNoise\\\' baseFrequency=\\\'0.6\\\' numOctaves=\\\'4\\\' stitchTiles=\\\'stitch\\\'/%3E%3C/filter%3E%3Crect width=\\\'100%25\\\' height=\\\'100%25\\\' filter=\\\'url(%23noise)\\\'/%3E%3C/svg%3E")' }} />
                
                {/* Gold detailing */}
                <div className="absolute inset-x-4 top-4 h-px bg-yellow-600/20" />
                <div className="absolute inset-x-4 bottom-4 h-px bg-yellow-600/20" />
                <div className="absolute inset-y-4 left-4 w-px bg-yellow-600/20" />
                <div className="absolute inset-y-4 right-4 w-px bg-yellow-600/20" />

                {/* Bookmark ribbon */}
                <div className="absolute right-12 top-0 z-20 h-24 w-6 bg-[#6B4C9A] shadow-md" style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 85%, 0 100%)' }} />

                <div className="relative z-10 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center gap-10">
                  
                  {/* Left: Document Visual */}
                  <div className="relative w-48 shrink-0 md:w-64 rotate-[-2deg] transition-transform duration-500 hover:rotate-0 hover:scale-105">
                    <div className="aspect-[1/1.414] w-full rounded-sm bg-[#FDFBF7] p-4 shadow-lg ring-1 ring-black/5 dark:bg-[#EAE5D9]">
                      <div className="h-full w-full border border-charcoal/10 p-2 opacity-50">
                        {/* Dummy text lines to look like a document */}
                        <div className="mb-4 h-2 w-1/2 bg-charcoal/20" />
                        <div className="mb-2 h-1 w-full bg-charcoal/10" />
                        <div className="mb-2 h-1 w-full bg-charcoal/10" />
                        <div className="mb-6 h-1 w-3/4 bg-charcoal/10" />
                        <div className="mb-2 h-1 w-full bg-charcoal/10" />
                        <div className="mb-2 h-1 w-full bg-charcoal/10" />
                        <div className="mb-2 h-1 w-2/3 bg-charcoal/10" />
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions and Info */}
                  <div className="flex-1 text-center md:text-left text-[#EAE5D9]">
                    <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-yellow-600/30 bg-yellow-600/10 px-3 py-1 font-sans text-[10px] uppercase tracking-widest text-yellow-600/80">
                      <Icon icon="lucide:star" className="size-3" />
                      Updated Oct 2024
                    </div>
                    
                    <h4 className="mb-2 font-serif text-3xl font-medium tracking-wide drop-shadow-md">
                      Professional Resume
                    </h4>
                    <p className="mb-8 font-body text-sm leading-relaxed text-white/60 max-w-md mx-auto md:mx-0">
                      A comprehensive overview of my professional experience, education, skills, and technical proficiencies. Carefully preserved for your review.
                    </p>

                    <div className="flex flex-wrap items-center justify-center gap-4 md:justify-start">
                      <button
                        onClick={() => setIsResumeOpen(true)}
                        className="group relative inline-flex items-center gap-2 overflow-hidden rounded-sm bg-[#EAE5D9] px-6 py-3 font-serif text-sm font-medium text-[#2A1D15] transition-all hover:bg-white"
                      >
                        <Icon icon="lucide:book-open" className="size-4" />
                        Open Folder
                        <div className="absolute inset-0 -translate-x-full bg-white/40 transition-transform duration-300 group-hover:translate-x-0" />
                      </button>
                      
                      <a
                        href={dummyResumeUrl}
                        download
                        className="group inline-flex items-center gap-2 rounded-sm border border-white/20 bg-white/5 px-6 py-3 font-serif text-sm font-medium text-white transition-colors hover:bg-white/10"
                      >
                        <Icon icon="lucide:download" className="size-4 transition-transform group-hover:-translate-y-0.5" />
                        Download PDF
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Modals */}
      <CertificateModal
        certificate={selectedCertIndex !== null ? certificates[selectedCertIndex] : null}
        onClose={() => setSelectedCertIndex(null)}
        onNext={handleNextCert}
        onPrev={handlePrevCert}
      />

      <ResumeModal
        isOpen={isResumeOpen}
        onClose={() => setIsResumeOpen(false)}
        resumeUrl={dummyResumeUrl}
      />
    </>
  )
}
