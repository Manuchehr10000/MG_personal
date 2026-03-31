# Project Instructions

## Purpose
This repo is for `ghafforzoda.net`, a bilingual personal website for consulting lead generation and course enrollment.

Primary goals:
- generate consulting leads
- support course enrollment
- work well for mobile-first traffic from Instagram and LinkedIn

When making changes, preserve the site's positioning:
- English + Russian bilingual experience
- consulting is the primary revenue-driving section
- the site should feel clean, editorial, modern, and premium

## Working Rules For Codex
- Keep all user-facing content available in both English and Russian.
- Preserve the language toggle and ensure it switches all relevant content without reload.
- Do not add pricing to the main page.
- Do not add university names.
- Do not add YouTube sections.
- Do not add testimonials.
- Do not add a "free consultation" CTA.
- Do not add a phone number anywhere on the page.
- Do not use "data strategy consultant" as the title.
- If content is repeated data, prefer data files over hardcoded markup.
- If a file structure for `data/`, `images/`, `styles/`, or `scripts/` exists, keep concerns separated rather than mixing everything into one file.

## Page Structure
The page structure should remain:
1. Hero
2. Consulting
3. About
4. Courses
5. Contact

Consulting must appear immediately after the hero and must remain visually prominent.

## Content Specification

### Hero
Layout:
- left-aligned text
- large name
- title below
- one-liner below
- two CTA buttons side by side
- hero image or video on the right, or as a subtle background

English:
- Name: `Manuchehr Ghafforzoda`
- Title: `Data Analytics & AI Consultant`
- One-liner: `I help leaders and teams make better decisions with data. From collection to analysis to forecasting — I work with organizations at every stage.`
- CTA 1: `Get in touch` -> scroll to contact
- CTA 2: `Upcoming courses` -> scroll to courses

Russian:
- Name: `Манучехр Гаффорзода`
- Title: `Консультант по аналитике данных и ИИ`
- One-liner: `Я помогаю руководителям и командам принимать лучшие решения на основе данных. От сбора данных до анализа и прогнозирования — работаю с организациями на каждом этапе.`
- CTA 1: `Связаться` -> scroll to contact
- CTA 2: `Ближайшие курсы` -> scroll to courses

### Consulting
This is the main revenue-driving section. Do not bury it.

Heading:
- EN: `Data Consulting`
- RU: `Консалтинг в области данных`

Service blocks:
1. `Data Assessment & Audit` / `Аудит и оценка данных`
2. `Dashboards & Data Pipelines` / `Дашборды и пайплайны данных`
3. `AI Implementation` / `Внедрение ИИ`
4. `Team Training` / `Обучение команд`

Layout:
- 2x2 grid on desktop
- stacked on mobile

Closing line:
- EN: `From assessment to strategy — I help organizations understand where their data is, what's broken, and what to build next.`
- RU: `От аудита к стратегии — помогаю организациям понять, где находятся их данные, что не работает и что строить дальше.`

Client logos:
- World Bank
- GIZ
- Asian Development Bank
- Coca-Cola
- Megafon
- Tcell
- Abt Associates
- ACDI/VOCA

Footnote text:
- EN: `Projects funded by USAID • Government ministries of Tajikistan`
- RU: `Проекты, финансируемые USAID • Министерства Таджикистана`

CTA:
- EN: `Contact me`
- RU: `Связаться`

### About
Layout:
- two columns on desktop
- stacked on mobile
- text left, photo right on desktop

Proof points should be displayed visually, not buried in prose:
- `7+ years consulting`
- `800+ professionals trained`
- `90% client repeat rate`
- `10+ speaking engagements`
- `Published researcher (Rosa Luxemburg Stiftung)`

### Courses
Heading:
- EN: `Training & Courses`
- RU: `Обучение и курсы`

Featured course:
- `Cognitive Agents Masterclass`
- highlighted card treatment
- subtle terracotta tint background

Other courses:
- Data Analytics
- Power BI
- Excel for Business
- AI for Professionals
- Critical Thinking & Mental Models

Rules:
- Only one course should be featured at a time.
- Upcoming courses can render as simple list items with "Coming soon" state.

### Contact
Heading:
- EN: `Have a data challenge? Let's talk.`
- RU: `Есть задача, связанная с данными? Давайте обсудим.`

Form requirements:
- name required
- email required
- message required
- hidden honeypot field for spam protection
- no phone number field

Submit button:
- EN: `Send`
- RU: `Отправить`

## Architecture
If the site uses static files or framework equivalents, preserve this separation of concerns:
- repeating content in JSON data files
- images in image folders by purpose
- styles in CSS
- scripts in JS

Preferred structure:

```text
ghafforzoda.net/
├── index.html
├── data/
│   ├── clients.json
│   └── courses.json
├── images/
│   ├── hero/
│   ├── clients/
│   ├── about/
│   └── courses/
├── styles/
├── scripts/
└── README.md
```

Implementation rules:
- clients and courses should render from data files when that architecture exists
- use `visible` flags instead of deleting entries when practical
- preserve sort order fields when present
- avoid mixing content, styling, and behavior unnecessarily

## Data Rules

### Clients
Client data should support:
- `id`
- `name_en`
- `name_ru`
- `logo`
- `type`
- `visible`
- `order`

Behavior:
- `visible: false` means do not render
- `order` controls display order
- `type` may control footnote rendering

### Courses
Course data should support:
- `id`
- `name_en`
- `name_ru`
- `description_en`
- `description_ru`
- `featured`
- `status`
- `enrollment_date`
- `cta_en`
- `cta_ru`
- `cta_link`
- `format`
- `duration_hours`
- `visible`
- `order`

Rendering logic:
- `featured: true` -> render as large highlighted card
- non-featured + `status: enrolling` -> list item with CTA
- non-featured + `status: upcoming` -> list item with "Coming soon" label and no link
- `visible: false` -> do not render
- only one course should have `featured: true`

## Contact Form Integration
Preferred architecture:
- website form posts JSON to a Google Apps Script web app
- Apps Script writes to Google Sheets and sends an email notification
- no backend server is required for this form flow

Critical implementation notes:
- send requests with `Content-Type: text/plain`, not `application/json`, to avoid Apps Script CORS preflight
- keep the honeypot field hidden from humans and out of the tab order
- show a loading state during submission
- clear the form on success
- show a fallback error state on failure
- send the current document language with the form submission

## Language Toggle
- The toggle should appear as `EN | RU`.
- The active language should use the terracotta accent color.
- The inactive language should be gray.
- Switching language should update all visible content and relevant form placeholders.
- Keep `<html lang="en">` or `<html lang="ru">` in sync with the active language.

## Design Direction
The visual direction is:
- modern startup
- editorial
- clean
- confident
- spacious

It should feel closer to Anthropic or Figma than a generic template.

### Colors
Background:
- primary background: `#FAFAF8` or `#F7F6F3`

Text:
- primary text: `#1A1A1A`
- secondary text: `#6B6B6B`

Accent:
- primary accent: `#C2613A`
- hover/active: `#A8522F`
- featured card tint: `rgba(194, 97, 58, 0.06)` or `#FDF6F3`

Use the accent mainly for:
- filled CTA buttons
- outline CTA buttons
- link hover states
- active language state
- proof point numbers
- service block left borders
- a small number of restrained highlights

### Typography
Do not use:
- Inter
- Roboto
- Arial
- generic system font stacks as the primary design choice

Preferred headline families:
- Satoshi
- General Sans
- Cabinet Grotesk

Preferred body families:
- DM Sans
- Source Serif 4

Typography rules:
- body text must remain readable on mobile
- body text should be at least `16px` on mobile
- use generous spacing and strong hierarchy
- headlines should feel deliberate, not default

### Layout
- max content width: `1200px`
- use generous side margins
- use generous vertical spacing between sections
- do not make the layout feel cramped

Section layout expectations:
- hero: one or two columns
- consulting: 2x2 grid desktop, stacked mobile
- about: two columns desktop, stacked mobile
- proof points: horizontal row
- courses: featured card plus list
- contact: centered, max width around `480px`

### Navigation
- sticky top nav
- transparent over hero
- transitions to cream/white with subtle shadow on scroll
- name or logo on the left
- section links on the right
- language toggle on the far right
- mobile uses a hamburger and clean slide-in panel

### Micro-interactions
Keep interactions subtle:
- buttons slightly darken on hover and scale to about `1.02`
- links transition color on hover in about `300ms`
- sections fade in on scroll using `IntersectionObserver`, opacity, and `translateY`
- client logos go grayscale to color on hover
- form inputs shift border color to terracotta on focus
- nav background transition should be smooth on scroll

## Mobile Priorities
Assume most traffic is mobile.

Requirements:
- touch targets at least `44x44px`
- readable text without zooming
- hero text left-aligned, not centered
- service blocks stacked vertically
- client logos as horizontal scroll or 2x4 grid
- contact form full width with generous padding
- language toggle accessible in the mobile menu

## Performance
- vanilla HTML/CSS/JS is acceptable for this scope
- if using React or Next.js, prefer static generation when practical
- use WebP where possible
- lazy load images where appropriate
- preload only the main font weights needed
- target fast load times and avoid heavy animation libraries

## Anti-patterns
Do not introduce:
- purple or blue gradients on white
- rainbow palettes
- dark mode for v1
- generic stock photos
- heavy card shadows everywhere
- animated count-up widgets
- centered generic hero layouts
- testimonial carousels
- "trusted by" badge walls
- chat widgets
- parallax
- particle effects
- complex scroll animation libraries
- unnecessary 3D effects
