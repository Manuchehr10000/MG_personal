// UI-string dictionaries. Language is a property of content, not global state
// (decision 4): the toggle is a route swap (/:lang/...). Dynamic content carries
// its own language from the API and degrades gracefully when one locale is
// missing — handled per-content, not here.

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
      contact: 'Contact',
    },
    hero: {
      title: 'Data Analytics & AI Consulting',
      tagline:
        'I help leaders and teams make better decisions with data — from collection to analysis to forecasting.',
      cta: 'Request a quote',
    },
    placeholder: 'Shell scaffold — full content arrives in later build pieces.',
    footer: { rights: 'All rights reserved.' },
    toggle: { other: 'RU', label: 'Switch to Russian' },
  },
  ru: {
    htmlLang: 'ru',
    brand: 'Manuchehr Ghafforzoda',
    nav: {
      home: 'Главная',
      consulting: 'Консалтинг',
      about: 'Обо мне',
      courses: 'Курсы',
      contact: 'Контакт',
    },
    hero: {
      title: 'Консалтинг по аналитике данных и ИИ',
      tagline:
        'Помогаю руководителям и командам принимать решения на основе данных — от сбора до анализа и прогнозирования.',
      cta: 'Запросить расчёт',
    },
    placeholder: 'Каркас оболочки — наполнение появится в следующих частях сборки.',
    footer: { rights: 'Все права защищены.' },
    toggle: { other: 'EN', label: 'Переключить на английский' },
  },
}

export function isLang(value) {
  return LANGS.includes(value)
}

export function getDict(lang) {
  return dict[isLang(lang) ? lang : DEFAULT_LANG]
}
