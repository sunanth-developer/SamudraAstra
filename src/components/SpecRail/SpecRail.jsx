import './SpecRail.css'

export function SpecRail({ items = [], ink = false }) {
  return (
    <ul className={ink ? 'spec-rail spec-rail--ink' : 'spec-rail'}>
      {items.map((item) => (
        <li key={item.label}>
          <p className="spec-rail__value">
            {item.value}
            {item.unit ? <span>{item.unit}</span> : null}
          </p>
          <p className="spec-rail__label">{item.label}</p>
          {item.description ? <p className="spec-rail__note">{item.description}</p> : null}
        </li>
      ))}
    </ul>
  )
}
