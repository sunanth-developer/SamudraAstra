import { media } from '../data/media'
import './Logo.css'

export function Logo({
  className = '',
  large = false,
  variant = 'white',
}) {
  const src = variant === 'black' ? media.logoBlack : media.logoWhite

  return (
    <span className={`logo logo--${variant} ${large ? 'logo--large' : ''} ${className}`}>
      <img src={src} alt="Samudra Astra" />
    </span>
  )
}
