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
    // About / credentials (005). Real-SHAPED placeholder copy — owner-replaceable
    // at sync (edit = redeploy, no admin UI). The same content model renders two
    // ways: mobile = clean proof surface; desktop = the workbook metaphor. Proof
    // stats + facts are placeholders for the owner to confirm. Logos live in
    // lib/clients (language-neutral proper nouns), reused from the home strip.
    about: {
      eyebrow: 'About',
      name: 'Manuchehr Ghafforzoda',
      role: 'Data Analytics & AI Consultant · Trainer',
      lead: 'I help organisations across the region turn messy data into decisions they can trust.',
      bio: [
        'For over seven years I have worked at the intersection of data analytics, forecasting, and applied AI — building the models, dashboards, and data practices that leaders actually use to run their organisations.',
        'Alongside consulting, I train teams and professionals in the practical craft: Excel, SQL, Python, and the AI tools that compound them. Hundreds of specialists across the region have come through these programmes.',
      ],
      // Proof figures (7+ / 800+ / 90% / published) — owner to confirm exact
      // labels. Rendered from this array, never hardcoded per item.
      stats: [
        { value: '7+', label: 'years in data & AI advisory' },
        { value: '800+', label: 'professionals trained' },
        { value: '90%', label: 'repeat & referral clients' },
        { value: 'Published', label: 'author & speaker' },
      ],
      // The same proof, tabulated as field/value rows for the desktop data-grid.
      facts: [
        { field: 'Focus', value: 'Data analytics · forecasting · applied AI' },
        { field: 'Experience', value: '7+ years advising teams & leaders' },
        { field: 'Training', value: '800+ professionals across the region' },
        { field: 'Based', value: 'Dushanbe, Tajikistan' },
        { field: 'Languages', value: 'Russian · English · Tajik' },
      ],
      clientsTitle: 'Selected clients & partners',
      closing: {
        title: 'Want to work together?',
        body: 'Tell me about the decision you are trying to make — and whether data and AI can help.',
        cta: 'Get in touch',
      },
      // Desktop-only workbook chrome labels (mono). Spreadsheet-flavoured but
      // bilingual where the token carries meaning.
      workbook: {
        sheetName: 'about.xlsx',
        formulaCell: 'A1',
        columns: { field: 'FIELD', value: 'VALUE' },
        statsLabel: 'PROOF',
        notesLabel: 'NOTES',
        tabs: ['Profile', 'Clients'],
      },
    },
    // Consulting services (006). Quote path only — NO published prices (decision
    // 14: consulting price IS NULL → request a quote). Same content model, two
    // presentations: mobile clean / desktop adopts the 005 workbook layer. Real-
    // shaped placeholder copy, owner-replaceable.
    consulting: {
      eyebrow: 'Consulting',
      title: 'Consulting that moves the numbers',
      lead: 'Hands-on data and AI advisory for leaders and teams — scoped to the decision you are trying to make, never sold as an off-the-shelf package.',
      services: [
        {
          title: 'Data strategy & architecture',
          body: 'We map where your data lives, fix the foundations, and set a roadmap — so analysis rests on something solid instead of a tangle of spreadsheets.',
        },
        {
          title: 'Analytics & dashboards',
          body: 'Raw data becomes the dashboards and reports your team actually uses to run the business — the numbers that matter, refreshed and trusted.',
        },
        {
          title: 'Forecasting & modelling',
          body: 'Predictive models for demand, revenue, and risk — built around how your business really works and validated against what actually happens.',
        },
        {
          title: 'Applied AI & readiness',
          body: 'Find where AI genuinely earns its keep, prepare your data and people for it, and put practical tools into the workflow — no hype, measurable impact.',
        },
      ],
      closing:
        'Every engagement is scoped to your problem and quoted on request — tell me what you are trying to figure out.',
      ctaTitle: 'Have a problem worth solving?',
      cta: 'Request a quote',
      workbook: {
        sheetName: 'consulting.xlsx',
        formulaCell: 'A1',
        columns: { service: 'SERVICE', detail: 'WHAT YOU GET' },
        tabs: ['Services', 'Engage'],
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
    about: {
      eyebrow: 'Обо мне',
      name: 'Манучехр Гаффорзода',
      role: 'Консультант по аналитике данных и ИИ · Тренер',
      lead: 'Помогаю организациям региона превращать разрозненные данные в решения, которым можно доверять.',
      bio: [
        'Более семи лет работаю на стыке аналитики данных, прогнозирования и прикладного ИИ — выстраиваю модели, дашборды и практики работы с данными, которые руководители действительно используют в управлении.',
        'Помимо консалтинга обучаю команды и специалистов практическому ремеслу: Excel, SQL, Python и инструментам ИИ, которые их усиливают. Через эти программы прошли сотни специалистов по всему региону.',
      ],
      stats: [
        { value: '7+', label: 'лет в консалтинге по данным и ИИ' },
        { value: '800+', label: 'обученных специалистов' },
        { value: '90%', label: 'повторных обращений и рекомендаций' },
        { value: 'Публикации', label: 'автор и спикер' },
      ],
      facts: [
        { field: 'Направление', value: 'Аналитика данных · прогнозы · прикладной ИИ' },
        { field: 'Опыт', value: '7+ лет работы с командами и руководителями' },
        { field: 'Обучение', value: '800+ специалистов по региону' },
        { field: 'Город', value: 'Душанбе, Таджикистан' },
        { field: 'Языки', value: 'Русский · английский · таджикский' },
      ],
      clientsTitle: 'Избранные клиенты и партнёры',
      closing: {
        title: 'Хотите поработать вместе?',
        body: 'Расскажите, какое решение вам нужно принять, — и можно ли помочь с помощью данных и ИИ.',
        cta: 'Связаться',
      },
      workbook: {
        sheetName: 'about.xlsx',
        formulaCell: 'A1',
        columns: { field: 'ПОЛЕ', value: 'ЗНАЧЕНИЕ' },
        statsLabel: 'ПОКАЗАТЕЛИ',
        notesLabel: 'ЗАМЕТКИ',
        tabs: ['Профиль', 'Клиенты'],
      },
    },
    consulting: {
      eyebrow: 'Консалтинг',
      title: 'Консалтинг, который влияет на цифры',
      lead: 'Практическое сопровождение по данным и ИИ для руководителей и команд — под конкретную задачу, а не готовым пакетом.',
      services: [
        {
          title: 'Стратегия и архитектура данных',
          body: 'Разбираемся, где живут ваши данные, наводим порядок в основе и строим дорожную карту — чтобы анализ опирался на надёжный фундамент, а не на хаос таблиц.',
        },
        {
          title: 'Аналитика и дашборды',
          body: 'Сырые данные превращаются в дашборды и отчёты, которыми команда действительно пользуется в управлении, — значимые показатели, обновляемые и проверенные.',
        },
        {
          title: 'Прогнозирование и моделирование',
          body: 'Прогнозные модели для спроса, выручки и рисков — под реальные процессы вашего бизнеса и проверенные на фактических данных.',
        },
        {
          title: 'Прикладной ИИ и готовность к нему',
          body: 'Находим, где ИИ действительно приносит пользу, готовим данные и людей и встраиваем практичные инструменты в рабочие процессы — без хайпа, с измеримым результатом.',
        },
      ],
      closing:
        'Каждый проект оценивается под задачу, расчёт — по запросу. Расскажите, что хотите решить.',
      ctaTitle: 'Есть задача, которую стоит решить?',
      cta: 'Запросить расчёт',
      workbook: {
        sheetName: 'consulting.xlsx',
        formulaCell: 'A1',
        columns: { service: 'УСЛУГА', detail: 'ЧТО ВЫ ПОЛУЧИТЕ' },
        tabs: ['Услуги', 'Контакт'],
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
