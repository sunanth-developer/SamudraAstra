export function StatusBadge({ status }) {
  return <span className={`cms-badge cms-badge--${status}`}>{status}</span>
}
