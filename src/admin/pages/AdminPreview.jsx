import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { blogService } from '../../services/blogService'
import { ArticleView } from '../../components/ArticleView'
import { ErrorState, Skeleton } from '../components/EmptyState'

export function AdminPreview() {
  const { id } = useParams()
  const [post, setPost] = useState(null)
  const [related, setRelated] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    let alive = true
    blogService.getPost(id).then(async (item) => {
      if (!alive) return
      if (!item) {
        setError('ARTICLE COULD NOT BE LOADED')
        return
      }
      setPost(item)
      setRelated(await blogService.getRelatedPosts(item))
    })
    return () => {
      alive = false
    }
  }, [id])

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

  if (!post) return <Skeleton rows={6} />

  return (
    <div className="cms-preview">
      <div className="cms-preview__bar">
        <p>Preview mode</p>
        <Link to={`/admin/blogs/edit/${post.id}`}>← Back to editor</Link>
      </div>
      <ArticleView post={post} related={related} showBack={false} />
    </div>
  )
}
