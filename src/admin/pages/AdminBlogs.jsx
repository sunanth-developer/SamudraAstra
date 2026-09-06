import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CATEGORIES } from '../../data/mockCategories'
import { blogService } from '../../services/blogService'
import { useToast } from '../../context/ToastContext'
import { PostTable } from '../components/PostTable'
import { ConfirmModal } from '../components/ConfirmModal'
import { EmptyState, ErrorState, Skeleton } from '../components/EmptyState'

const STATUSES = ['all', 'published', 'draft', 'scheduled']

export function AdminBlogs() {
  const toast = useToast()
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState('all')
  const [category, setCategory] = useState('all')
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pending, setPending] = useState(null)

  const load = async () => {
    setLoading(true)
    setError('')
    try {
      setPosts(await blogService.filterPosts({ query, status, category }))
    } catch {
      setError('UNABLE TO LOAD ARTICLES')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const t = window.setTimeout(load, 160)
    return () => window.clearTimeout(t)
  }, [query, status, category])

  const remove = async () => {
    if (!pending) return
    await blogService.deletePost(pending.id)
    toast.success('Article deleted')
    setPending(null)
    load()
  }

  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <h1>Blogs</h1>
          <p>Manage research, technology and insights from Samudra Astra.</p>
        </div>
        <Link className="cms-btn cms-btn--solid" to="/admin/blogs/new">
          + New post
        </Link>
      </header>

      <div className="cms-toolbar">
        <input
          className="cms-search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search posts..."
        />
        <div className="cms-pills">
          {STATUSES.map((item) => (
            <button
              key={item}
              type="button"
              className={status === item ? 'is-on' : ''}
              onClick={() => setStatus(item)}
            >
              {item}
            </button>
          ))}
        </div>
        <div className="cms-pills">
          <button
            type="button"
            className={category === 'all' ? 'is-on' : ''}
            onClick={() => setCategory('all')}
          >
            All
          </button>
          {CATEGORIES.map((item) => (
            <button
              key={item}
              type="button"
              className={category === item ? 'is-on' : ''}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {error ? (
        <ErrorState
          title={error}
          action={
            <button type="button" className="cms-btn cms-btn--ghost" onClick={load}>
              Try again
            </button>
          }
        />
      ) : loading ? (
        <Skeleton rows={5} />
      ) : posts.length ? (
        <PostTable posts={posts} onDelete={setPending} />
      ) : (
        <EmptyState
          title="No articles match your search"
          body="Try another query, status or category."
          action={
            <Link className="cms-btn cms-btn--solid" to="/admin/blogs/new">
              Create first article
            </Link>
          }
        />
      )}

      <ConfirmModal
        open={Boolean(pending)}
        title="Delete article?"
        body="This will remove the article from the current content store."
        confirmLabel="Delete"
        onCancel={() => setPending(null)}
        onConfirm={remove}
      />
    </div>
  )
}
