import { media } from '../../data/media'
import { SonarScanner } from '../SonarScanner/SonarScanner'

const MODES = [
  { scan: 'Sense', status: 'Listening', domain: 'Acoustic' },
  { scan: 'Detect', status: 'Contact', domain: 'Sub-surface' },
  { scan: 'Understand', status: 'Fusing', domain: 'Data' },
  { scan: 'Respond', status: 'Ready', domain: 'Mission' },
]

export function SubmarineVisual({ active = 0 }) {
  const mode = MODES[active] || MODES[0]

  return (
    <div className={`submarine-visual is-step-${active}`} aria-hidden="true">
      <img
        className="submarine-visual__craft"
        src={media.submarine}
        alt=""
      />
      <div className="submarine-visual__wash" />
      <div className="submarine-visual__particles" />
      <div className="submarine-visual__sonar">
        <SonarScanner compact quiet />
      </div>
      <div className="submarine-visual__hud">
        <span>
          <em>Platform</em>
          AUV 01
        </span>
        <span>
          <em>Scan</em>
          {mode.scan}
        </span>
        <span>
          <em>Status</em>
          <b className={active === 1 ? 'is-signal' : ''}>{mode.status}</b>
        </span>
        <span>
          <em>Domain</em>
          {mode.domain}
        </span>
      </div>
    </div>
  )
}
