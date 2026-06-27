import { motion } from 'framer-motion'
import { Icon } from '@iconify/react'

interface Certificate {
  title: string
  issuer: string
  year: string
  icon: string
}

const certificates: Certificate[] = [
  { title: 'AWS Certified Developer', issuer: 'Amazon Web Services', year: '2024', icon: 'logos:aws' },
  { title: 'Google Cloud Engineer', issuer: 'Google Cloud', year: '2023', icon: 'logos:google-cloud' },
  { title: 'Meta Frontend Developer', issuer: 'Meta / Coursera', year: '2023', icon: 'logos:meta-icon' },
]

export default function PublicResume() {
  return (
    <section id="resume" className="bg-warm-paper px-6 py-28">
      <div className="mx-auto max-w-3xl">
        <motion.div
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5 }}
        >
          <h2
            className="text-2xl font-medium tracking-tight text-charcoal dark:text-white/90"
            style={{ fontFamily: 'Georgia, "Times New Roman", serif' }}
          >
            Certificates &amp; Resume
          </h2>
          <p className="mt-2 text-sm text-charcoal/50 dark:text-white/50">
            Credentials and a downloadable resume.
          </p>
        </motion.div>

        {/* Certificate badges */}
        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.title}
              className="rounded-2xl border border-charcoal/5 bg-white/40 p-5 text-center shadow-sm"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
            >
              <Icon icon={cert.icon} className="mx-auto mb-3 size-8" />
              <h3 className="text-sm font-medium text-charcoal dark:text-white/90">{cert.title}</h3>
              <p className="mt-0.5 text-xs text-charcoal/50 dark:text-white/50">{cert.issuer}</p>
              <p className="mt-1 text-[10px] text-charcoal/30 dark:text-white/30">{cert.year}</p>
            </motion.div>
          ))}
        </div>

        {/* Download resume */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <a
            href="#"
            className="inline-flex items-center gap-2 rounded-xl bg-purple-brand/10 px-5 py-3 text-sm font-medium text-purple-brand transition-colors hover:bg-purple-brand/20"
          >
            <Icon icon="lucide:file-text" className="size-4" />
            Download Resume (PDF)
          </a>
        </motion.div>
      </div>
    </section>
  )
}
