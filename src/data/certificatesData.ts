import type { Certificate } from '../types'

export const certificates: Certificate[] = [
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
