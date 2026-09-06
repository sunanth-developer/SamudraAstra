import { RevealText } from '../RevealText/RevealText'

export function SectionHeading({ eyebrow, title, lines, className = '' }) {
  return (
    <header className={`section-head ${className}`}>
      {eyebrow && <span className="eyebrow">{eyebrow}</span>}
      {lines ? (
        <RevealText as="h2" className="section-heading" lines={lines} />
      ) : (
        <h2 className="section-heading">{title}</h2>
      )}
    </header>
  )
}
