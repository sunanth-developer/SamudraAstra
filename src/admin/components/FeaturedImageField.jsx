import { useRef, useState } from 'react'
import { mediaService } from '../../services/mediaService'
import { useToast } from '../../context/ToastContext'

export function FeaturedImageField({ value, onChange }) {
  const inputRef = useRef(null)
  const [busy, setBusy] = useState(false)
  const toast = useToast()

  const onFile = async (file) => {
    if (!file) return
    setBusy(true)
    try {
      const item = await mediaService.uploadImage(file)
      onChange(item.url)
      toast.success('Image attached')
    } catch {
      toast.error('Unable to attach image')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="cms-image-field">
      {value ? (
        <div className="cms-image-field__preview">
          <img src={value} alt="Featured" />
        </div>
      ) : (
        <button
          type="button"
          className="cms-image-field__empty"
          onClick={() => inputRef.current?.click()}
        >
          {busy ? 'Uploading…' : 'Select image'}
        </button>
      )}
      <div className="cms-image-field__row">
        <button type="button" className="cms-btn cms-btn--ghost" onClick={() => inputRef.current?.click()}>
          {value ? 'Replace' : 'Select image'}
        </button>
        {value ? (
          <button type="button" className="cms-btn cms-btn--ghost" onClick={() => onChange('')}>
            Remove
          </button>
        ) : null}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        hidden
        onChange={(e) => onFile(e.target.files?.[0])}
      />
    </div>
  )
}
