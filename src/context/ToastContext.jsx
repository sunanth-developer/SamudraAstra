import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { uid } from '../services/storage'

const ToastContext = createContext(null)

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismiss = useCallback((id) => {
    setToasts((list) => list.filter((item) => item.id !== id))
  }, [])

  const push = useCallback(
    (type, message) => {
      const id = uid('toast')
      setToasts((list) => [...list, { id, type, message }])
      window.setTimeout(() => dismiss(id), 3600)
    },
    [dismiss]
  )

  const value = useMemo(
    () => ({
      toasts,
      success: (message) => push('success', message),
      error: (message) => push('error', message),
      warning: (message) => push('warning', message),
      info: (message) => push('info', message),
      dismiss,
    }),
    [toasts, push, dismiss]
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="cms-toasts" aria-live="polite">
        {toasts.map((toast) => (
          <button
            key={toast.id}
            type="button"
            className={`cms-toast cms-toast--${toast.type}`}
            onClick={() => dismiss(toast.id)}
          >
            {toast.message}
          </button>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export function useToast() {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}
