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

// A destination may surface as both a nav link and a footer link; assert that at
// least one link with the given accessible name resolves to the expected href.
function expectLinkTo(name, href) {
  expect(
    screen.getAllByRole('link', { name }).some((a) => a.getAttribute('href') === href),
  ).toBe(true)
}

describe('nav + layout shell (003) — mobile', () => {
  it('renders four primary tabs (language-aware) + a More entry', async () => {
    setWidth(375)
    renderAt('/en')
    expect(await screen.findByRole('button', { name: 'More' })).toBeInTheDocument()
    expectLinkTo('Home', '/en')
    expectLinkTo('Courses', '/en/courses')
    expectLinkTo('Consulting', '/en/consulting')
    expectLinkTo('Contact', '/en/contact')
  })

  it('More opens a flat sheet with the overflow destinations (About, Pricing)', async () => {
    setWidth(375)
    renderAt('/en')
    // Overflow items are not in the menu until More is opened.
    expect(screen.queryByRole('menuitem', { name: 'About' })).not.toBeInTheDocument()
    fireEvent.click(await screen.findByRole('button', { name: 'More' }))
    expect(await screen.findByRole('menuitem', { name: 'About' })).toHaveAttribute(
      'href',
      '/en/about',
    )
    expect(screen.getByRole('menuitem', { name: 'Pricing' })).toHaveAttribute('href', '/en/pricing')
  })

  it('nav links carry the active language', async () => {
    setWidth(375)
    renderAt('/ru')
    await screen.findByRole('button', { name: 'Ещё' })
    expectLinkTo('Курсы', '/ru/courses')
  })

  it('every shell destination route resolves (no dead links)', async () => {
    setWidth(375)
    for (const [path, heading] of [
      // about (005) + consulting (006) + pricing (007) are real content — their h1
      // is the page title, not the nav label. contact stays a placeholder.
      ['/en/about', 'Manuchehr Ghafforzoda'],
      ['/en/pricing', 'Courses & pricing'],
      ['/en/consulting', 'Consulting that moves the numbers'],
      ['/en/contact', 'Contact'],
    ]) {
      const { unmount } = renderAt(path)
      expect(await screen.findByRole('heading', { name: heading })).toBeInTheDocument()
      unmount()
    }
  })

  it('renders the shared footer', async () => {
    setWidth(375)
    renderAt('/en')
    await screen.findByRole('button', { name: 'More' })
    expect(screen.getByText(/All rights reserved\./)).toBeInTheDocument()
  })
})

describe('nav + layout shell (003) — desktop', () => {
  it('mounts the desktop tree with a sticky scroll-nav of all six destinations + the toggle', async () => {
    setWidth(1280)
    renderAt('/en')
    // Wait for the lazy desktop tree (the toggle is part of the desktop nav).
    expect(await screen.findByRole('link', { name: /switch to russian/i })).toBeInTheDocument()
    expectLinkTo('Home', '/en')
    expectLinkTo('Courses', '/en/courses')
    expectLinkTo('Consulting', '/en/consulting')
    expectLinkTo('Contact', '/en/contact')
    expectLinkTo('About', '/en/about')
    expectLinkTo('Pricing', '/en/pricing')
    // Shared footer present on desktop too.
    expect(screen.getByText(/All rights reserved\./)).toBeInTheDocument()
  })

  it('desktop nav links resolve across /en and /ru (no regression in i18n)', async () => {
    setWidth(1280)
    renderAt('/ru')
    await screen.findByRole('link', { name: /английский/i })
    expectLinkTo('Цены', '/ru/pricing')
  })
})
