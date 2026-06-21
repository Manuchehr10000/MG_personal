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

// A CTA label may appear more than once (e.g. a tab + a footer link); assert at
// least one link with the given accessible name resolves to the expected route.
const hasLink = (name, href) =>
  screen.getAllByRole('link', { name }).some((a) => a.getAttribute('href') === href)

describe('home / landing (004) — mobile', () => {
  beforeEach(() => {
    window.innerWidth = 375
  })

  it('renders the full section stack in EN', async () => {
    renderAt('/en')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Data Analytics & AI Consulting' }),
    ).toBeInTheDocument()
    for (const name of [
      'Two ways I work with you',
      'Decisions backed by data, not guesswork',
      'Learn the craft, hands-on',
      'Trusted by teams across the region',
      'Have a problem worth solving?',
    ]) {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument()
    }
  })

  it('renders the section stack in RU (toggle target, no layout break)', async () => {
    renderAt('/ru')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Консалтинг по аналитике данных и ИИ' }),
    ).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Два формата работы' })).toBeInTheDocument()
  })

  it('every CTA resolves to a live route', async () => {
    renderAt('/en')
    await screen.findByRole('heading', { level: 1 })
    expect(hasLink('Request a quote', '/en/contact')).toBe(true) // hero primary
    expect(hasLink(/Get in touch/, '/en/contact')).toBe(true) // closing
    expect(hasLink(/Explore consulting/, '/en/consulting')).toBe(true)
    expect(hasLink(/Browse courses/, '/en/courses')).toBe(true)
    expect(hasLink(/More about me/, '/en/about')).toBe(true)
  })

  it('drops the 002 ruOnlyDemo scaffold', async () => {
    renderAt('/ru')
    await screen.findByRole('heading', { level: 1 })
    expect(screen.queryByTestId('ru-only-item')).not.toBeInTheDocument()
  })
})

describe('home / landing (004) — desktop', () => {
  beforeEach(() => {
    window.innerWidth = 1280
  })

  it('renders clean (no workbook chrome) with resolving CTAs', async () => {
    const { container } = renderAt('/en')
    expect(
      await screen.findByRole('heading', { level: 1, name: 'Data Analytics & AI Consulting' }),
    ).toBeInTheDocument()
    expect(hasLink('Request a quote', '/en/contact')).toBe(true)
    expect(hasLink(/Explore consulting/, '/en/consulting')).toBe(true)
    expect(hasLink(/More about me/, '/en/about')).toBe(true)
    // Clean desktop home: no workbook/mono chrome is rendered.
    expect(container.querySelector('.font-mono')).toBeNull()
  })
})
