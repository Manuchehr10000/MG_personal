import { useEffect, useRef, useState } from 'react'

import { useReducedMotion } from '../lib/useReducedMotion'

// Reveal-on-scroll wrapper (003) — subtle and flat-consistent (DESIGN.md). The
// child starts hidden and runs the one-shot `reveal` animation (tailwind.config)
// the first time it scrolls into view. Respects prefers-reduced-motion and any
// environment without IntersectionObserver (jsdom, SSR) by rendering visible with
// no animation. Shared below the fork; both presentation trees use it.
export default function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const reduced = useReducedMotion()
  const ref = useRef(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShown(true)
          io.disconnect()
        }
      },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [reduced])

  // Reduced motion: always visible, no transform/animation. Otherwise hidden
  // until in view, then animate in.
  const motion = reduced ? '' : shown ? 'animate-reveal' : 'opacity-0'

  return (
    <Tag ref={ref} className={[motion, className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  )
}
