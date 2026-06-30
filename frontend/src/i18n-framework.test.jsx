import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { beforeEach, describe, expect, it } from 'vitest'

import { AppRoutes } from './App'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

beforeEach(() => {
  // jsdom defaults to 1024px (== the desktop breakpoint). Force the mobile tree;
  // the language framework is shared below the fork, so this exercises it fully.
  window.innerWidth = 375
})

describe('language framework (002)', () => {
  it('renders a page in both EN and RU via the route', async () => {
    // 003 rev.4: routes render labeled placeholder screens (the h1 is the nav label).
    const { unmount } = renderAt('/en')
    expect(await screen.findByRole('heading', { level: 1, name: 'Home' })).toBeInTheDocument()
    unmount()
    renderAt('/ru')
    expect(await screen.findByRole('heading', { level: 1, name: 'Главная' })).toBeInTheDocument()
  })

  it('the toggle is a real route swap to the same page in the other language', async () => {
    renderAt('/en/consulting')
    const toggle = await screen.findByRole('link', { name: /switch to russian/i })
    expect(toggle).toHaveAttribute('href', '/ru/consulting')
  })

  it('greys/disables the toggle when no other-language version exists (no dead route)', async () => {
    // courses is RU-only (PRODUCT.md). At /ru/courses there is no EN version.
    renderAt('/ru/courses')
    await waitFor(() => {
      // The "switch to English" affordance is no longer a link...
      expect(screen.queryByRole('link', { name: /английск/i })).not.toBeInTheDocument()
    })
    const disabled = screen.getByText('EN')
    expect(disabled).toHaveAttribute('aria-disabled', 'true')
  })

  it('falls back to the available language for a single-language route', async () => {
    // /en/courses has no EN version -> render the RU body + a fallback notice.
    renderAt('/en/courses')
    expect(await screen.findByTestId('fallback-notice')).toBeInTheDocument()
    expect(screen.getByRole('heading')).toHaveTextContent('Курсы')
  })

  it('keeps the default-language redirect (no 001 regression)', async () => {
    renderAt('/') // DEFAULT_LANG is ru
    expect(await screen.findByRole('heading', { level: 1, name: 'Главная' })).toBeInTheDocument()
  })

  it('redirects an unknown language segment to the default language', async () => {
    renderAt('/xx')
    expect(await screen.findByRole('heading', { level: 1, name: 'Главная' })).toBeInTheDocument()
  })
})
