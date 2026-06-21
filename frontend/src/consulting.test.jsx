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

const hasLink = (name, href) =>
  screen.getAllByRole('link', { name }).some((a) => a.getAttribute('href') === href)

// No published prices (decision 14) — no currency markers anywhere on the page.
const NO_CURRENCY = /[$₽€]/

describe('consulting (006) — mobile (clean, quote path)', () => {
  beforeEach(() => {
    window.innerWidth = 375
  })

  it('renders bilingually with four service blocks + closing + quote CTA', async () => {
    const { container, unmount } = renderAt('/en/consulting')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Consulting that moves the numbers' }),
    ).toBeInTheDocument()
    expect(container.querySelectorAll('[data-service]')).toHaveLength(4)
    expect(hasLink(/request a quote/i, '/en/contact')).toBe(true)
    expect(container.textContent).not.toMatch(NO_CURRENCY)
    unmount()

    renderAt('/ru/consulting')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Консалтинг, который влияет на цифры' }),
    ).toBeInTheDocument()
    expect(hasLink(/запросить расчёт/i, '/ru/contact')).toBe(true)
  })

  it('renders NO workbook chrome and does NOT load JetBrains Mono (desktop-only)', async () => {
    const { container } = renderAt('/en/consulting')
    await screen.findByRole('heading', { level: 1 })
    expect(container.querySelector('.font-mono')).toBeNull()
    expect(container.querySelector('[data-workbook]')).toBeNull()
    expect(document.querySelector('#workbook-mono-font')).toBeNull()
  })
})

describe('consulting (006) — desktop (adopts the 005 workbook layer)', () => {
  beforeEach(() => {
    window.innerWidth = 1280
  })

  it('presents the same four services through the workbook chrome', async () => {
    const { container } = renderAt('/en/consulting')
    expect(await screen.findByTestId('desktop-consulting')).toBeInTheDocument()
    // Reuses the 005 workbook primitives.
    expect(container.querySelector('[data-workbook="sheet"]')).not.toBeNull()
    expect(container.querySelector('[data-workbook="formula-bar"]')).not.toBeNull()
    expect(container.querySelector('[data-workbook="data-grid"]')).not.toBeNull()
    expect(container.querySelector('[data-workbook="sheet-tabs"]')).not.toBeNull()
    expect(container.querySelector('.font-mono')).not.toBeNull()
    // Same four service blocks + quote CTA; still no prices.
    expect(container.querySelectorAll('[data-service]')).toHaveLength(4)
    expect(hasLink(/request a quote/i, '/en/contact')).toBe(true)
    expect(container.textContent).not.toMatch(NO_CURRENCY)
  })

  it('injects JetBrains Mono on the workbook and tears it down on unmount', async () => {
    const { unmount } = renderAt('/en/consulting')
    await screen.findByTestId('desktop-consulting')
    expect(document.querySelector('#workbook-mono-font')).not.toBeNull()
    unmount()
    expect(document.querySelector('#workbook-mono-font')).toBeNull()
  })

  it('renders the workbook bilingually (toggle target, no layout break)', async () => {
    renderAt('/ru/consulting')
    expect(await screen.findByTestId('desktop-consulting')).toBeInTheDocument()
    expect(screen.getByText('Консалтинг, который влияет на цифры')).toBeInTheDocument()
  })
})

describe('consulting (006) — toggle (no 002 regression)', () => {
  it('the language toggle swaps /en/consulting <-> /ru/consulting (mobile)', async () => {
    window.innerWidth = 375
    renderAt('/en/consulting')
    const toggle = await screen.findByRole('link', { name: /switch to russian/i })
    expect(toggle).toHaveAttribute('href', '/ru/consulting')
  })
})
