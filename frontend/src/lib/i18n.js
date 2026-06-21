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
    // Home / landing copy (004). Real-SHAPED placeholder copy — owner-replaceable
    // at sync (edit = redeploy, no admin UI). The stat figures are placeholders to
    // confirm. Sections: hero -> what-I-do -> consulting -> courses -> credentials
    // -> closing CTA.
    home: {
      hero: {
        title: 'Data Analytics & AI Consulting',
        subtitle:
          'I help leaders and teams turn data into decisions — from collection and modelling to analysis, forecasting, and the AI that compounds it.',
        primaryCta: 'Request a quote',
        secondaryCta: 'Browse courses',
      },
      whatIDo: {
        title: 'Two ways I work with you',
        consulting: {
          title: 'Consulting',
          body: 'Hands-on data and AI advisory for leaders and teams — strategy, modelling, and forecasting that fit how your business actually runs.',
        },
        courses: {
          title: 'Courses',
          body: 'Practical, project-based training in Excel, SQL, Python, and applied AI — built from real analytics work, not slideware.',
        },
      },
      consulting: {
        eyebrow: 'Consulting',
        title: 'Decisions backed by data, not guesswork',
        body: 'From the first messy spreadsheet to a forecasting model your team trusts, I work alongside you to build the data capability that moves the numbers. No published price list — every engagement is scoped to the problem.',
        cta: 'Explore consulting',
      },
      courses: {
        eyebrow: 'Courses',
        title: 'Learn the craft, hands-on',
        body: 'Self-paced, project-based courses that take you from spreadsheets to Python and SQL — the same toolkit I use on consulting work.',
        cta: 'Browse courses',
      },
      credentials: {
        title: 'Trusted by teams across the region',
        body: 'Years of applied analytics and AI work, hundreds of professionals trained, and a track record of repeat engagements.',
        stats: [
          { value: '800+', label: 'professionals trained' },
          { value: '10+', label: 'years in data and analytics' },
          { value: '90%', label: 'repeat and referral clients' },
        ],
        cta: 'More about me',
      },
      closing: {
        title: 'Have a problem worth solving?',
        body: 'Tell me what you are trying to figure out, and I will tell you whether — and how — data and AI can help.',
        cta: 'Get in touch',
      },
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
    home: {
      hero: {
        title: 'Консалтинг по аналитике данных и ИИ',
        subtitle:
          'Помогаю руководителям и командам превращать данные в решения — от сбора и моделирования до анализа, прогнозирования и применения ИИ.',
        primaryCta: 'Запросить расчёт',
        secondaryCta: 'Смотреть курсы',
      },
      whatIDo: {
        title: 'Два формата работы',
        consulting: {
          title: 'Консалтинг',
          body: 'Практическое сопровождение по данным и ИИ для руководителей и команд — стратегия, моделирование и прогнозы под реальные процессы бизнеса.',
        },
        courses: {
          title: 'Курсы',
          body: 'Практическое обучение Excel, SQL, Python и прикладному ИИ — на основе реальной аналитической работы, а не слайдов.',
        },
      },
      consulting: {
        eyebrow: 'Консалтинг',
        title: 'Решения на данных, а не на догадках',
        body: 'От первой запутанной таблицы до прогнозной модели, которой доверяет команда, — работаю рядом с вами и выстраиваю аналитическую зрелость, которая влияет на цифры. Прайс-листа нет: каждый проект оценивается под задачу.',
        cta: 'Узнать о консалтинге',
      },
      courses: {
        eyebrow: 'Курсы',
        title: 'Осваивайте ремесло на практике',
        body: 'Курсы в своём темпе и на реальных проектах — от таблиц до Python и SQL, тот же инструментарий, что и в консалтинге.',
        cta: 'Смотреть курсы',
      },
      credentials: {
        title: 'Нам доверяют команды по всему региону',
        body: 'Годы прикладной работы с аналитикой и ИИ, сотни обученных специалистов и регулярные повторные обращения.',
        stats: [
          { value: '800+', label: 'обученных специалистов' },
          { value: '10+', label: 'лет в данных и аналитике' },
          { value: '90%', label: 'повторных обращений и рекомендаций' },
        ],
        cta: 'Подробнее обо мне',
      },
      closing: {
        title: 'Есть задача, которую стоит решить?',
        body: 'Расскажите, что хотите понять, — и я скажу, может ли анализ данных и ИИ помочь и как именно.',
        cta: 'Связаться',
      },
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
