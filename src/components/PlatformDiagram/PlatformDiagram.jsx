import { useEffect, useState } from 'react'
import { images } from '../../data/imageConfig'
import { commonTechnical, platformSpecs } from '../../data/content'
import { prefersReducedMotion } from '../../animations/config'
import './PlatformDiagram.css'

const callouts = [
  platformSpecs[0],
  platformSpecs[1],
  platformSpecs[2],
  platformSpecs[3],
]

const layers = [
  {
    id: 'hull',
    title: 'Base platform',
    spec: platformSpecs[3],
    extra: commonTechnical[0],
  },
  {
    id: 'propulsion',
    title: 'Propulsion',
    spec: platformSpecs[5],
    extra: commonTechnical[1],
  },
  {
    id: 'navigation',
    title: 'Navigation',
    spec: platformSpecs[7],
    extra: commonTechnical[3],
  },
  {
    id: 'communications',
    title: 'Communications',
    spec: platformSpecs[8],
    extra: commonTechnical[4],
  },
  {
    id: 'payload',
    title: 'Payload',
    spec: { label: 'Payload Interface', value: 'Modular', unit: 'standardized' },
    extra: commonTechnical[5],
  },
  {
    id: 'autonomy',
    title: 'Autonomy',
    spec: platformSpecs[6],
    extra: commonTechnical[3],
  },
]

export function PlatformDiagram() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (prefersReducedMotion()) return undefined
    const tick = window.setInterval(() => {
      setActive((current) => (current + 1) % layers.length)
    }, 3200)
    return () => window.clearInterval(tick)
  }, [])

  const layer = layers[active]

  return (
    <div className="plat">
      <div className="plat__visual">
        <img src={images.platform} alt="Sentinel-class common platform" />
        <ul className="plat__marks">
          {callouts.map((item, index) => (
            <li key={item.label} className={`plat__mark plat__mark--${index}`}>
              <p className="plat__value">
                {item.value}
                {item.unit ? <span>{item.unit}</span> : null}
              </p>
              <p className="plat__label">{item.label}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="plat__layers">
        <p className="meta">One hull + modular mission systems</p>
        <ol>
          {layers.map((item, index) => (
            <li key={item.id}>
              <button
                type="button"
                className={index === active ? 'is-active' : ''}
                onClick={() => setActive(index)}
              >
                <span>0{index + 1}</span>
                {item.title}
              </button>
            </li>
          ))}
        </ol>
        <div className="plat__detail" aria-live="polite">
          <p className="plat__detail-title">{layer.title}</p>
          <p className="plat__detail-value">
            {layer.spec.value}
            {layer.spec.unit ? <span>{layer.spec.unit}</span> : null}
          </p>
          <p className="body">{layer.extra.value}</p>
        </div>
      </div>
    </div>
  )
}
