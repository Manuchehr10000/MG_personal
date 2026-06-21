import { render, screen } from '@testing-library/react'
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

const FONT_SELECTOR = '#workbook-mono-font'

describe('about / credentials (005) — mobile (clean proof surface)', () => {
  beforeEach(() => {
    window.innerWidth = 375
  })

  it('renders the proof surface bilingually via the route', async () => {
    const { unmount } = renderAt('/en/about')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Manuchehr Ghafforzoda' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Selected clients & partners')).toBeInTheDocument()
    unmount()

    renderAt('/ru/about')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Манучехр Гаффорзода' }),
    ).toBeInTheDocument()
    expect(screen.getByText('Избранные клиенты и партнёры')).toBeInTheDocument()
  })

  it('renders proof stats + all 8 client logos + the headshot from data', async () => {
    const { container } = renderAt('/en/about')
    await screen.findByRole('heading', { level: 1 })
    expect(container.querySelectorAll('[data-stat]')).toHaveLength(4)
    expect(container.querySelectorAll('img[data-logo]')).toHaveLength(8)
    expect(screen.getByTestId('headshot')).toBeInTheDocument()
  })

  it('renders NO workbook chrome and does NOT load JetBrains Mono (desktop-only)', async () => {
    const { container } = renderAt('/en/about')
    await screen.findByRole('heading', { level: 1 })
    expect(container.querySelector('.font-mono')).toBeNull()
    expect(container.querySelector('[data-workbook]')).toBeNull()
    expect(document.querySelector(FONT_SELECTOR)).toBeNull()
  })
})

describe('about / credentials (005) — desktop (workbook debut)', () => {
  beforeEach(() => {
    window.innerWidth = 1280
  })

  it('renders the same proof through the workbook chrome (sheet, formula bar, grid, tabs)', async () => {
    const { container } = renderAt('/en/about')
    // Lazy desktop tree — wait for the workbook Sheet to mount.
    expect(await screen.findByTestId('desktop-about')).toBeInTheDocument()
    expect(container.querySelector('[data-workbook="sheet"]')).not.toBeNull()
    expect(container.querySelector('[data-workbook="formula-bar"]')).not.toBeNull()
    expect(container.querySelectorAll('[data-workbook="data-grid"]').length).toBeGreaterThan(0)
    expect(container.querySelector('[data-workbook="sheet-tabs"]')).not.toBeNull()
    // Dense mono chrome is present (the addendum typeface), and the role headline.
    expect(container.querySelector('.font-mono')).not.toBeNull()
    expect(screen.getByText('Data Analytics & AI Consultant · Trainer')).toBeInTheDocument()
    // Same proof data: 4 stats + 8 logos render from the shared data.
    expect(container.querySelectorAll('[data-stat]')).toHaveLength(4)
    expect(container.querySelectorAll('img[data-logo]')).toHaveLength(8)
    expect(screen.getByTestId('headshot')).toBeInTheDocument()
  })

  it('injects JetBrains Mono when the workbook mounts, and removes it on unmount', async () => {
    const { unmount } = renderAt('/en/about')
    await screen.findByTestId('desktop-about')
    expect(document.querySelector(FONT_SELECTOR)).not.toBeNull()
    unmount()
    // Ref-counted: the last Sheet unmounting tears the font link back down.
    expect(document.querySelector(FONT_SELECTOR)).toBeNull()
  })

  it('renders the workbook bilingually (toggle target, no layout break)', async () => {
    renderAt('/ru/about')
    expect(await screen.findByTestId('desktop-about')).toBeInTheDocument()
    expect(screen.getByText('Консультант по аналитике данных и ИИ · Тренер')).toBeInTheDocument()
  })
})

describe('about / credentials (005) — toggle + degradation (no 002 regression)', () => {
  it('the language toggle swaps /en/about <-> /ru/about (mobile)', async () => {
    window.innerWidth = 375
    renderAt('/en/about')
    const toggle = await screen.findByRole('link', { name: /switch to russian/i })
    expect(toggle).toHaveAttribute('href', '/ru/about')
  })
})
