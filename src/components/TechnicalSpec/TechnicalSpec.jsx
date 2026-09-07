import './TechnicalSpec.css'

export function TechnicalSpec({ label, value, unit, description, compact = false }) {
  return (
    <div className={compact ? 'tspec tspec--compact' : 'tspec'}>
      <p className="tspec__label">{label}</p>
      <p className="tspec__value">
        {value}
        {unit ? <span>{unit}</span> : null}
      </p>
      {description ? <p className="tspec__note">{description}</p> : null}
    </div>
  )
}
