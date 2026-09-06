import { useEffect, useRef, useState } from 'react'
import { mediaService } from '../../services/mediaService'
import { useToast } from '../../context/ToastContext'
import { ConfirmModal } from '../components/ConfirmModal'
import { EmptyState, Skeleton } from '../components/EmptyState'

export function AdminMedia() {
  const toast = useToast()
  const inputRef = useRef(null)
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [pending, setPending] = useState(null)

  const load = async () => {
    setLoading(true)
    setItems(await mediaService.list())
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  const upload = async (file) => {
    if (!file) return
    await mediaService.uploadImage(file)
    toast.success('Image uploaded')
    load()
  }

  const remove = async () => {
    if (!pending) return
    await mediaService.deleteImage(pending.id)
    toast.success('Image deleted')
    setPending(null)
    load()
  }

  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <h1>Media</h1>
          <p>Local prototype library. Object storage will replace this later.</p>
        </div>
        <button className="cms-btn cms-btn--solid" type="button" onClick={() => inputRef.current?.click()}>
          Upload image
        </button>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          hidden
          onChange={(e) => upload(e.target.files?.[0])}
        />
      </header>

      {loading ? (
        <Skeleton rows={4} />
      ) : items.length ? (
        <ul className="cms-media-grid">
          {items.map((item) => (
            <li key={item.id} className="cms-media-card">
              <img src={item.url} alt={item.name} />
              <div>
                <strong>{item.name}</strong>
                <p>
                  {item.width && item.height ? `${item.width}×${item.height}` : 'Dimensions unavailable'}
                </p>
                <p>{new Date(item.createdAt).toLocaleDateString('en-GB')}</p>
                <div className="cms-row-actions">
                  <button
                    type="button"
                    onClick={async () => {
                      await navigator.clipboard.writeText(item.url)
                      toast.info('Image URL copied')
                    }}
                  >
                    Select / use
                  </button>
                  <button type="button" onClick={() => setPending(item)}>
                    Delete
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState title="No media yet" body="Upload an image to start the library." />
      )}

      <ConfirmModal
        open={Boolean(pending)}
        title="Delete image?"
        body="This removes the file from the local media store."
        confirmLabel="Delete"
        onCancel={() => setPending(null)}
        onConfirm={remove}
      />
    </div>
  )
}
