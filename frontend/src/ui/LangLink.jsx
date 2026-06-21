// Language-aware links (002). Internal navigation must keep the active language
// (FRONTEND.md: "keep the active language across internal navigation"). LangLink /
// LangNavLink take a path *within* a language ("consulting", "/consulting", or ""
// for the lang home) and prefix the current /:lang automatically, so 003-008 never
// hand-build `/${lang}/...` strings. Pass `lang` to override (rarely needed).

import { forwardRef } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { useLang } from '../lib/i18n'

function build(lang, to) {
  const rest = to ? `/${String(to).replace(/^\//, '')}` : ''
  return `/${lang}${rest}`
}

export const LangLink = forwardRef(function LangLink({ to, lang, ...rest }, ref) {
  const current = useLang()
  return <Link ref={ref} to={build(lang ?? current, to)} {...rest} />
})

export const LangNavLink = forwardRef(function LangNavLink({ to, lang, ...rest }, ref) {
  const current = useLang()
  return <NavLink ref={ref} to={build(lang ?? current, to)} {...rest} />
})
