export function ConfirmModal({
  open,
  title,
  body,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  tone = 'danger',
  onConfirm,
  onCancel,
}) {
  if (!open) return null

  return (
    <div className="cms-modal" role="dialog" aria-modal="true" aria-labelledby="cms-modal-title">
      <button className="cms-modal__scrim" type="button" aria-label="Close" onClick={onCancel} />
      <div className="cms-modal__panel">
        <h2 id="cms-modal-title">{title}</h2>
        <p>{body}</p>
        <div className="cms-modal__actions">
          <button type="button" className="cms-btn cms-btn--ghost" onClick={onCancel}>
            {cancelLabel}
          </button>
          <button
            type="button"
            className={`cms-btn ${tone === 'danger' ? 'cms-btn--danger' : 'cms-btn--solid'}`}
            onClick={onConfirm}
          >
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
