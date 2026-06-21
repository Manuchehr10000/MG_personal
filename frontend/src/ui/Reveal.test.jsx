import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import Reveal from './Reveal'

describe('Reveal (reveal-on-scroll)', () => {
  it('renders its children', async () => {
    render(<Reveal>hello</Reveal>)
    expect(await screen.findByText('hello')).toBeInTheDocument()
  })

  it('respects prefers-reduced-motion — visible, with no animation classes', async () => {
    window.matchMedia = (query) => ({
      matches: true, // reduce
      media: query,
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    })

    render(
      <Reveal data-testid="r">
        <span>visible</span>
      </Reveal>,
    )
    const el = await screen.findByTestId('r')
    expect(screen.getByText('visible')).toBeInTheDocument()
    expect(el.className).not.toContain('opacity-0')
    expect(el.className).not.toContain('animate-reveal')

    delete window.matchMedia
  })
})
