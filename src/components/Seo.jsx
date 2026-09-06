import { useEffect } from 'react'

export function Seo({
  title,
  description,
  image = '/images/hero-ocean.jpg',
}) {
  useEffect(() => {
    const fullTitle = title.includes('Samudra Astra')
      ? title
      : `${title} | Samudra Astra`

    document.title = fullTitle

    const set = (selector, attr, value) => {
      const el = document.querySelector(selector)
      if (el) el.setAttribute(attr, value)
    }

    set('meta[name="description"]', 'content', description)
    set('meta[property="og:title"]', 'content', fullTitle)
    set('meta[property="og:description"]', 'content', description)
    set('meta[property="og:image"]', 'content', image)
    set('meta[name="twitter:title"]', 'content', fullTitle)
    set('meta[name="twitter:description"]', 'content', description)
    set('meta[name="twitter:image"]', 'content', image)
  }, [title, description, image])

  return null
}
