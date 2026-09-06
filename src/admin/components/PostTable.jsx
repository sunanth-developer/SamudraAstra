import { Link } from 'react-router-dom'
import { StatusBadge } from './StatusBadge'

function formatDate(value) {
  if (!value) return '—'
  return new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(value))
}

export function PostTable({ posts, onDelete }) {
  return (
    <div className="cms-table-wrap">
      <table className="cms-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Status</th>
            <th>Author</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id}>
              <td>
                {post.featuredImage ? (
                  <img className="cms-thumb" src={post.featuredImage} alt="" />
                ) : (
                  <span className="cms-thumb cms-thumb--empty" />
                )}
              </td>
              <td>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </td>
              <td>{post.category}</td>
              <td>
                <StatusBadge status={post.status} />
              </td>
              <td>{post.author}</td>
              <td>{formatDate(post.publishedAt || post.updatedAt)}</td>
              <td>
                <div className="cms-row-actions">
                  <Link to={`/admin/blogs/edit/${post.id}`}>Edit</Link>
                  <Link to={`/admin/blogs/preview/${post.id}`}>Preview</Link>
                  <button type="button" onClick={() => onDelete(post)}>
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
