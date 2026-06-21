import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { ApiError, apiPost } from '../lib/api'
import { useTranslation } from '../lib/i18n'

// Shared contact/quote form (008) — the first form pattern. Posts to /api/contact
// via the envelope-aware apiPost (store-and-forward backend). Workbook-free, so the
// mobile bundle never pulls in workbook code; the desktop tree frames THIS form in
// a 005 Sheet (real inputs, not grid cells). Active language is sent as `locale`;
// `type` prefills from the referring CTA (?type=quote). A hidden honeypot (`website`)
// plus server validation guard against bots.
const TYPES = ['quote', 'corporate', 'general']

const field =
  'w-full rounded-sm border border-strong bg-surface-0 px-4 py-3 text-body text-ink-primary placeholder:text-ink-faint focus:border-accent-primary focus:outline-none'
const labelText = 'text-caption font-semibold text-ink-secondary'
const submitBtn =
  'inline-flex h-12 items-center justify-center rounded-sm bg-accent-primary px-6 font-semibold text-ink-on-dark hover:bg-accent-pressed active:bg-accent-pressed disabled:opacity-60'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export default function ContactForm() {
  const { t, lang } = useTranslation()
  const c = t.contact
  const [params] = useSearchParams()
  const hinted = params.get('type')
  const initialType = TYPES.includes(hinted) ? hinted : 'general'

  const [form, setForm] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    message: '',
    type: initialType,
    website: '', // honeypot
  })
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [errorMsg, setErrorMsg] = useState('')

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus('error')
      setErrorMsg(c.required)
      return
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setStatus('error')
      setErrorMsg(c.invalidEmail)
      return
    }
    setStatus('submitting')
    setErrorMsg('')
    try {
      await apiPost('/contact', {
        name: form.name.trim(),
        email: form.email.trim(),
        message: form.message.trim(),
        type: form.type,
        locale: lang,
        company: form.company.trim() || null,
        phone: form.phone.trim() || null,
        website: form.website,
      })
      setStatus('success')
    } catch (err) {
      setStatus('error')
      // ApiError carries a server message; either way show the friendly copy.
      setErrorMsg(err instanceof ApiError ? c.error : c.error)
    }
  }

  if (status === 'success') {
    return (
      <p
        data-testid="contact-success"
        role="status"
        className="rounded-sm border border-default bg-surface-0 p-5 text-body text-ink-primary"
      >
        {c.success}
      </p>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="flex flex-col gap-4">
      {/* Honeypot — hidden from humans (display:none), filled only by naive bots. */}
      <input
        type="text"
        name="website"
        value={form.website}
        onChange={set('website')}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        data-testid="honeypot"
        style={{ display: 'none' }}
      />

      <label className="flex flex-col gap-2">
        <span className={labelText}>{c.fields.name}</span>
        <input type="text" value={form.name} onChange={set('name')} className={field} required />
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelText}>{c.fields.email}</span>
        <input type="email" value={form.email} onChange={set('email')} className={field} required />
      </label>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2">
          <span className={labelText}>{c.fields.company}</span>
          <input type="text" value={form.company} onChange={set('company')} className={field} />
        </label>
        <label className="flex flex-col gap-2">
          <span className={labelText}>{c.fields.phone}</span>
          <input type="tel" value={form.phone} onChange={set('phone')} className={field} />
        </label>
      </div>

      <label className="flex flex-col gap-2">
        <span className={labelText}>{c.typeLabel}</span>
        <select value={form.type} onChange={set('type')} className={field}>
          {TYPES.map((key) => (
            <option key={key} value={key}>
              {c.types[key]}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-2">
        <span className={labelText}>{c.fields.message}</span>
        <textarea
          value={form.message}
          onChange={set('message')}
          rows={5}
          className={`${field} resize-y`}
          required
        />
      </label>

      {status === 'error' && (
        <p data-testid="contact-error" role="alert" className="text-body text-semantic-danger">
          {errorMsg}
        </p>
      )}

      <button type="submit" disabled={status === 'submitting'} className={submitBtn}>
        {status === 'submitting' ? c.submitting : c.submit}
      </button>
    </form>
  )
}
