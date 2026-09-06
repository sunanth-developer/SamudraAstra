import { Seo } from '../components/Seo'
import { ImageReveal } from '../components/ImageReveal/ImageReveal'
import { processSteps } from '../data/content'

export function Technology() {
  return (
    <article className="page">
      <Seo
        title="Technology"
        description="How Samudra Astra thinks about sensing, detection, understanding and response in the maritime domain."
      />
      <header className="page__hero container">
        <p className="eyebrow">04 / Technology</p>
        <h1 className="display">Intelligence in every layer.</h1>
        <p className="body">
          A four-stage information architecture: sense, detect, understand,
          respond. This is a design narrative — not a performance specification.
        </p>
      </header>

      <ol className="page__process container">
        {processSteps.map((step) => (
          <li key={step.id}>
            <div className="page__process-media">
              <ImageReveal src={step.image} alt={step.title} />
            </div>
            <div>
              <span className="meta">
                {step.id} · {step.meta}
              </span>
              <h2 className="card-heading">{step.title}</h2>
              <p className="body">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </article>
  )
}
