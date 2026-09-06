import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'lenis/dist/lenis.css'
import './styles/tokens.css'
import './styles/global.css'
import './components/Cursor/Cursor.css'
import './components/Navbar/Navbar.css'
import './components/Footer/Footer.css'
import './components/RevealText/RevealText.css'
import './components/ImageReveal/ImageReveal.css'
import './components/ProcessGlobe/ProcessGlobe.css'
import './components/UsvVisual/UsvVisual.css'
import './components/SonarScanner/SonarScanner.css'
import './components/SectionHeading/SectionHeading.css'
import './components/PageTransition/PageTransition.css'
import './sections/HeroSection.css'
import './sections/IntroSection.css'
import './sections/ServicesSection.css'
import './sections/SystemsSection.css'
import './sections/HowItWorksSection.css'
import './sections/PrinciplesSection.css'
import './sections/ExperienceSection.css'
import './sections/SecuritySection.css'
import './sections/FieldSection.css'
import './sections/InsightsSection.css'
import './sections/CTASection.css'
import './pages/pages.css'
import './admin/admin.css'
import App from './App.jsx'
import { registerGsap } from './animations/config'

registerGsap()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
