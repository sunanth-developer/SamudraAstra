import { useEffect } from 'react'

export function JsonLd({ data }) {
  const json = JSON.stringify(data)

  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.sads = 'jsonld'
    script.text = json
    document.head.appendChild(script)
    return () => script.remove()
  }, [json])

  return null
}
