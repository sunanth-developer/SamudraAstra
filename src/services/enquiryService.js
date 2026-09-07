import { brand } from '../data/content'

function line(label, value) {
  return value ? `${label}: ${value}` : ''
}

export function submitEnquiry(payload) {
  const type = payload.type === 'datasheet' ? 'Datasheet request' : 'Website enquiry'
  const subject = encodeURIComponent(
    `${type} — ${payload.subject || payload.product || 'General'} — ${payload.name || ''}`.trim()
  )
  const body = encodeURIComponent(
    [
      type,
      line('Name', payload.name),
      line('Organisation', payload.organisation),
      line('Email', payload.email),
      line('Phone', payload.phone),
      line('Subject', payload.subject),
      line('Product', payload.product),
      payload.message ? `\nMessage:\n${payload.message}` : '',
    ]
      .filter(Boolean)
      .join('\n')
  )

  window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`
  return { ok: true }
}
