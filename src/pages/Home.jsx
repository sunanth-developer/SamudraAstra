import { lazy, Suspense } from 'react'
import { Seo } from '../components/Seo'
import { LoadingScreen } from '../components/LoadingScreen/LoadingScreen'
import { ScrollProgress } from '../components/ScrollProgress/ScrollProgress'
import { HeroSection } from '../sections/HeroSection'
import { IntroSection } from '../sections/IntroSection'
import { ServicesSection } from '../sections/ServicesSection'
import { VesselShowcaseSection } from '../sections/VesselShowcaseSection'
import { SystemsSection } from '../sections/SystemsSection'
import { FieldSection } from '../sections/FieldSection'
import { InsightsSection } from '../sections/InsightsSection'
import { CTASection } from '../sections/CTASection'
import { VesselProgressProvider } from '../three/VesselProgress'
import { VesselJourney } from '../three/VesselJourney'

const VesselCanvas = lazy(() =>
  import('../three/VesselCanvas').then((module) => ({ default: module.VesselCanvas }))
)

export function Home() {
  return (
    <VesselProgressProvider>
      <Seo
        title="Samudra Astra | Aquatic Defence Technology"
        description="Samudra Astra develops advanced aquatic defence technologies for sensing, autonomy, intelligence and maritime security."
      />
      <LoadingScreen />
      <ScrollProgress />
      <Suspense fallback={null}>
        <VesselCanvas />
      </Suspense>
      <VesselJourney>
        <HeroSection />
        <IntroSection />
        <ServicesSection />
        <VesselShowcaseSection />
        <SystemsSection />
        <FieldSection />
        <InsightsSection />
        <CTASection />
      </VesselJourney>
    </VesselProgressProvider>
  )
}
