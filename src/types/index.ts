export interface User {
  uid: string
  email: string
  displayName: string
}

export interface Project {
  id: string
  title: string
  tagline: string
  description: string
  techStack: string[]
  coverImage: string
  images?: string[]
  githubLink: string
  liveUrl?: string
  figmaUrl?: string
  isFeatured: boolean
  createdAt: number
  updatedAt: number
}

export interface Experience {
  id: string
  role: string
  company: string
  timeline: { start: string; end?: string }
  description: string
  technologies: string[]
  createdAt: number
  updatedAt: number
}

export interface Skill {
  id: string
  name: string
  category: string
  yearsOfExperience: number
  confidence: number
  icon: string
  createdAt: number
  updatedAt: number
}

export interface Artwork {
  id: string
  title: string
  imageURL: string
  medium: string
  story: string
  createdAt: number
  updatedAt: number
}

export interface LibraryItem {
  id: string
  title: string
  url: string
  category: 'book' | 'article' | 'video' | 'tool'
  tags: string[]
}

export interface MockSkill {
  id: string
  name: string
  category: string
  yearsOfExperience: number
  confidence: number
  icon: string
}

export interface MockJournalEntry {
  title: string
  body: string
  signature: string
}

export interface MockProject {
  id: string
  title: string
  tagline: string
  description: string
  techStack: string[]
  coverImage: string
  githubLink: string
}

export interface MockArtwork {
  id: string
  title: string
  imageURL: string
  medium: string
  story: string
}



export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  credentialId?: string
  category?: string
  verificationUrl?: string
  image: string
}