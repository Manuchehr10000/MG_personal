import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it, vi } from 'vitest'

// Mock the envelope-aware client; keep the real ApiError class.
vi.mock('./lib/api', async (importOriginal) => {
  const actual = await importOriginal()
  return { ...actual, apiPost: vi.fn() }
})

import { AppRoutes } from './App'
import { apiPost, ApiError } from './lib/api'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

function fillRequired() {
  fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Aziz' } })
  fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'aziz@example.com' } })
  fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'Need a model.' } })
}

beforeEach(() => {
  apiPost.mockReset()
})

describe('contact (008) — mobile (clean form)', () => {
  beforeEach(() => {
    window.innerWidth = 375
  })

  it('renders the form bilingually via the route', async () => {
    const { unmount } = renderAt('/en/contact')
    expect(await screen.findByRole('heading', { level: 1, name: 'Get in touch' })).toBeInTheDocument()
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
    unmount()

    renderAt('/ru/contact')
    expect(await screen.findByRole('heading', { level: 1, name: 'Связаться' })).toBeInTheDocument()
    expect(screen.getByLabelText('Имя')).toBeInTheDocument()
  })

  it('submits to /api/contact with the active locale and shows success', async () => {
    apiPost.mockResolvedValueOnce({ ok: true })
    renderAt('/en/contact')
    await screen.findByRole('heading', { level: 1 })
    fillRequired()
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }))

    await waitFor(() => expect(apiPost).toHaveBeenCalledTimes(1))
    const [path, body] = apiPost.mock.calls[0]
    expect(path).toBe('/contact')
    expect(body).toMatchObject({
      name: 'Aziz',
      email: 'aziz@example.com',
      message: 'Need a model.',
      type: 'general',
      locale: 'en',
      website: '',
    })
    expect(await screen.findByTestId('contact-success')).toBeInTheDocument()
  })

  it('prefills the type from a ?type= CTA hint', async () => {
    apiPost.mockResolvedValueOnce({ ok: true })
    renderAt('/en/contact?type=quote')
    await screen.findByRole('heading', { level: 1 })
    fillRequired()
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }))
    await waitFor(() => expect(apiPost).toHaveBeenCalled())
    expect(apiPost.mock.calls[0][1]).toMatchObject({ type: 'quote' })
  })

  it('shows an error state when the API rejects (and still no crash)', async () => {
    apiPost.mockRejectedValueOnce(new ApiError('server_error', 'boom', 500))
    renderAt('/en/contact')
    await screen.findByRole('heading', { level: 1 })
    fillRequired()
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }))
    expect(await screen.findByTestId('contact-error')).toBeInTheDocument()
  })

  it('validates client-side without calling the API (bad email)', async () => {
    renderAt('/en/contact')
    await screen.findByRole('heading', { level: 1 })
    fireEvent.change(screen.getByLabelText('Name'), { target: { value: 'Aziz' } })
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'nope' } })
    fireEvent.change(screen.getByLabelText('Message'), { target: { value: 'hi' } })
    fireEvent.click(screen.getByRole('button', { name: 'Send message' }))
    expect(await screen.findByTestId('contact-error')).toBeInTheDocument()
    expect(apiPost).not.toHaveBeenCalled()
  })

  it('keeps a hidden honeypot field and no workbook chrome (desktop-only)', async () => {
    const { container } = renderAt('/en/contact')
    await screen.findByRole('heading', { level: 1 })
    expect(screen.getByTestId('honeypot')).not.toBeVisible()
    expect(container.querySelector('.font-mono')).toBeNull()
    expect(container.querySelector('[data-workbook]')).toBeNull()
    expect(document.querySelector('#workbook-mono-font')).toBeNull()
  })
})

describe('contact (008) — desktop (form framed in a 005 Sheet)', () => {
  beforeEach(() => {
    window.innerWidth = 1280
  })

  it('frames the same form inside a workbook Sheet (real inputs, not grid cells)', async () => {
    const { container } = renderAt('/en/contact')
    expect(await screen.findByTestId('desktop-contact')).toBeInTheDocument()
    // The Sheet chrome is present (mono) but the form inputs are real fields.
    expect(container.querySelector('[data-workbook="sheet"]')).not.toBeNull()
    expect(container.querySelector('.font-mono')).not.toBeNull()
    expect(screen.getByLabelText('Name')).toBeInTheDocument()
    expect(screen.getByLabelText('Message')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Send message' })).toBeInTheDocument()
    // No data-grid: the form is not rendered as workbook cells.
    expect(container.querySelector('[data-workbook="data-grid"]')).toBeNull()
  })

  it('injects JetBrains Mono on the Sheet and tears it down on unmount', async () => {
    const { unmount } = renderAt('/en/contact')
    await screen.findByTestId('desktop-contact')
    expect(document.querySelector('#workbook-mono-font')).not.toBeNull()
    unmount()
    expect(document.querySelector('#workbook-mono-font')).toBeNull()
  })
})

describe('contact (008) — toggle (no 002 regression)', () => {
  it('the language toggle swaps /en/contact <-> /ru/contact (mobile)', async () => {
    window.innerWidth = 375
    renderAt('/en/contact')
    const toggle = await screen.findByRole('link', { name: /switch to russian/i })
    expect(toggle).toHaveAttribute('href', '/ru/contact')
  })
})
