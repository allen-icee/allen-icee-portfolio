import PublicHero from '../../components/public/PublicHero'
import PublicNavigation from '../../components/public/PublicNavigation'
import PublicAbout from '../../components/public/PublicAbout'
import PublicExperience from '../../components/public/PublicExperience'
import PublicSkills from '../../components/public/PublicSkills'
import PublicProjects from '../../components/public/PublicProjects'
import PublicArtGallery from '../../components/public/PublicArtGallery'
import PublicResume from '../../components/public/PublicResume'

export default function PublicHome() {
  return (
    <>
      <PublicHero />
      <PublicNavigation />

      {/* ponytail: scroll target for the "Open The Library" CTA */}
      <section id="library-content" />

      <PublicAbout />
      <PublicExperience />
      <PublicSkills />
      <PublicProjects />
      <PublicArtGallery />
      <PublicResume />
    </>
  )
}
