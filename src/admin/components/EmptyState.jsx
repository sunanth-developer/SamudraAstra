export function EmptyState({ title, body, action }) {
  return (
    <div className="cms-empty">
      <h3>{title}</h3>
      {body ? <p>{body}</p> : null}
      {action}
    </div>
  )
}

export function ErrorState({ title, body, action }) {
  return (
    <div className="cms-empty cms-empty--error">
      <h3>{title}</h3>
      {body ? <p>{body}</p> : null}
      {action}
    </div>
  )
}

export function Skeleton({ rows = 4 }) {
  return (
    <div className="cms-skel" aria-hidden="true">
      {Array.from({ length: rows }).map((_, i) => (
        <span key={i} />
      ))}
    </div>
  )
}
