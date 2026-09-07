import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { brand, enquirySubjects } from '../data/content'
import { submitEnquiry } from '../services/enquiryService'

const empty = {
  name: '',
  organisation: '',
  email: '',
  phone: '',
  subject: 'General',
  message: '',
}

export function Contact() {
  const [params] = useSearchParams()
  const initialSubject = enquirySubjects.includes(params.get('subject'))
    ? params.get('subject')
    : 'General'
  const [form, setForm] = useState({ ...empty, subject: initialSubject })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  const showPhone = useMemo(() => Boolean(brand.phone), [])
  const showLocation = useMemo(() => Boolean(brand.location), [])

  const onChange = (e) => {
    setForm((current) => ({ ...current, [e.target.name]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setError('')
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setError('Enter a valid email address.')
      return
    }
    if (form.phone && !/^[+\d][\d\s()-]{7,}$/.test(form.phone)) {
      setError('Enter a valid phone number.')
      return
    }
    submitEnquiry({ type: 'contact', ...form })
    setStatus('sent')
  }

  return (
    <article className="page">
      <Seo
        title="Contact Samudra Astra Defence Systems"
        description="Start a conversation with Samudra Astra Defence Systems."
      />
      <header className="container sads-page-hero" data-reveal>
        <p className="eyebrow">Contact</p>
        <h1 className="section-heading">Start a conversation.</h1>
        <p className="body">
          {brand.name}
          <br />
          {brand.parent}
        </p>
      </header>

      <section className="sads-section sads-section--navy">
        <div className="container sads-split">
          <aside>
            <p className="eyebrow">Direct</p>
            <p className="body">
              <a href={`mailto:${brand.email}`}>{brand.email}</a>
            </p>
            {showPhone ? <p className="body">{brand.phone}</p> : null}
            {showLocation ? <p className="body">{brand.location}</p> : null}
          </aside>

          {status === 'sent' ? (
            <p className="body" role="status">
              Your mail client should open with this enquiry addressed to {brand.email}.
              Send that message to complete the request.
            </p>
          ) : (
            <form className="sads-form" onSubmit={onSubmit}>
              <label>
                Name
                <input name="name" value={form.name} onChange={onChange} required autoComplete="name" />
              </label>
              <label>
                Organisation
                <input name="organisation" value={form.organisation} onChange={onChange} required />
              </label>
              <label>
                Email
                <input name="email" type="email" value={form.email} onChange={onChange} required autoComplete="email" />
              </label>
              <label>
                Phone
                <input name="phone" type="tel" value={form.phone} onChange={onChange} autoComplete="tel" />
              </label>
              <label>
                Subject
                <select name="subject" value={form.subject} onChange={onChange}>
                  {enquirySubjects.map((item) => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Message
                <textarea name="message" rows="6" value={form.message} onChange={onChange} required />
              </label>
              {error ? <p className="sheet__error" role="alert">{error}</p> : null}
              <button className="btn btn--solid" type="submit">
                Submit Enquiry
              </button>
            </form>
          )}
        </div>
      </section>
    </article>
  )
}
