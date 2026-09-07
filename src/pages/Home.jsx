import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Seo } from '../components/Seo'
import { JsonLd } from '../components/JsonLd'
import { LoadingScreen } from '../components/LoadingScreen/LoadingScreen'
import { TechnicalSpec } from '../components/TechnicalSpec/TechnicalSpec'
import { images } from '../data/imageConfig'
import {
  autonomyLayers,
  brand,
  developmentStatus,
  missionModules,
  platformSpecs,
  products,
  redundancyPaths,
  scalePoints,
  whyPillars,
} from '../data/content'
import { prefersReducedMotion } from '../animations/config'
import { VesselProgressProvider, useVesselProgress } from '../three/VesselProgress'
import { VesselJourney } from '../three/VesselJourney'
import { useVesselView } from '../hooks/useVesselView'

const VesselCanvas = lazy(() =>
  import('../three/VesselCanvas').then((module) => ({ default: module.VesselCanvas }))
)

function SentinelPin() {
  const rootRef = useRef(null)
  const { setShowcase } = useVesselProgress()
  const view = Math.min(products.length - 1, useVesselView())
  const active = products[view]

  useEffect(() => {
    const section = rootRef.current
    if (!section) return undefined

    const tick = () => {
      if (prefersReducedMotion()) {
        setShowcase(0, 0)
        return
      }
      const rect = section.getBoundingClientRect()
      const vh = window.innerHeight
      const travel = section.offsetHeight - vh
      const progress = travel <= 1 ? 0 : Math.min(1, Math.max(0, -rect.top / travel))
      let blend = 0
      if (rect.bottom > vh * 0.18 && rect.top < vh * 0.82) {
        if (rect.top <= 8 && rect.bottom >= vh * 0.72) blend = 1
        else if (rect.top > 8) blend = Math.min(1, Math.max(0, 1 - rect.top / (vh * 0.45)))
        else blend = Math.min(1, Math.max(0, (rect.bottom - vh * 0.22) / (vh * 0.4)))
      }
      setShowcase(progress, blend)
    }

    tick()
    window.addEventListener('scroll', tick, { passive: true })
    window.addEventListener('resize', tick)
    window.__lenis?.on('scroll', tick)
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 280)
    return () => {
      window.removeEventListener('scroll', tick)
      window.removeEventListener('resize', tick)
      window.__lenis?.off('scroll', tick)
      window.clearTimeout(refresh)
      setShowcase(0, 0)
    }
  }, [setShowcase])

  return (
    <section className="sads-sentinel" id="sentinel" ref={rootRef}>
      <div className="sads-sentinel__pin">
        <div className="container sads-sentinel__layout">
          <div className="sads-sentinel__copy">
            <div className="sads-kicker">
              <i />
              <p className="eyebrow">The Sentinel Series</p>
            </div>
            <h2 className="section-heading">One platform. Multiple missions.</h2>
            <p className="sads-name">{active.code}</p>
            <p className="eyebrow">{active.role}</p>
            <p className="sads-epithet">{active.epithet}</p>
            <p className="body">{active.summary}</p>
            <ul className="sads-list">
              {active.systems.slice(0, 4).map((system) => (
                <li key={system}>{system}</li>
              ))}
            </ul>
            <div className="sads-actions">
              <Link className="btn btn--solid" to={`/products/${active.slug}`}>
                Explore {active.code}
              </Link>
            </div>
            <ol className="sads-views" aria-label="Sentinel variants">
              {products.map((item, i) => (
                <li key={item.slug} className={i === view ? 'is-active' : ''}>
                  <span>{item.code}</span>
                  {item.role}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}

function HomeStory() {
  const { openDatasheet } = useOutletContext() ?? {}
  const { failedRef, subscribe } = useVesselProgress()
  const [failed, setFailed] = useState(true)
  const [module, setModule] = useState(0)
  const [path, setPath] = useState(0)
  const rootRef = useRef(null)

  useEffect(() => {
    const sync = () => setFailed(failedRef.current)
    sync()
    return subscribe(sync)
  }, [failedRef, subscribe])

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.sads-hero__line',
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, delay: 0.15, ease: 'power3.out' }
      )
      gsap.fromTo(
        '.sads-hero__after',
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, delay: 0.55, ease: 'power3.out' }
      )

      gsap.utils.toArray('[data-reveal]').forEach((node) => {
        gsap.fromTo(
          node,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.95,
            ease: 'power3.out',
            scrollTrigger: { trigger: node, start: 'top 84%' },
          }
        )
      })

      gsap.utils.toArray('[data-rise]').forEach((node) => {
        gsap.fromTo(
          node,
          { y: 24, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power2.out',
            scrollTrigger: { trigger: node.parentElement, start: 'top 80%' },
          }
        )
      })
    }, rootRef)
    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 360)
    return () => {
      window.clearTimeout(refresh)
      ctx.revert()
    }
  }, [])

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const tick = window.setInterval(() => {
      setModule((current) => (current + 1) % missionModules.length)
      setPath((current) => (current + 1) % 2)
    }, 2800)
    return () => window.clearInterval(tick)
  }, [])

  return (
    <div ref={rootRef}>
      <section className="sads-hero" id="landing">
        <div className={`sads-hero__media ${failed ? '' : 'is-hidden'}`}>
          <img src={images.heroSentinel} alt="" />
        </div>
        <div className="sads-hero__grid" aria-hidden="true" />
        <div className="sads-hero__wash" />
        <div className="container sads-hero__inner">
          <p className="eyebrow sads-hero__line">Samudra Astra Defence Systems</p>
          <h1 className="hero-heading">
            <span className="sads-hero__line">Command the</span>
            <span className="sads-hero__line">Blue Horizon.</span>
            <span className="sads-hero__line sads-hero__line--signal">No Compromise.</span>
          </h1>
          <div className="sads-hero__after">
            <p className="body sads-hero__support">{brand.supporting}</p>
            <p className="sads-hero__secondary">{brand.secondary}</p>
            <div className="sads-actions">
              <Link className="btn btn--solid" to="/products">
                Explore the Sentinel Series
              </Link>
              <button className="btn" type="button" onClick={openDatasheet}>
                Request Datasheet
              </button>
            </div>
            <div className="sads-hero__telemetry">
              <TechnicalSpec compact label="Series" value="Sentinel" unit="USV" />
              <TechnicalSpec compact label="Length" value="5.8" unit="m" />
              <TechnicalSpec compact label="Hull" value="Deep-V" unit="monohull" />
            </div>
          </div>
        </div>
      </section>

      <SentinelPin />

      <section className="sads-section sads-section--solid sads-section--dark">
        <div className="container sads-split">
          <div data-reveal>
            <p className="eyebrow">Common platform</p>
            <h2 className="section-heading">One hull. Multiple missions.</h2>
            <p className="body">
              All Sentinel Series vessels share a common platform architecture: a 5.8-metre
              Deep-V aluminium monohull with standardized payload interfaces.
            </p>
          </div>
          <div className="sads-spec-grid">
            {platformSpecs.map((item) => (
              <div data-rise key={item.label}>
                <TechnicalSpec {...item} />
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sads-section sads-section--solid sads-section--navy">
        <div className="container">
          <div data-reveal>
            <p className="eyebrow">Why Samudra Astra</p>
            <h2 className="section-heading">Modular by design. Redundant by principle.</h2>
          </div>
          <div className="sads-pillars">
            {whyPillars.map((item) => (
              <article data-rise key={item.id}>
                <p className="sads-num">{item.id}</p>
                <div className="sads-draw" aria-hidden="true" />
                <h3 className="card-heading">{item.title}</h3>
                <p className="body">{item.line}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sads-section sads-section--solid sads-section--dark">
        <div className="container">
          <div data-reveal>
            <p className="eyebrow">Modular by design</p>
            <h2 className="section-heading">One platform. Interchangeable mission systems.</h2>
            <p className="body">
              Mission modules can be swapped rapidly — turning a surveillance craft into a
              reconnaissance asset or interceptor.
            </p>
          </div>
          <div className="sads-modules">
            {missionModules.map((item, i) => (
              <article data-rise key={item.id} className={i === module ? 'sads-module is-active' : 'sads-module'}>
                <p className="eyebrow">{item.name}</p>
                <ul className="sads-list">
                  {item.items.map((entry) => (
                    <li key={entry}>{entry}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sads-section sads-section--solid sads-section--navy">
        <div className="container sads-split">
          <div data-reveal>
            <p className="eyebrow">Redundancy</p>
            <h2 className="section-heading">No single point of failure.</h2>
            <p className="body">
              Drawing from the endurance architecture of global leaders, our systems feature
              distributed power, redundant steering, and fault-tolerant control laws.
            </p>
            <p className="body">Offshore survivability is not an option. It is a design mandate.</p>
          </div>
          <div className="sads-redundancy" aria-hidden="true">
            {redundancyPaths.map((pair) => (
              <div className="sads-path" key={pair[0]}>
                <span className={path === 0 ? 'is-live' : ''}>{pair[0]}</span>
                <b />
                <span className={path === 1 ? 'is-live' : ''}>{pair[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="sads-section sads-section--solid sads-section--mist theme-light">
        <div className="container">
          <div data-reveal>
            <p className="eyebrow">Cost and scale</p>
            <h2 className="section-heading">High capability. Built to scale.</h2>
          </div>
          <div className="sads-scale">
            {scalePoints.map((item, i) => (
              <article data-rise key={item.title}>
                <p className="sads-num">0{i + 1}</p>
                <h3 className="card-heading">{item.title}</h3>
                <p className="body">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sads-section sads-section--solid sads-section--dark">
        <div className="container">
          <div data-reveal>
            <p className="eyebrow">Autonomy and integration</p>
            <h2 className="section-heading">Autonomous. Connected. Mission-ready.</h2>
            <p className="body">
              Supervised autonomy with loss-of-link procedures, built for seamless integration
              with naval C2 networks.
            </p>
          </div>
          <div className="sads-layers">
            {autonomyLayers.map((item) => (
              <article className="sads-layer" data-rise key={item.id}>
                <p className="sads-num">{item.id}</p>
                <div>
                  <h3 className="card-heading">{item.title}</h3>
                  <ul className="sads-list">
                    {item.items.map((entry) => (
                      <li key={entry}>{entry}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="sads-section sads-section--solid sads-section--navy">
        <div className="container">
          <div data-reveal>
            <p className="eyebrow">Future-ready</p>
            <h2 className="section-heading">Designed for the mission ahead.</h2>
            <p className="body">
              Open architecture enables payload growth and technology upgrades throughout the
              vessel’s lifecycle. The hull remains constant. The mission changes.
            </p>
            <p className="sads-name sads-name--small">{missionModules[module].name}</p>
          </div>
        </div>
      </section>

      <section className="sads-section sads-section--solid sads-section--dark" id="status">
        <div className="container">
          <div data-reveal>
            <p className="eyebrow">Development status</p>
            <h2 className="section-heading">Notes from the programme.</h2>
          </div>
          <ol className="sads-timeline">
            {developmentStatus.map((item) => (
              <li data-rise key={item.id}>
                <p className="meta">{item.when}</p>
                <div>
                  <h3 className="card-heading">{item.title}</h3>
                  <p className="body">{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="sads-section sads-section--solid sads-section--navy">
        <div className="container" data-reveal>
          <p className="eyebrow">Contact</p>
          <h2 className="section-heading">Request a datasheet.</h2>
          <p className="body">
            Start a conversation on the Sentinel Series. Datasheets are issued on request when
            they are released.
          </p>
          <div className="sads-actions">
            <button className="btn btn--solid" type="button" onClick={openDatasheet}>
              Request Datasheet
            </button>
            <Link className="btn" to="/contact">
              Start a Conversation
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export function Home() {
  return (
    <VesselProgressProvider>
      <Seo
        title="Samudra Astra Defence Systems | Unmanned Maritime Defence Systems"
        description="India's next-generation marine unmanned systems for surveillance, reconnaissance and interception."
      />
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: brand.name,
          parentOrganization: 'Eunoia Innovations Private Limited',
          email: brand.email,
          url: 'https://samudraastra.com/',
          slogan: brand.tagline,
        }}
      />
      <LoadingScreen />
      <Suspense fallback={null}>
        <VesselCanvas />
      </Suspense>
      <VesselJourney>
        <HomeStory />
      </VesselJourney>
    </VesselProgressProvider>
  )
}
