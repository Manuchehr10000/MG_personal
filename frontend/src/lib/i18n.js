// Per-content i18n framework (002). Language is a property of content, not global
// state (decision 4): the toggle is a route swap (/:lang/...). This module owns
// the UI-string dictionaries plus the reusable accessors every later shell page
// (003-008) consumes: useLang / useTranslation read the active language off the
// route, so pages don't thread a `lang` prop. Dynamic content carries its own
// language and degrades per-content via lib/content.js + lib/languageAvailability.

import { useParams } from 'react-router-dom'

export const LANGS = ['en', 'ru']
// Audience is Tajikistan / CIS; the shell defaults to Russian.
export const DEFAULT_LANG = 'ru'

export const dict = {
  en: {
    htmlLang: 'en',
    brand: 'Manuchehr Ghafforzoda',
    nav: {
      home: 'Home',
      consulting: 'Consulting',
      about: 'About',
      courses: 'Courses',
      pricing: 'Pricing',
      contact: 'Contact',
      more: 'More',
    },
    hero: {
      title: 'Data Analytics & AI Consulting',
      tagline:
        'I help leaders and teams make better decisions with data — from collection to analysis to forecasting.',
      cta: 'Request a quote',
    },
    placeholder: 'Shell scaffold — full content arrives in later build pieces.',
    footer: { rights: 'All rights reserved.' },
    // The toggle names the language you switch TO; `unavailable` is shown when the
    // current content has no other-language version (greyed, no dead route).
    toggle: { other: 'RU', label: 'Switch to Russian', unavailable: 'Not available in Russian' },
    // Shown when a route exists only in the other language and falls back to it.
    degraded: { fallbackNotice: 'Available in Russian only — showing the Russian version.' },
  },
  ru: {
    htmlLang: 'ru',
    brand: 'Manuchehr Ghafforzoda',
    nav: {
      home: 'Главная',
      consulting: 'Консалтинг',
      about: 'Обо мне',
      courses: 'Курсы',
      pricing: 'Цены',
      contact: 'Контакт',
      more: 'Ещё',
    },
    hero: {
      title: 'Консалтинг по аналитике данных и ИИ',
      tagline:
        'Помогаю руководителям и командам принимать решения на основе данных — от сбора до анализа и прогнозирования.',
      cta: 'Запросить расчёт',
    },
    placeholder: 'Каркас оболочки — наполнение появится в следующих частях сборки.',
    footer: { rights: 'Все права защищены.' },
    toggle: { other: 'EN', label: 'Переключить на английский', unavailable: 'Недоступно на английском' },
    degraded: { fallbackNotice: 'Доступно только на английском — показана английская версия.' },
  },
}

// Language availability per shell route. The shell is bilingual except where the
// product policy is single-language: PRODUCT.md fixes course/LMS content as
// RU-only "for the foreseeable future" and requires the shell to handle that from
// day one (toggle greys, EN falls back to RU) so phase 2 needs no retrofit. This
// declares that documented policy on the existing courses placeholder — it adds
// no course content (that is a later piece); it only states which languages the
// route exists in so the framework can demonstrate both degradation modes.
export const pageLanguages = {
  '': LANGS,
  consulting: LANGS,
  about: LANGS,
  courses: ['ru'],
  pricing: LANGS,
  contact: LANGS,
}

export function isLang(value) {
  return LANGS.includes(value)
}

export function getDict(lang) {
  return dict[isLang(lang) ? lang : DEFAULT_LANG]
}

// The other language in the two-language system (for the toggle target).
export function otherLang(lang) {
  return LANGS.find((l) => l !== lang) ?? DEFAULT_LANG
}

// Translation accessors — the reusable shape 003-008 consume. They read the
// active language off the :lang route segment, falling back to the default for an
// unknown/missing segment (App redirects those, so this is a belt-and-braces).
export function useLang() {
  const { lang } = useParams()
  return isLang(lang) ? lang : DEFAULT_LANG
}

export function useTranslation() {
  const lang = useLang()
  return { lang, t: dict[lang], dict, otherLang: otherLang(lang), langs: LANGS }
}
