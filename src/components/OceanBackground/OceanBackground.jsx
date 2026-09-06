import { media } from '../../data/media'
import './OceanBackground.css'

export function OceanBackground({ src = media.heroPoster, className = '' }) {
  return (
    <div className={`ocean-bg ${className}`} aria-hidden="true">
      <img src={src} alt="" />
      <div className="ocean-bg__horizon" />
      <div className="ocean-bg__fog" />
      <div className="ocean-bg__waves" />
    </div>
  )
}
