// ponytail: one-time seed script. Run with: npx tsx scripts/seed-firestore.ts
// Pushes mock data into Firestore so the admin has real content to edit.

import 'dotenv/config'
import { initializeApp } from 'firebase/app'
import { getFirestore, doc, setDoc } from 'firebase/firestore'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { MOCK_PROJECTS } from '../src/data/projectsData'
import { mockSkills, mockExperiences, mockArtworks } from '../src/data/portfolioData'
import { certificates } from '../src/data/certificatesData'

if (!process.env.VITE_FIREBASE_PROJECT_ID) {
  console.error("❌ Error: Missing VITE_FIREBASE_PROJECT_ID in environment variables.")
  process.exit(1)
}

const firebaseConfig = {
  apiKey: process.env.VITE_FIREBASE_API_KEY ?? '',
  authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN ?? '',
  projectId: process.env.VITE_FIREBASE_PROJECT_ID ?? '',
  storageBucket: process.env.VITE_FIREBASE_STORAGE_BUCKET ?? '',
  messagingSenderId: process.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: process.env.VITE_FIREBASE_APP_ID ?? '',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

const now = Date.now()

async function seed() {
  const email = process.env.SEED_EMAIL
  const password = process.env.SEED_PASSWORD

  if (!email || !password) {
    console.error("❌ Error: Permission Denied.")
    console.error("Because we secured the database, you must be logged in to seed data.")
    console.error("Please add SEED_EMAIL=\"your_email\" and SEED_PASSWORD=\"your_password\" to your .env file and run this again.")
    process.exit(1)
  }

  console.log('Logging in to Firebase...')
  await signInWithEmailAndPassword(auth, email, password)
  
  console.log('Successfully logged in! Seeding Firestore…')

  for (const proj of MOCK_PROJECTS) {
    const ref = doc(db, 'projects', proj.id)
    await setDoc(ref, { ...proj, createdAt: now, updatedAt: now })
    console.log(`  ✓ project: ${proj.title}`)
  }

  for (const skill of mockSkills) {
    const ref = doc(db, 'skills', skill.id)
    await setDoc(ref, { ...skill, createdAt: now, updatedAt: now })
    console.log(`  ✓ skill: ${skill.name}`)
  }

  for (const exp of mockExperiences) {
    const ref = doc(db, 'experience', exp.id)
    await setDoc(ref, { ...exp, createdAt: exp.createdAt || now, updatedAt: exp.updatedAt || now })
    console.log(`  ✓ experience: ${exp.role}`)
  }

  for (const art of mockArtworks) {
    const ref = doc(db, 'artworks', art.id)
    await setDoc(ref, { ...art, createdAt: now, updatedAt: now })
    console.log(`  ✓ artwork: ${art.title}`)
  }

  // Adding empty arrays for optional lists if they don't exist
  // Or seed other defaults here.
  
  const skillCategories = [
    { id: 'frontend', name: 'Frontend', classification: 'technical', createdAt: now, updatedAt: now },
    { id: 'backend', name: 'Backend', classification: 'technical', createdAt: now, updatedAt: now },
    { id: 'database', name: 'Database', classification: 'technical', createdAt: now, updatedAt: now },
    { id: 'mobile', name: 'Mobile', classification: 'technical', createdAt: now, updatedAt: now },
    { id: 'desktop', name: 'Desktop', classification: 'technical', createdAt: now, updatedAt: now },
    { id: 'language', name: 'Language', classification: 'technical', createdAt: now, updatedAt: now },
    { id: 'design', name: 'Design', classification: 'technical', createdAt: now, updatedAt: now },
    { id: 'tools', name: 'Tools', classification: 'technical', createdAt: now, updatedAt: now },
    { id: 'testing', name: 'Testing', classification: 'technical', createdAt: now, updatedAt: now },
    { id: 'networking', name: 'Networking', classification: 'technical', createdAt: now, updatedAt: now },
    { id: 'creative', name: 'Creative', classification: 'technical', createdAt: now, updatedAt: now },
    { id: 'professional', name: 'Professional', classification: 'professional', createdAt: now, updatedAt: now },
    { id: 'soft-skills', name: 'Soft Skills', classification: 'professional', createdAt: now, updatedAt: now },
  ]
  
  for (const cat of skillCategories) {
    await setDoc(doc(db, 'skillCategories', cat.id), cat)
  }
  console.log('  ✓ skillCategories')

  for (const cert of certificates) {
    const ref = doc(db, 'certificates', cert.id)
    await setDoc(ref, { ...cert, createdAt: now, updatedAt: now })
    console.log(`  ✓ certificate: ${cert.title}`)
  }
  
  const contactInfo = {
    id: 'primary',
    email: 'alleniceedequiros@gmail.com',
    phone: '',
    github: 'https://github.com/mr-dearest',
    linkedin: 'https://www.linkedin.com/in/allen-icee-dequiros/',
    facebook: 'https://www.facebook.com/AllenIceeDequiros',
    instagram: 'https://www.instagram.com/allen_icee/',
    updatedAt: now
  }
  await setDoc(doc(db, 'contactInfo', 'primary'), contactInfo)
  console.log('  ✓ contactInfo: primary')

  console.log('\nDone! You can now view your live data in the Firebase Console.')
}

seed().catch((err) => {
  console.error("Error seeding database:", err)
})
