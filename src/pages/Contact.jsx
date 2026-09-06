import { useState } from 'react'
import { Seo } from '../components/Seo'

export function Contact() {
  const [sent, setSent] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <article className="page">
      <Seo
        title="Contact"
        description="Partner with Samudra Astra on engineering, technology and mission-focused development for the aquatic domain."
      />
      <header className="page__hero container">
        <p className="eyebrow">Contact</p>
        <h1 className="display">Get in touch.</h1>
        <p className="body">
          Samudra Astra works across engineering, technology and mission-focused
          development to advance capabilities for the aquatic domain.
        </p>
      </header>

      <div className="contact container">
        <form className="contact__form" onSubmit={onSubmit}>
          <label>
            Name
            <input name="name" type="text" required autoComplete="name" />
          </label>
          <label>
            Organisation
            <input name="org" type="text" required />
          </label>
          <label>
            Email
            <input name="email" type="email" required autoComplete="email" />
          </label>
          <label>
            Notes
            <textarea name="notes" rows="5" required />
          </label>
          <button className="btn btn--solid" type="submit">
            {sent ? 'Received' : 'Partner with us'}
          </button>
          {sent && (
            <p className="meta" role="status">
              This form is a demonstration. Nothing was transmitted.
            </p>
          )}
        </form>

        <aside className="contact__aside">
          <p className="meta">Contact Samudra Astra</p>
          <p className="body">
            Use this page to start a conversation. Direct contact details will
            be published when they are confirmed.
          </p>
        </aside>
      </div>
    </article>
  )
}
