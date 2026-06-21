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

describe('pricing (007) — mobile (clean fixed-price cards)', () => {
  beforeEach(() => {
    window.innerWidth = 375
  })

  it('renders bilingually with fixed-price course cards + CTA to /contact', async () => {
    const { container, unmount } = renderAt('/en/pricing')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Courses & pricing' }),
    ).toBeInTheDocument()
    // Four courses, each with a fixed price (decision 14).
    expect(container.querySelectorAll('[data-course]')).toHaveLength(4)
    expect(container.querySelectorAll('[data-price]')).toHaveLength(4)
    expect(screen.getByText('900 TJS')).toBeInTheDocument()
    expect(hasLink(/get in touch/i, '/en/contact')).toBe(true)
    // No checkout / buy flow in phase 1 (decision 15).
    expect(screen.queryByRole('button', { name: /buy|checkout|add to cart|enrol now/i })).toBeNull()
    unmount()

    renderAt('/ru/pricing')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Курсы и цены' }),
    ).toBeInTheDocument()
    expect(screen.getByText('1 800 сомони')).toBeInTheDocument()
  })

  it('renders NO workbook chrome and does NOT load JetBrains Mono (desktop-only)', async () => {
    const { container } = renderAt('/en/pricing')
    await screen.findByRole('heading', { level: 1 })
    expect(container.querySelector('.font-mono')).toBeNull()
    expect(container.querySelector('[data-workbook]')).toBeNull()
    expect(document.querySelector('#workbook-mono-font')).toBeNull()
  })
})

describe('pricing (007) — desktop (workbook price grid via the 005 layer)', () => {
  beforeEach(() => {
    window.innerWidth = 1280
  })

  it('presents the same offerings as a COURSE/INCLUDES/PRICE grid', async () => {
    const { container } = renderAt('/en/pricing')
    expect(await screen.findByTestId('desktop-pricing')).toBeInTheDocument()
    // Reuses the 005 workbook primitives.
    expect(container.querySelector('[data-workbook="sheet"]')).not.toBeNull()
    expect(container.querySelector('[data-workbook="formula-bar"]')).not.toBeNull()
    expect(container.querySelector('[data-workbook="data-grid"]')).not.toBeNull()
    expect(container.querySelector('[data-workbook="sheet-tabs"]')).not.toBeNull()
    expect(container.querySelector('.font-mono')).not.toBeNull()
    // The price-grid columns + four priced courses.
    expect(screen.getByText('COURSE')).toBeInTheDocument()
    expect(screen.getByText('INCLUDES')).toBeInTheDocument()
    expect(screen.getByText('PRICE')).toBeInTheDocument()
    expect(container.querySelectorAll('[data-course]')).toHaveLength(4)
    expect(container.querySelectorAll('[data-price]')).toHaveLength(4)
    expect(hasLink(/get in touch/i, '/en/contact')).toBe(true)
  })

  it('injects JetBrains Mono on the workbook and tears it down on unmount', async () => {
    const { unmount } = renderAt('/en/pricing')
    await screen.findByTestId('desktop-pricing')
    expect(document.querySelector('#workbook-mono-font')).not.toBeNull()
    unmount()
    expect(document.querySelector('#workbook-mono-font')).toBeNull()
  })

  it('renders the price grid bilingually (toggle target, no layout break)', async () => {
    renderAt('/ru/pricing')
    expect(await screen.findByTestId('desktop-pricing')).toBeInTheDocument()
    expect(screen.getByText('Курсы и цены')).toBeInTheDocument()
    expect(screen.getByText('ЦЕНА')).toBeInTheDocument()
  })
})

describe('pricing (007) — toggle (no 002 regression)', () => {
  it('the language toggle swaps /en/pricing <-> /ru/pricing (mobile)', async () => {
    window.innerWidth = 375
    renderAt('/en/pricing')
    const toggle = await screen.findByRole('link', { name: /switch to russian/i })
    expect(toggle).toHaveAttribute('href', '/ru/pricing')
  })
})
