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
          DEFAULT: '#121212',
          lighter: '#1E1E1E',
          card: '#2A2A2A',
          accent: '#3F3F3F',
        },
      },
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
        serif: ['Cormorant Infant', ...defaultTheme.fontFamily.serif],
        display: ['Cormorant Infant', ...defaultTheme.fontFamily.sans],
      },
      textColor: {
        primary: '#E0E0E0',
        secondary: '#A0A0A0',
        'on-gold': '#121212',
        gold: '#d5ac5b',
      },
      boxShadow: {
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(212, 175, 55, 0.1)',
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            color: theme('textColor.primary'),
            maxWidth: 'none',
            a: {
              color: theme('colors.gold'),
              '&:hover': {
                color: theme('colors.gold'),
                opacity: '0.8',
              },
            },
            h1: {
              color: theme('colors.white', '#ffffff'),
              fontFamily: theme('fontFamily.display'),
            },
            h2: {
              color: theme('colors.white', '#ffffff'),
              fontFamily: theme('fontFamily.display'),
            },
            h3: {
              color: theme('colors.white', '#ffffff'),
              fontFamily: theme('fontFamily.display'),
            },
            h4: {
              color: theme('colors.white', '#ffffff'),
              fontFamily: theme('fontFamily.display'),
            },
            h5: {
              color: theme('colors.white', '#ffffff'),
              fontFamily: theme('fontFamily.display'),
            },
            h6: {
              color: theme('colors.white', '#ffffff'),
              fontFamily: theme('fontFamily.display'),
            },
            blockquote: {
              color: theme('textColor.secondary'),
              borderLeftColor: theme('colors.gold'),
            },
            strong: {
              color: theme('colors.white', '#ffffff'),
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
