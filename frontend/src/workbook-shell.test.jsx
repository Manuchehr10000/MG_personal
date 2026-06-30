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

describe('workbook shell (003 rev.4) — desktop single-scroll frame', () => {
  beforeEach(() => {
    window.innerWidth = 1280
  })

  it('renders ONE continuous workbook: full chrome + six stacked sheet sections', async () => {
    const { container } = renderAt('/en')
    await screen.findByRole('button', { name: 'Overview' })
    expect(container.querySelector('[data-workbook="title-bar"]')).not.toBeNull()
    expect(container.querySelector('[data-workbook="command-bar"]')).not.toBeNull()
    expect(container.querySelector('[data-workbook="formula-bar"]')).not.toBeNull()
    expect(container.querySelector('[data-workbook="name-box"]')).not.toBeNull()
    expect(container.querySelector('[data-workbook="status-bar"]')).not.toBeNull()
    expect(container.querySelectorAll('[data-workbook="section"]')).toHaveLength(6)
  })

  it('deep-links the route to its sheet on load (active tab follows the URL)', async () => {
    renderAt('/en/consulting')
    const tab = await screen.findByRole('button', { name: 'Consulting' })
    expect(tab).toHaveAttribute('aria-current', 'true')
  })

  it('clicking a sheet-tab makes it the active section (terracotta top-border)', async () => {
    renderAt('/en')
    const about = await screen.findByRole('button', { name: 'About' })
    fireEvent.click(about)
    expect(about).toHaveAttribute('aria-current', 'true')
    expect(about.className).toContain('border-t-accent-primary')
  })

  it('redirects /:lang/pricing into the courses sheet (pricing folds in)', async () => {
    renderAt('/en/pricing')
    const courses = await screen.findByRole('button', { name: 'Courses' })
    expect(courses).toHaveAttribute('aria-current', 'true')
  })

  it('keeps the single-accent rule in chrome — terracotta status dot, NO green', async () => {
    const { container } = renderAt('/en')
    await screen.findByRole('button', { name: 'Overview' })
    const dot = container.querySelector('[data-workbook="status-dot"]')
    expect(dot.className).toContain('bg-accent-primary')
    // No semantic-success (green) anywhere in the workbook chrome.
    expect(container.querySelector('.bg-semantic-success, .text-semantic-success')).toBeNull()
  })

  it('loads JetBrains Mono on the desktop workbook (the desktop-only data typeface)', async () => {
    renderAt('/en')
    await screen.findByRole('button', { name: 'Overview' })
    expect(document.querySelector('#workbook-mono-font')).not.toBeNull()
  })
})

describe('workbook shell (003 rev.4) — mobile stays native (no workbook chrome)', () => {
  beforeEach(() => {
    window.innerWidth = 375
  })

  it('renders placeholder screens with NO workbook chrome and NO JetBrains Mono', async () => {
    const { container } = renderAt('/en')
    await screen.findByRole('heading', { level: 1, name: 'Home' })
    expect(container.querySelector('[data-workbook]')).toBeNull()
    expect(container.querySelector('.font-mono')).toBeNull()
    expect(document.querySelector('#workbook-mono-font')).toBeNull()
  })
})
