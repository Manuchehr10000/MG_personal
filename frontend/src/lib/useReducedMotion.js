import { useEffect, useState } from 'react'

// Tracks the user's prefers-reduced-motion setting so animations (ui/Reveal) can
// switch themselves off (DESIGN.md flat discipline / 003: reduced-motion
// respected). Guards for environments without matchMedia (jsdom, SSR) -> false.
export function useReducedMotion() {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    const sync = () => setReduced(mq.matches)
    sync()
    mq.addEventListener?.('change', sync)
    return () => mq.removeEventListener?.('change', sync)
  }, [])

  return reduced
}
