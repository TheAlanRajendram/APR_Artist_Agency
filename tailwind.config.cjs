/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: '#d5ac5b',
        dark: {
          DEFAULT: '#0A0A0A',
          lighter: '#242424',
          card: '#2A2A2A',
          accent: '#333333'
        }
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        serif: ['Cormorant Infant', ...defaultTheme.fontFamily.serif],
        display: ['Cormorant Infant', ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(212, 175, 55, 0.1)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: 'none',
            a: {
              color: theme('colors.gold'),
              '&:hover': {
                color: theme('colors.gold'),
                opacity: '0.8',
              },
            },
            h1: {
              color: '#ffffff',
              fontFamily: theme('fontFamily.display'),
            },
            h2: {
              color: '#ffffff',
              fontFamily: theme('fontFamily.display'),
            },
            h3: {
              color: '#ffffff',
              fontFamily: theme('fontFamily.display'),
            },
            blockquote: {
              color: 'rgba(255, 255, 255, 0.8)',
              borderLeftColor: theme('colors.gold'),
            },
            strong: {
              color: '#ffffff',
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
