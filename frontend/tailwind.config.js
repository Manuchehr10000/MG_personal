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
      borderColor: {
        default: '#DCD7C7',
        strong: '#C9C3B0',
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
      },
      // Three weights only — 400 / 600 / 900.
      fontWeight: {
        normal: '400',
        semibold: '600',
        black: '900',
      },
    },
  },
  plugins: [],
}
