import { useEffect, useState } from 'react'

// The single top-level fork: mobile (primary) vs desktop (workbook). Mobile and
// desktop are different presentations over a shared data/logic layer, not the
// same components (decision 10).
export const DESKTOP_MIN_WIDTH = 1024

function read() {
  if (typeof window === 'undefined') return 'mobile'
  return window.innerWidth >= DESKTOP_MIN_WIDTH ? 'desktop' : 'mobile'
}

export function useBreakpoint() {
  const [bp, setBp] = useState(read)

  useEffect(() => {
    const onResize = () => setBp(read())
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  return bp
}
