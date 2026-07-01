export interface User {
  uid: string
  email: string
  displayName: string
}

export interface Project {
  id: string
  order: number
  title: string
  tagline: string
  description: string
  techStack: string[]
  coverImage: string
  images?: string[]
  githubLink?: string
  liveUrl?: string
  createdAt?: number
  updatedAt?: number
}

export interface Experience {
  id: string
  order: number
  role: string
  company: string
  startMonth: string
  startYear: string
  endMonth?: string
  endYear?: string
  description: string
  skillsAcquired: string[]
  createdAt?: number
  updatedAt?: number
}

export interface SkillCategory {
  id: string
  name: string
  classification: 'technical' | 'professional'
  createdAt?: number
  updatedAt?: number
}

export interface Skill {
  id: string
  name: string
  categoryId: string
  icon: string
  createdAt?: number
  updatedAt?: number
}

export interface Artwork {
  id: string
  title: string
  image: string
  medium: string
  story?: string
  createdAt?: number
  updatedAt?: number
}

export interface Certificate {
  id: string
  title: string
  issuer: string
  date: string
  endDate?: string
  credentialId?: string
  category?: string
  verificationUrl?: string
  image: string
  createdAt?: number
  updatedAt?: number
}

export interface ContactInfo {
  id: string
  email: string
  github: string
  linkedin: string
  facebook: string
  instagram: string
  updatedAt?: number
}

export interface LibraryItem {
  id: string
  title: string
  url: string
  category: 'book' | 'article' | 'video' | 'tool'
  tags: string[]
}

// Keep the mock interfaces as they are used in the components until we fully connect Firebase
export interface MockSkill {
  id: string
  name: string
  categoryId: string
  icon: string
  createdAt?: number
  updatedAt?: number
}

export interface MockJournalEntry {
  title: string
  body: string
  signature: string
  createdAt?: number
  updatedAt?: number
}

export interface MockProject {
  id: string
  order?: number
  title: string
  tagline: string
  description: string
  techStack: string[]
  coverImage: string
  githubLink?: string
  figmaUrl?: string
  isFeatured?: boolean
  images?: string[]
  liveUrl?: string
  createdAt?: number
  updatedAt?: number
}

export interface MockArtwork {
  id: string
  title: string
  image: string
  medium: string
  story: string
  createdAt?: number
  updatedAt?: number
}

export interface MockExperience {
  id: string
  order?: number
  role: string
  company: string
  startMonth: string
  startYear: string
  endMonth?: string
  endYear?: string
  description: string
  skillsAcquired: string[]
  createdAt?: number
  updatedAt?: number
}