import { media } from '../../data/media'
import { UsvModel } from './UsvModel'

const MODES = [
  { scan: 'Sense', status: 'Listening', domain: 'Surface', part: 'Sensor mast' },
  { scan: 'Detect', status: 'Contact', domain: 'Surface', part: 'Radar' },
  { scan: 'Understand', status: 'Fusing', domain: 'Network', part: 'Communications' },
  { scan: 'Respond', status: 'Ready', domain: 'Mission', part: 'Hull' },
]

export function UsvVisual({ active = 0 }) {
  const mode = MODES[active] || MODES[0]

  return (
    <div className={`usv-visual is-step-${active}`} aria-hidden="true">
      <img className="usv-visual__sea" src={media.usv} alt="" />
      <div className="usv-visual__wash" />
      <UsvModel active={active} />
      <div className="usv-visual__hud">
        <span>
          <em>Platform</em>
          USV 01
        </span>
        <span>
          <em>Part</em>
          {mode.part}
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
