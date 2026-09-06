import { Link } from 'react-router-dom'

function formatDate(value) {
  if (!value) return ''
  return new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(value))
}

export function ArticleView({ post, related = [], showBack = true }) {
  return (
    <article className="insight-article">
      <header className="insight-article__hero container">
        {showBack ? (
          <Link to="/blogs" className="link-line">
            Back to blogs
          </Link>
        ) : null}
        <p className="eyebrow">{post.category}</p>
        <h1 className="display">{post.title}</h1>
        <p className="body">{post.excerpt}</p>
        <p className="meta">
          {post.author} · {formatDate(post.publishedAt || post.updatedAt)}
        </p>
      </header>

      {post.featuredImage ? (
        <div className="insight-article__media container">
          <img src={post.featuredImage} alt={post.title} />
        </div>
      ) : null}

      <div
        className="insight-article__body container"
        dangerouslySetInnerHTML={{ __html: post.content || '' }}
      />

      {related.length ? (
        <aside className="insight-article__related container">
          <p className="eyebrow">Related reading</p>
          <ul>
            {related.map((item) => (
              <li key={item.id}>
                <Link to={`/blogs/${item.slug}`}>
                  <span className="meta">{item.category}</span>
                  <strong>{item.title}</strong>
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      ) : null}
    </article>
  )
}
