import { Seo } from '../components/Seo'
import { HeroSection } from '../sections/HeroSection'
import { IntroSection } from '../sections/IntroSection'
import { ServicesSection } from '../sections/ServicesSection'
import { SystemsSection } from '../sections/SystemsSection'
import { HowItWorksSection } from '../sections/HowItWorksSection'
import { PrinciplesSection } from '../sections/PrinciplesSection'
import { ExperienceSection } from '../sections/ExperienceSection'
import { SecuritySection } from '../sections/SecuritySection'
import { FieldSection } from '../sections/FieldSection'
import { InsightsSection } from '../sections/InsightsSection'
import { CTASection } from '../sections/CTASection'

export function Home() {
  return (
    <>
      <Seo
        title="Samudra Astra | Aquatic Defence Technology"
        description="Samudra Astra develops advanced aquatic defence technologies for sensing, autonomy, intelligence and maritime security."
      />
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <SystemsSection />
      <PrinciplesSection />
      <HowItWorksSection />
      <ExperienceSection />
      <SecuritySection />
      <FieldSection />
      <InsightsSection />
      <CTASection />
    </>
  )
}
