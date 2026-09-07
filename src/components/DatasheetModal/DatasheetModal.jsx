import { useEffect, useState } from 'react'
import { datasheetProducts } from '../../data/content'
import { submitEnquiry } from '../../services/enquiryService'
import './DatasheetModal.css'

const empty = {
  name: '',
  organisation: '',
  email: '',
  phone: '',
  product: 'sentinel-series',
}

export function DatasheetModal({ open, product = 'sentinel-series', onClose }) {
  const [form, setForm] = useState({ ...empty, product })
  const [status, setStatus] = useState('idle')
  const [error, setError] = useState('')

  useEffect(() => {
    setForm((current) => ({ ...current, product }))
    if (open) setStatus('idle')
  }, [product, open])

  useEffect(() => {
    if (!open) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open, onClose])

  if (!open) return null

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
    submitEnquiry({
      type: 'datasheet',
      subject: 'Product Enquiry',
      ...form,
    })
    setStatus('sent')
  }

  return (
    <div className="sheet" role="dialog" aria-modal="true" aria-labelledby="sheet-title">
      <button className="sheet__backdrop" type="button" aria-label="Close" onClick={onClose} />
      <div className="sheet__panel">
        <p className="eyebrow">Datasheet</p>
        <h2 id="sheet-title" className="card-heading">Request datasheet</h2>
        {status === 'sent' ? (
          <p className="body" role="status">
            Your mail client should open with this request. Send that message to complete it. A datasheet will be issued when it is released.
          </p>
        ) : (
          <form className="sheet__form" onSubmit={onSubmit}>
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
              Product of interest
              <select name="product" value={form.product} onChange={onChange}>
                {datasheetProducts.map((item) => (
                  <option key={item.value} value={item.value}>
                    {item.label}
                  </option>
                ))}
              </select>
            </label>
            {error ? <p className="sheet__error" role="alert">{error}</p> : null}
            <div className="sheet__actions">
              <button className="btn btn--solid" type="submit">
                Request Datasheet
              </button>
              <button className="btn" type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
