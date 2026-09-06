export function Logo({ className = '', large = false }) {
  return (
    <span className={`logo ${large ? 'logo--large' : ''} ${className}`}>
      <svg
        className="logo__mark"
        viewBox="0 0 32 32"
        aria-hidden="true"
        focusable="false"
      >
        <circle cx="16" cy="16" r="11" />
        <circle cx="16" cy="16" r="6.5" />
        <circle cx="16" cy="16" r="2.2" fill="currentColor" stroke="none" />
      </svg>
      <span className="logo__word">Samudra Astra</span>
    </span>
  )
}
