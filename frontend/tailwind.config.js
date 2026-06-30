/**
 * Single source for the DESIGN.md token system (config-driven, no separate
 * stylesheets). Palette unchanged — terracotta/cream, theme-extension form.
 */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Accent — single-accent system (terracotta).
        accent: {
          primary: '#C2613A',
          soft: '#E89B72',
          pressed: '#A8522F',
        },
        // Surface — cream ramp.
        surface: {
          0: '#FBFAF4',
          1: '#F4F1E8',
          2: '#ECE8DC',
          3: '#E7E3D8',
          4: '#E2DCCD',
          inverse: '#2B2925',
          'inverse-deep': '#211F1B',
        },
        // Text — ink ramp.
        ink: {
          primary: '#14130F',
          secondary: '#5C584E',
          muted: '#8A857A',
          faint: '#A8A296',
          'on-dark': '#F4F1E8',
        },
        // Semantic — status only, never styling.
        semantic: {
          success: '#7FA86B',
          danger: '#A8322B',
        },
      },
      // Border tokens map to class-friendly names: border-default / border-strong.
      // The two dark-ground values are the workbook chrome's borders/dividers
      // (DESIGN.md additions: title bar, status footer, inverse surfaces).
      borderColor: {
        default: '#DCD7C7',
        strong: '#C9C3B0',
        'on-dark': '#44403A',
        'on-dark-strong': '#33302A',
      },
      fontFamily: {
        // Satoshi (display), DM Sans (body). JetBrains Mono is desktop-only and
        // loaded by the desktop tree, never on mobile.
        display: ['Satoshi', 'system-ui', 'sans-serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      // Six-step shared type scale.
      fontSize: {
        caption: ['12px', { lineHeight: '1.4' }],
        body: ['15px', { lineHeight: '1.5' }],
        lead: ['18px', { lineHeight: '1.45' }],
        subhead: ['24px', { lineHeight: '1.15' }],
        heading: ['38px', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        display: ['46px', { lineHeight: '1.0', letterSpacing: '-0.03em' }],
        // Desktop workbook dense mono scale (DESIGN.md desktop-only addendum) —
        // 10-13px, deliberately OUTSIDE the six-step shared scale, for grid / cell
        // / formula text only. Concrete values pinned within the addendum's 10-13px
        // range; never used on mobile or on non-workbook surfaces.
        'wb-xs': ['10px', { lineHeight: '1.3' }],
        'wb-sm': ['11px', { lineHeight: '1.35' }],
        wb: ['12px', { lineHeight: '1.4' }],
        'wb-lg': ['13px', { lineHeight: '1.4' }],
      },
      // Three weights only — 400 / 600 / 900.
      fontWeight: {
        normal: '400',
        semibold: '600',
        black: '900',
      },
      // Spacing: DESIGN.md is an 8px base with a 4px half-step — Tailwind's default
      // scale already lands on these (1=4px, 2=8px, ...), so no override is needed;
      // components keep all margin/padding/gap on this scale.
      //
      // Flat elevation everywhere (DESIGN.md): separate with borders + surface
      // steps, NOT shadows. The ONE allowed flat shadow is the terracotta
      // rule-accent — an inset border technique, not elevation. The desktop
      // workbook's expressive drop shadows are a later piece, not 003.
      boxShadow: {
        rule: 'inset 4px 0 0 0 #C2613A',
        // The ONE named expressive-elevation exception (DESIGN.md desktop-only
        // addendum): a deep soft drop on the workbook's floating panels ONLY.
        // Pinned within the addendum's 0 30-50px 80-110px rgba(0,0,0,0.4-0.7)
        // range. Flat elevation (borders/surface steps) still governs everywhere
        // else — do not apply this off the desktop workbook.
        workbook: '0 40px 90px rgba(0, 0, 0, 0.5)',
      },
      // Subtle, flat-consistent reveal-on-scroll. Applied only when an element
      // scrolls into view AND prefers-reduced-motion is not set (see ui/Reveal).
      keyframes: {
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'none' },
        },
      },
      animation: {
        reveal: 'reveal 500ms ease-out both',
      },
    },
  },
  plugins: [],
}
