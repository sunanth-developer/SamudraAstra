import { useEffect, useRef, useState } from 'react'
import { Link, useBlocker, useNavigate, useParams } from 'react-router-dom'
import { CATEGORIES } from '../../data/mockCategories'
import { blogService } from '../../services/blogService'
import { settingsService } from '../../services/settingsService'
import { slugify } from '../../services/storage'
import { useToast } from '../../context/ToastContext'
import { ContentEditor } from '../components/ContentEditor'
import { FeaturedImageField } from '../components/FeaturedImageField'
import { TagInput } from '../components/TagInput'
import { ConfirmModal } from '../components/ConfirmModal'
import { ErrorState, Skeleton } from '../components/EmptyState'

const emptyPost = {
  title: '',
  slug: '',
  excerpt: '',
  content: '',
  featuredImage: '',
  category: 'Technology',
  tags: [],
  author: 'Samudra Astra',
  status: 'draft',
  publishedAt: '',
  seoTitle: '',
  seoDescription: '',
}

function toForm(post) {
  return {
    title: post.title || '',
    slug: post.slug || '',
    excerpt: post.excerpt || '',
    content: post.content || '',
    featuredImage: post.featuredImage || '',
    category: post.category || 'Technology',
    tags: post.tags || [],
    author: post.author || 'Samudra Astra',
    status: post.status || 'draft',
    publishedAt: post.publishedAt ? post.publishedAt.slice(0, 16) : '',
    seoTitle: post.seoTitle || '',
    seoDescription: post.seoDescription || '',
  }
}

function payloadFromForm(form) {
  return {
    ...form,
    publishedAt: form.publishedAt ? new Date(form.publishedAt).toISOString() : null,
  }
}

export function AdminEditor() {
  const { id } = useParams()
  const isNew = !id
  const navigate = useNavigate()
  const toast = useToast()
  const [form, setForm] = useState(emptyPost)
  const [postId, setPostId] = useState(id || null)
  const [loading, setLoading] = useState(!isNew)
  const [error, setError] = useState('')
  const [dirty, setDirty] = useState(false)
  const [saveState, setSaveState] = useState('')
  const [slugLocked, setSlugLocked] = useState(Boolean(id))
  const [leaveOpen, setLeaveOpen] = useState(false)
  const snapshot = useRef('')

  const blocker = useBlocker(dirty)

  useEffect(() => {
    settingsService.get().then((settings) => {
      setForm((current) =>
        current.title
          ? current
          : {
              ...current,
              author: settings.defaultAuthor,
              category: settings.defaultCategory,
              status: settings.defaultStatus,
            }
      )
    })
  }, [])

  useEffect(() => {
    if (!id) return undefined
    let alive = true
    setLoading(true)
    blogService
      .getPost(id)
      .then((post) => {
        if (!alive) return
        if (!post) {
          setError('ARTICLE COULD NOT BE LOADED')
          return
        }
        const next = toForm(post)
        setForm(next)
        setPostId(post.id)
        snapshot.current = JSON.stringify(next)
        setDirty(false)
      })
      .finally(() => alive && setLoading(false))
    return () => {
      alive = false
    }
  }, [id])

  useEffect(() => {
    if (!dirty) return undefined
    const onLeave = (e) => {
      e.preventDefault()
      e.returnValue = ''
    }
    window.addEventListener('beforeunload', onLeave)
    return () => window.removeEventListener('beforeunload', onLeave)
  }, [dirty])

  useEffect(() => {
    if (blocker.state === 'blocked') setLeaveOpen(true)
  }, [blocker.state])

  const setField = (key, value) => {
    setForm((current) => {
      const next = { ...current, [key]: value }
      if (key === 'title' && !slugLocked) next.slug = slugify(value)
      setDirty(JSON.stringify(next) !== snapshot.current)
      return next
    })
  }

  const persist = async (data) => {
    const payload = payloadFromForm(data)
    const saved = postId
      ? await blogService.updatePost(postId, payload)
      : await blogService.createPost(payload)
    if (!saved) throw new Error('save failed')
    if (!postId) {
      setPostId(saved.id)
      navigate(`/admin/blogs/edit/${saved.id}`, { replace: true })
    }
    const next = toForm(saved)
    setForm(next)
    snapshot.current = JSON.stringify(next)
    setDirty(false)
    return saved
  }

  const persistRef = useRef(persist)
  persistRef.current = persist
  const formRef = useRef(form)
  formRef.current = form

  useEffect(() => {
    if (!dirty || form.status === 'published') return undefined
    const timer = window.setInterval(async () => {
      setSaveState('Saving…')
      try {
        const saved = await persistRef.current({ ...formRef.current, status: 'draft' })
        if (saved) {
          setSaveState('Saved just now')
          toast.info('Draft autosaved')
        }
      } catch {
        setSaveState('Unable to save')
      }
    }, 30000)
    return () => window.clearInterval(timer)
  }, [dirty, form.status, toast])

  const saveDraft = async () => {
    setSaveState('Saving…')
    try {
      await persist({ ...form, status: 'draft' })
      setSaveState('Saved')
      toast.success('Blog saved successfully.')
    } catch {
      setSaveState('Unable to save')
      toast.error('Unable to save changes.')
    }
  }

  const publish = async () => {
    if (!form.title.trim()) {
      toast.error('Add a title before publishing.')
      return
    }
    setSaveState('Publishing…')
    try {
      const saved = await persist({
        ...form,
        status: 'published',
        publishedAt: form.publishedAt || new Date().toISOString().slice(0, 16),
      })
      setSaveState('Published')
      toast.success('Article published.')
      navigate(`/admin/blogs/preview/${saved.id}`)
    } catch {
      toast.error('Unable to save changes.')
    }
  }

  const preview = async () => {
    try {
      const saved = await persist(form)
      navigate(`/admin/blogs/preview/${saved.id}`)
    } catch {
      toast.error('Unable to save changes.')
    }
  }

  const excerptCount = form.excerpt.length

  if (loading) return <Skeleton rows={8} />
  if (error) {
    return (
      <ErrorState
        title={error}
        action={
          <Link className="cms-btn cms-btn--ghost" to="/admin/blogs">
            Back to blogs
          </Link>
        }
      />
    )
  }

  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <p className="cms-kicker">Article editor</p>
          <h1>{isNew ? 'New post' : 'Edit post'}</h1>
        </div>
        <p className="cms-save-state">{saveState}</p>
      </header>

      <div className="cms-editor-layout">
        <div className="cms-editor-main">
          <label className="cms-title-field">
            Title
            <input
              value={form.title}
              onChange={(e) => setField('title', e.target.value)}
              placeholder="Enter article title..."
            />
            <span>{form.title.length} characters</span>
          </label>

          <label>
            Slug
            <input
              value={form.slug}
              onChange={(e) => {
                setSlugLocked(true)
                setField('slug', slugify(e.target.value))
              }}
            />
          </label>

          <label>
            Excerpt
            <textarea
              rows={3}
              value={form.excerpt}
              onChange={(e) => setField('excerpt', e.target.value)}
              placeholder="Write a short summary of the article..."
            />
            <span className={excerptCount > 200 ? 'is-warn' : ''}>
              {excerptCount} / 200 recommended
            </span>
          </label>

          <div>
            <p className="cms-label">Content</p>
            <ContentEditor value={form.content} onChange={(value) => setField('content', value)} />
          </div>
        </div>

        <aside className="cms-publish">
          <h2>Publish</h2>
          <label>
            Status
            <select value={form.status} onChange={(e) => setField('status', e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </label>
          <label>
            Visibility
            <input value="Public" readOnly />
          </label>
          <label>
            Publish date
            <input
              type="datetime-local"
              value={form.publishedAt}
              onChange={(e) => setField('publishedAt', e.target.value)}
            />
          </label>
          <label>
            Author
            <input value={form.author} onChange={(e) => setField('author', e.target.value)} />
          </label>

          <h3>Featured image</h3>
          <FeaturedImageField
            value={form.featuredImage}
            onChange={(value) => setField('featuredImage', value)}
          />

          <label>
            Category
            <select value={form.category} onChange={(e) => setField('category', e.target.value)}>
              {CATEGORIES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>

          <div>
            <p className="cms-label">Tags</p>
            <TagInput value={form.tags} onChange={(value) => setField('tags', value)} />
          </div>

          <h3>SEO</h3>
          <label>
            SEO title
            <input value={form.seoTitle} onChange={(e) => setField('seoTitle', e.target.value)} />
          </label>
          <label>
            SEO description
            <textarea
              rows={3}
              value={form.seoDescription}
              onChange={(e) => setField('seoDescription', e.target.value)}
            />
          </label>

          <div className="cms-publish__actions">
            <button type="button" className="cms-btn cms-btn--ghost" onClick={saveDraft}>
              Save draft
            </button>
            <button type="button" className="cms-btn cms-btn--ghost" onClick={preview}>
              Preview
            </button>
            <button type="button" className="cms-btn cms-btn--solid" onClick={publish}>
              Publish
            </button>
            {!isNew ? (
              <button type="button" className="cms-btn cms-btn--ghost" onClick={saveDraft}>
                Save changes
              </button>
            ) : null}
          </div>
        </aside>
      </div>

      <ConfirmModal
        open={leaveOpen}
        title="Unsaved changes"
        body="Your latest changes haven't been saved."
        confirmLabel="Leave"
        cancelLabel="Stay"
        onCancel={() => {
          setLeaveOpen(false)
          blocker.reset?.()
        }}
        onConfirm={() => {
          setLeaveOpen(false)
          setDirty(false)
          blocker.proceed?.()
        }}
      />
    </div>
  )
}
