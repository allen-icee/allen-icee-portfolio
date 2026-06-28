import PublicHero from '../../components/public/PublicHero'
import { Navbar } from '../../components/navigation/Navbar'
import PublicAbout from '../../components/public/PublicAbout'
import PublicExperience from '../../components/public/PublicExperience'
import PublicSkills from '../../components/public/PublicSkills'
import PublicProjects from '../../components/public/PublicProjects'
import PublicArtGallery from '../../components/public/PublicArtGallery'
import PublicResume from '../../components/public/PublicResume'
import PublicContact from '../../components/public/PublicContact'
import PublicFooter from '../../components/public/PublicFooter'

export default function PublicHome() {
  return (
    <>
      <PublicHero />
      <Navbar />

      {/* ponytail: scroll target for the "Open The Library" CTA */}
      <section id="library-content" />

      <PublicAbout />
      <PublicProjects />
      <PublicArtGallery />
      <PublicExperience />
      <PublicSkills />
      <PublicResume />
      <PublicContact />
      <PublicFooter />
    </>
  )
}
