import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogService } from '../../services/blogService'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'
import { PostTable } from '../components/PostTable'
import { ConfirmModal } from '../components/ConfirmModal'
import { Skeleton, ErrorState, EmptyState } from '../components/EmptyState'

function greeting() {
  const hour = new Date().getHours()
  if (hour < 12) return 'Good morning'
  if (hour < 18) return 'Good afternoon'
  return 'Good evening'
}

export function AdminDashboard() {
  const { user } = useAuth()
  const toast = useToast()
  const [stats, setStats] = useState(null)
  const [posts, setPosts] = useState([])
  const [error, setError] = useState('')
  const [pending, setPending] = useState(null)

  const load = async () => {
    setError('')
    try {
      const [nextStats, nextPosts] = await Promise.all([
        blogService.getStats(),
        blogService.getPosts(),
      ])
      setStats(nextStats)
      setPosts(nextPosts.slice(0, 6))
    } catch {
      setError('UNABLE TO LOAD ARTICLES')
    }
  }

  useEffect(() => {
    load()
  }, [])

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
          <h1>
            {greeting()}, {user?.name || 'Admin'}
          </h1>
          <p>Manage Samudra Astra's content, insights and publications.</p>
        </div>
        <div className="cms-page__actions">
          <Link className="cms-btn cms-btn--solid" to="/admin/blogs/new">
            + New blog post
          </Link>
          <Link className="cms-btn cms-btn--ghost" to="/admin/blogs">
            View all posts
          </Link>
          <a className="cms-btn cms-btn--ghost" href="/" target="_blank" rel="noreferrer">
            View website
          </a>
        </div>
      </header>

      {error ? (
        <ErrorState
          title={error}
          action={
            <button type="button" className="cms-btn cms-btn--ghost" onClick={load}>
              Try again
            </button>
          }
        />
      ) : !stats ? (
        <Skeleton rows={3} />
      ) : (
        <ul className="cms-stats">
          <li>
            <em>Total posts</em>
            <strong>{stats.total}</strong>
          </li>
          <li>
            <em>Published</em>
            <strong>{stats.published}</strong>
          </li>
          <li>
            <em>Drafts</em>
            <strong>{stats.drafts}</strong>
          </li>
          <li>
            <em>Scheduled</em>
            <strong>{stats.scheduled}</strong>
          </li>
        </ul>
      )}

      <section>
        <h2 className="cms-section-title">Recent posts</h2>
        {!stats ? null : posts.length ? (
          <PostTable posts={posts} onDelete={setPending} />
        ) : (
          <EmptyState
            title="No articles yet"
            body="Start building the Samudra Astra knowledge base."
            action={
              <Link className="cms-btn cms-btn--solid" to="/admin/blogs/new">
                Create first article
              </Link>
            }
          />
        )}
      </section>

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
