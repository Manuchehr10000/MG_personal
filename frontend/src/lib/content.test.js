import { describe, expect, it } from 'vitest'

import { languagesOf, localize, resolveLang } from './content'

describe('per-content localization mechanism', () => {
  it('languagesOf returns the declared languages in canonical order', () => {
    expect(languagesOf({ ru: 'x', en: 'y' })).toEqual(['en', 'ru'])
    expect(languagesOf({ ru: 'x' })).toEqual(['ru'])
    expect(languagesOf(null)).toEqual([])
  })

  it('item-hide: a missing language with no fallback resolves to null', () => {
    const r = localize({ ru: 'только ру' }, 'en')
    expect(r.value).toBeNull()
    expect(r.lang).toBeNull()
    expect(r.missing).toBe(true)
  })

  it('returns the exact-match entry without falling back', () => {
    const r = localize({ en: 'hi', ru: 'привет' }, 'en')
    expect(r.value).toBe('hi')
    expect(r.lang).toBe('en')
    expect(r.fellBack).toBe(false)
  })

  it('page-fallback: a missing language falls back to an available one', () => {
    const r = localize({ ru: 'только ру' }, 'en', { fallback: true })
    expect(r.value).toBe('только ру')
    expect(r.lang).toBe('ru')
    expect(r.fellBack).toBe(true)
  })

  it('resolveLang prefers exact, then default, then first available', () => {
    expect(resolveLang(['en', 'ru'], 'en')).toBe('en')
    expect(resolveLang(['ru'], 'en')).toBeNull() // no fallback
    expect(resolveLang(['ru'], 'en', { fallback: true })).toBe('ru') // default lang
    expect(resolveLang(['en'], 'ru', { fallback: true })).toBe('en') // first available
  })
})
