import { useEffect, useRef } from 'react'

const ACTIONS = [
  { cmd: 'formatBlock', value: 'P', label: 'P' },
  { cmd: 'formatBlock', value: 'H2', label: 'H2' },
  { cmd: 'formatBlock', value: 'H3', label: 'H3' },
  { cmd: 'bold', label: 'B' },
  { cmd: 'italic', label: 'I' },
  { cmd: 'insertUnorderedList', label: '•' },
  { cmd: 'insertOrderedList', label: '1.' },
  { cmd: 'formatBlock', value: 'BLOCKQUOTE', label: 'Quote' },
  { cmd: 'createLink', label: 'Link' },
  { cmd: 'insertHorizontalRule', label: '—' },
]

export function ContentEditor({ value, onChange }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    if (document.activeElement === ref.current) return
    if (ref.current.innerHTML !== (value || '')) {
      ref.current.innerHTML = value || ''
    }
  }, [value])

  const run = (action) => {
    if (action.cmd === 'createLink') {
      const url = window.prompt('Link URL')
      if (url) document.execCommand('createLink', false, url)
    } else if (action.value) {
      document.execCommand(action.cmd, false, action.value)
    } else {
      document.execCommand(action.cmd, false)
    }
    onChange(ref.current?.innerHTML || '')
  }

  const insertImage = () => {
    const url = window.prompt('Image URL')
    if (!url) return
    document.execCommand('insertImage', false, url)
    onChange(ref.current?.innerHTML || '')
  }

  return (
    <div className="cms-editor">
      <div className="cms-editor__bar" role="toolbar" aria-label="Formatting">
        {ACTIONS.map((action) => (
          <button
            key={action.label}
            type="button"
            className="cms-editor__tool"
            onMouseDown={(e) => {
              e.preventDefault()
              run(action)
            }}
          >
            {action.label}
          </button>
        ))}
        <button
          type="button"
          className="cms-editor__tool"
          onMouseDown={(e) => {
            e.preventDefault()
            insertImage()
          }}
        >
          Image
        </button>
      </div>
      <div
        ref={ref}
        className="cms-editor__canvas"
        contentEditable
        role="textbox"
        aria-label="Article content"
        suppressContentEditableWarning
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
      />
    </div>
  )
}
