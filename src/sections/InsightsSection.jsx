import { useEffect, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { blogService } from '../services/blogService'
import { ImageReveal } from '../components/ImageReveal/ImageReveal'

function formatDate(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export function InsightsSection() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    blogService.getPublicPosts().then(setPosts).catch(() => setPosts([]))
  }, [])

  const featured = posts[0]
  const notes = posts.slice(1, 3)
  if (!featured) return null

  return (
    <section className="insights theme-light" id="insights">
      <div className="container">
        <div className="insights__head">
          <div>
            <p className="eyebrow">Insights</p>
            <h2 className="section-heading">Notes from the domain.</h2>
          </div>
          <Link to="/blogs" className="link-line">
            All notes <ArrowUpRight size={14} />
          </Link>
        </div>

        <div className="insights__grid">
          <Link to={`/blogs/${featured.slug}`} className="insight insight--lg" data-cursor="READ">
            <div className="insight__media">
              <ImageReveal src={featured.featuredImage} alt={featured.title} />
            </div>
            <div className="insight__meta">
              <span className="meta">{featured.category}</span>
              <span className="meta">{formatDate(featured.publishedAt)}</span>
            </div>
            <h3 className="card-heading">{featured.title}</h3>
            <span className="insight__arrow">
              <ArrowUpRight />
            </span>
          </Link>

          <div className="insights__stack">
            {notes.map((item) => (
              <Link
                to={`/blogs/${item.slug}`}
                className="insight insight--sm"
                key={item.id}
                data-cursor="READ"
              >
                <div className="insight__media">
                  <ImageReveal src={item.featuredImage} alt={item.title} />
                </div>
                <div className="insight__body">
                  <div className="insight__meta">
                    <span className="meta">{item.category}</span>
                    <span className="meta">{formatDate(item.publishedAt)}</span>
                  </div>
                  <h3 className="card-heading">{item.title}</h3>
                </div>
                <span className="insight__arrow">
                  <ArrowUpRight />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
