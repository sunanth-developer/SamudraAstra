import { useEffect, useState } from 'react'
import { CATEGORIES } from '../../data/mockCategories'
import { settingsService } from '../../services/settingsService'
import { useAuth } from '../../context/AuthContext'
import { useToast } from '../../context/ToastContext'

export function AdminSettings() {
  const { user } = useAuth()
  const toast = useToast()
  const [form, setForm] = useState(null)
  const [note, setNote] = useState('')

  useEffect(() => {
    settingsService.get().then(setForm)
  }, [])

  if (!form) return null

  const save = async (e) => {
    e.preventDefault()
    await settingsService.save(form)
    toast.success('Settings saved')
  }

  return (
    <div className="cms-page">
      <header className="cms-page__head">
        <div>
          <h1>Settings</h1>
          <p>Prototype preferences for publishing defaults.</p>
        </div>
      </header>

      <form className="cms-settings" onSubmit={save}>
        <section>
          <h2>Profile</h2>
          <label>
            Name
            <input value={user?.name || ''} readOnly />
          </label>
          <label>
            Email
            <input value={user?.email || ''} readOnly />
          </label>
          <label>
            Role
            <input value={user?.role || ''} readOnly />
          </label>
        </section>

        <section>
          <h2>Password</h2>
          <button
            type="button"
            className="cms-btn cms-btn--ghost"
            onClick={() =>
              setNote('Password management will be handled by the backend authentication system.')
            }
          >
            Change password
          </button>
          {note ? <p className="cms-hint">{note}</p> : null}
        </section>

        <section>
          <h2>Site settings</h2>
          <label>
            Default author
            <input
              value={form.defaultAuthor}
              onChange={(e) => setForm({ ...form, defaultAuthor: e.target.value })}
            />
          </label>
          <label>
            Default category
            <select
              value={form.defaultCategory}
              onChange={(e) => setForm({ ...form, defaultCategory: e.target.value })}
            >
              {CATEGORIES.map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Default status
            <select
              value={form.defaultStatus}
              onChange={(e) => setForm({ ...form, defaultStatus: e.target.value })}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
              <option value="scheduled">Scheduled</option>
            </select>
          </label>
          <button className="cms-btn cms-btn--solid" type="submit">
            Save settings
          </button>
        </section>
      </form>
    </div>
  )
}
