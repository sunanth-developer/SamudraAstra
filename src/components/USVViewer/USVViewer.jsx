import { images } from '../../data/imageConfig'
import './USVViewer.css'

export function USVViewer({
  src = images.heroSentinel,
  alt = 'Sentinel-class unmanned surface vessel',
  annotations = [],
  caption = 'Product visual — engineering render to be replaced.',
}) {
  return (
    <figure className="usv-view">
      <img src={src} alt={alt} />
      <ul className="usv-view__marks" aria-hidden={annotations.length ? undefined : true}>
        {annotations.map((item) => (
          <li key={item.label} style={{ left: `${item.x}%`, top: `${item.y}%` }}>
            <i />
            <span>{item.label}</span>
          </li>
        ))}
      </ul>
      <figcaption className="meta">{caption}</figcaption>
    </figure>
  )
}
