import { autonomyLayers } from '../../data/content'
import './AutonomyFlow.css'

export function AutonomyFlow() {
  return (
    <ol className="autoflow">
      {autonomyLayers.map((item, index) => (
        <li key={item.id}>
          <p className="autoflow__index">{item.id}</p>
          <div>
            <h3 className="card-heading">{item.title}</h3>
            <ul className="sads-list">
              {item.items.map((entry) => (
                <li key={entry}>{entry}</li>
              ))}
            </ul>
          </div>
          {index < autonomyLayers.length - 1 ? (
            <span className="autoflow__rule" aria-hidden="true" />
          ) : null}
        </li>
      ))}
    </ol>
  )
}
