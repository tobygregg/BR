/** @type {import('tailwindcss').Config} */
// ─────────────────────────────────────────────────────────────
//  Bailiwick Refrigeration – Tailwind config
//  Brand colours live here. Change them once and rebuild:
//    npm install   (first time only)
//    npm run build
// ─────────────────────────────────────────────────────────────
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      // "short" = laptop screens that are wide but not very tall (e.g. 1280×720)
      screens: {
        short: { raw: '(min-width: 1024px) and (max-height: 820px)' },
      },
      colors: {
        // Deep navy – taken from the team uniforms
        navy: {
          950: '#06121f',
          900: '#0c2135',
          800: '#123049',
          700: '#1a405f',
          600: '#255579',
        },
        // Cold blue accent – the sky in the van photo
        ice: {
          50: '#f2f8fc',
          100: '#e3f0f9',
          200: '#c4e1f3',
          300: '#94c9ea',
          400: '#5aaadd',
          500: '#2f8cd0',
          600: '#1f6fb0',
          700: '#1b5a8f',
        },
        // Logo grey
        graphite: {
          400: '#8a8a8a',
          500: '#6b6b6b',
          600: '#5a5a5a',
          700: '#454545',
        },
      },
      fontFamily: {
        display: ['Oswald', '"Arial Narrow"', 'sans-serif'],
        sans: ['Manrope', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      letterSpacing: {
        logo: '0.22em',
      },
      boxShadow: {
        frost: '0 1px 2px rgba(12,33,53,.06), 0 12px 32px -12px rgba(12,33,53,.18)',
        lift: '0 2px 4px rgba(12,33,53,.06), 0 24px 48px -16px rgba(12,33,53,.28)',
      },
      keyframes: {
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        fall: {
          '0%': { transform: 'translate3d(0,-10vh,0) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translate3d(var(--drift,20px),105vh,0) rotate(180deg)', opacity: '0' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
        floaty: 'floaty 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
