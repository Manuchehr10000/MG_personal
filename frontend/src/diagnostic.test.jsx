import { fireEvent, render, screen } from '@testing-library/react'
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

const EN_TITLE = 'AI-readiness diagnostic — coming soon'
const RU_TITLE = 'Диагностика готовности к ИИ — скоро'

describe('diagnostic placeholder route (009) — mobile', () => {
  beforeEach(() => {
    window.innerWidth = 375
  })

  it('resolves to a bilingual coming-soon page (200, not a redirect to home)', async () => {
    const { unmount } = renderAt('/en/diagnostic')
    expect(await screen.findByRole('heading', { level: 1, name: EN_TITLE })).toBeInTheDocument()
    // Not redirected to home / catch-all.
    expect(screen.queryByText('Data Analytics & AI Consulting')).not.toBeInTheDocument()
    unmount()

    renderAt('/ru/diagnostic')
    expect(await screen.findByRole('heading', { level: 1, name: RU_TITLE })).toBeInTheDocument()
  })

  it('the toggle swaps EN<->RU on /diagnostic (no dead route)', async () => {
    renderAt('/en/diagnostic')
    const toggle = await screen.findByRole('link', { name: /switch to russian/i })
    expect(toggle).toHaveAttribute('href', '/ru/diagnostic')
  })

  it('is reachable via a footer link but is NOT a bottom-tab / More entry', async () => {
    renderAt('/en')
    await screen.findByRole('button', { name: 'More' })
    // Exactly one Diagnostic link — the footer (not in DESTINATIONS / tab bar).
    const links = screen.getAllByRole('link', { name: 'Diagnostic' })
    expect(links).toHaveLength(1)
    expect(links[0]).toHaveAttribute('href', '/en/diagnostic')
    // Opening More does not reveal a diagnostic entry either.
    fireEvent.click(screen.getByRole('button', { name: 'More' }))
    expect(screen.queryByRole('menuitem', { name: 'Diagnostic' })).not.toBeInTheDocument()
  })
})

describe('diagnostic placeholder route (009) — desktop', () => {
  beforeEach(() => {
    window.innerWidth = 1280
  })

  it('resolves to the coming-soon page (200) on desktop', async () => {
    renderAt('/en/diagnostic')
    expect(await screen.findByRole('heading', { level: 1, name: EN_TITLE })).toBeInTheDocument()
  })

  it('is footer-reachable but NOT in the desktop scroll-nav', async () => {
    renderAt('/en')
    // Wait for the lazy desktop tree (toggle is part of the desktop nav).
    await screen.findByRole('link', { name: /switch to russian/i })
    const links = screen.getAllByRole('link', { name: 'Diagnostic' })
    expect(links).toHaveLength(1) // footer only, not the scroll-nav
    expect(links[0]).toHaveAttribute('href', '/en/diagnostic')
  })
})
