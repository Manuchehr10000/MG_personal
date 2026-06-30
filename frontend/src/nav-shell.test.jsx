import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, it } from 'vitest'

import { AppRoutes } from './App'

function renderAt(path) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <AppRoutes />
    </MemoryRouter>,
  )
}

const setWidth = (w) => {
  window.innerWidth = w
}

// A destination may surface as both a nav control and a footer link; assert that at
// least one link with the given accessible name resolves to the expected href.
function expectLinkTo(name, href) {
  expect(
    screen.getAllByRole('link', { name }).some((a) => a.getAttribute('href') === href),
  ).toBe(true)
}

describe('shell (003 rev.4) — mobile (route-based native screens)', () => {
  it('renders four primary tabs (language-aware) + a More entry', async () => {
    setWidth(375)
    renderAt('/en')
    expect(await screen.findByRole('button', { name: 'More' })).toBeInTheDocument()
    expectLinkTo('Home', '/en')
    expectLinkTo('Courses', '/en/courses')
    expectLinkTo('Consulting', '/en/consulting')
    expectLinkTo('Contact', '/en/contact')
  })

  it('More opens a flat sheet with the overflow destination (About); Pricing folded away', async () => {
    setWidth(375)
    renderAt('/en')
    expect(screen.queryByRole('menuitem', { name: 'About' })).not.toBeInTheDocument()
    fireEvent.click(await screen.findByRole('button', { name: 'More' }))
    expect(await screen.findByRole('menuitem', { name: 'About' })).toHaveAttribute(
      'href',
      '/en/about',
    )
    // Pricing folds into Courses (003 rev.4) — no longer a destination.
    expect(screen.queryByRole('menuitem', { name: 'Pricing' })).not.toBeInTheDocument()
  })

  it('nav links carry the active language', async () => {
    setWidth(375)
    renderAt('/ru')
    await screen.findByRole('button', { name: 'Ещё' })
    expectLinkTo('Курсы', '/ru/courses')
  })

  it('each shell route renders a labeled placeholder screen (content lands later)', async () => {
    setWidth(375)
    for (const [path, heading] of [
      ['/en', 'Home'],
      ['/en/consulting', 'Consulting'],
      ['/en/about', 'About'],
      ['/en/contact', 'Contact'],
    ]) {
      const { unmount } = renderAt(path)
      expect(await screen.findByRole('heading', { level: 1, name: heading })).toBeInTheDocument()
      unmount()
    }
  })

  it('redirects /:lang/pricing into the courses screen (pricing folds into courses)', async () => {
    setWidth(375)
    renderAt('/en/pricing')
    // courses is RU-only (PRODUCT.md) -> falls back to the RU screen with a notice.
    expect(await screen.findByRole('heading', { level: 1, name: 'Курсы' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Courses & pricing' })).not.toBeInTheDocument()
  })

  it('renders the shared footer', async () => {
    setWidth(375)
    renderAt('/en')
    await screen.findByRole('button', { name: 'More' })
    expect(screen.getByText(/All rights reserved\./)).toBeInTheDocument()
  })
})

describe('shell (003 rev.4) — desktop (single-scroll workbook)', () => {
  it('mounts the workbook chrome + a scroll-spy tab per section + the toggle + footer', async () => {
    setWidth(1280)
    const { container } = renderAt('/en')
    // Wait for the lazy desktop tree (the toggle lives in the command bar).
    expect(await screen.findByRole('link', { name: /switch to russian/i })).toBeInTheDocument()
    // Workbook chrome — not the old top-nav.
    expect(container.querySelector('[data-workbook="title-bar"]')).not.toBeNull()
    expect(container.querySelector('[data-workbook="status-bar"]')).not.toBeNull()
    expect(container.querySelector('[data-workbook="sheet-tabs"]')).not.toBeNull()
    // One scroll-spy tab per stacked section.
    for (const label of ['Overview', 'Consulting', 'About', 'Courses', 'Pipeline', 'Contact']) {
      expect(screen.getByRole('button', { name: label })).toBeInTheDocument()
    }
    // Shared footer present on desktop too.
    expect(screen.getByText(/All rights reserved\./)).toBeInTheDocument()
  })

  it('desktop footer links resolve across /en and /ru (no i18n regression)', async () => {
    setWidth(1280)
    renderAt('/ru')
    await screen.findByRole('link', { name: /английск/i })
    expectLinkTo('Курсы', '/ru/courses')
  })
})
