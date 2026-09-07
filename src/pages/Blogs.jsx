import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Seo } from '../components/Seo'
import { ImageReveal } from '../components/ImageReveal/ImageReveal'
import { blogService } from '../services/blogService'
import { CATEGORIES } from '../data/mockCategories'

function formatDate(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export function Blogs() {
  const [posts, setPosts] = useState([])
  const [category, setCategory] = useState('All')

  useEffect(() => {
    blogService.getPublicPosts().then(setPosts).catch(() => setPosts([]))
    const refresh = () => blogService.getPublicPosts().then(setPosts)
    window.addEventListener('sa:posts-changed', refresh)
    return () => window.removeEventListener('sa:posts-changed', refresh)
  }, [])

  const visible = useMemo(
    () =>
      category === 'All'
        ? posts
        : posts.filter((post) => post.category === category),
    [posts, category]
  )

  const featured = visible[0]
  const rest = visible.slice(1)

  return (
    <article className="page">
      <Seo
        title="Blogs"
        description="Research, technology and maritime writing from Samudra Astra."
      />
      <header className="page__hero container" data-reveal>
        <p className="eyebrow">Journal</p>
        <h1 className="section-heading">From the depths.</h1>
        <p className="body">
          Notes on aquatic defence technology — sensing, autonomy, maritime
          security and the work of building capability beneath the surface.
        </p>
      </header>

      <div className="blogs container">
        <div className="blogs__filters" role="tablist" aria-label="Filter by category">
          {['All', ...CATEGORIES].map((item) => (
            <button
              key={item}
              type="button"
              role="tab"
              aria-selected={category === item}
              className={`blogs__filter ${category === item ? 'is-active' : ''}`}
              onClick={() => setCategory(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {!visible.length ? (
          <p className="body blogs__empty">
            {posts.length
              ? 'No published notes in this category yet.'
              : 'No published notes yet.'}
          </p>
        ) : (
          <>
            {featured ? (
              <Link
                to={`/blogs/${featured.slug}`}
                className="blogs__featured"
                data-cursor="READ"
              >
                <div className="blogs__featured-media">
                  <ImageReveal src={featured.featuredImage} alt={featured.title} />
                </div>
                <div className="blogs__featured-copy">
                  <p className="meta">
                    {featured.category} · {formatDate(featured.publishedAt || featured.updatedAt)}
                  </p>
                  <h2 className="card-heading">{featured.title}</h2>
                  <p className="body">{featured.excerpt}</p>
                </div>
              </Link>
            ) : null}

            {rest.length ? (
              <div className="blogs__grid">
                {rest.map((item) => (
                  <Link
                    to={`/blogs/${item.slug}`}
                    className="blogs__card"
                    key={item.id}
                    data-cursor="READ"
                  >
                    <div className="blogs__card-media">
                      <ImageReveal src={item.featuredImage} alt={item.title} />
                    </div>
                    <p className="meta">
                      {item.category} · {formatDate(item.publishedAt || item.updatedAt)}
                    </p>
                    <h3 className="card-heading">{item.title}</h3>
                    <p className="body">{item.excerpt}</p>
                  </Link>
                ))}
              </div>
            ) : null}
          </>
        )}
      </div>
    </article>
  )
}
