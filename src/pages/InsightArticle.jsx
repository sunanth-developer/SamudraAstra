import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { ArticleView } from '../components/ArticleView'
import { blogService, isPostPublic } from '../services/blogService'

export function InsightArticle() {
  const { slug } = useParams()
  const [post, setPost] = useState(null)
  const [related, setRelated] = useState([])
  const [missing, setMissing] = useState(false)

  useEffect(() => {
    let alive = true
    blogService.getPostBySlug(slug).then(async (item) => {
      if (!alive) return
      if (!item || !isPostPublic(item)) {
        setMissing(true)
        return
      }
      setPost(item)
      setRelated(await blogService.getRelatedPosts(item).catch(() => []))
    }).catch(() => {
      if (alive) setMissing(true)
    })
    return () => {
      alive = false
    }
  }, [slug])

  if (missing) {
    return (
      <article className="page">
        <header className="page__hero container">
          <p className="eyebrow">Blogs</p>
          <h1 className="display">Article not found.</h1>
          <p className="body">This note is unpublished, scheduled, or no longer in the content store.</p>
          <Link to="/blogs" className="link-line">
            Back to blogs
          </Link>
        </header>
      </article>
    )
  }

  if (!post) {
    return (
      <article className="page">
        <header className="page__hero container">
          <p className="eyebrow">Blogs</p>
          <h1 className="display">Loading.</h1>
        </header>
      </article>
    )
  }

  return (
    <>
      <Seo
        title={post.seoTitle || post.title}
        description={post.seoDescription || post.excerpt}
        image={post.featuredImage}
      />
      <ArticleView post={post} related={related} />
    </>
  )
}
