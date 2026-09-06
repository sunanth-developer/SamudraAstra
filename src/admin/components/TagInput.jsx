import { useState } from 'react'
import { SUGGESTED_TAGS } from '../../data/mockCategories'

export function TagInput({ value = [], onChange }) {
  const [draft, setDraft] = useState('')

  const add = (raw) => {
    const tag = String(raw || draft).trim()
    if (!tag || value.includes(tag)) {
      setDraft('')
      return
    }
    onChange([...value, tag])
    setDraft('')
  }

  return (
    <div className="cms-tags">
      <div className="cms-tags__list">
        {value.map((tag) => (
          <button
            key={tag}
            type="button"
            className="cms-chip"
            onClick={() => onChange(value.filter((item) => item !== tag))}
          >
            {tag} ×
          </button>
        ))}
      </div>
      <input
        value={draft}
        onChange={(e) => setDraft(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault()
            add()
          }
        }}
        placeholder="Add a tag"
      />
      <div className="cms-tags__suggest">
        {SUGGESTED_TAGS.filter((tag) => !value.includes(tag)).slice(0, 6).map((tag) => (
          <button key={tag} type="button" className="cms-chip cms-chip--ghost" onClick={() => add(tag)}>
            {tag}
          </button>
        ))}
      </div>
    </div>
  )
}
