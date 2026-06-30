// src/pages/public/PublicHome.tsx
import PublicHero from '../../components/public/sections/PublicHero'
import { Navbar } from '../../components/navigation/Navbar'
import PublicAbout from '../../components/public/sections/PublicAbout'
import PublicExperience from '../../components/public/sections/PublicExperience'
import PublicSkillsEduc from '../../components/public/sections/PublicSkillsEduc'
import PublicProjects from '../../components/public/sections/PublicProjects'
import PublicArtGallery from '../../components/public/sections/PublicArtGallery'
import PublicResumeCert from '../../components/public/sections/PublicResumeCert'
import PublicContactFooter from '../../components/public/sections/PublicContactFooter'

export default function PublicHome() {
  return (
    <>
      <PublicHero />
      <Navbar />

      <section id="library-content" />

      <PublicAbout />
      <PublicExperience />
      <PublicProjects />
      <PublicArtGallery />
      <PublicSkillsEduc />
      <PublicResumeCert />
      <PublicContactFooter />
    </>
  )
}