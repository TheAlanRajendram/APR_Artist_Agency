/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        gold: '#ab8850',
        dark: {
          DEFAULT: '#0A0A0A',
          lighter: '#242424',
          card: '#2A2A2A',
          accent: '#333333'
        }
      },
      fontFamily: {
        sans: ['Montserrat', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.3), 0 1px 3px rgba(212, 175, 55, 0.1)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: 'rgba(255, 255, 255, 0.8)',
            maxWidth: 'none',
            a: {
              color: '#ab8850',
              '&:hover': {
                color: 'rgba(171, 136, 80, 0.8)',
              },
            },
            h1: {
              color: '#ffffff',
              fontFamily: 'Playfair Display, serif',
            },
            h2: {
              color: '#ffffff',
              fontFamily: 'Playfair Display, serif',
            },
            h3: {
              color: '#ffffff',
              fontFamily: 'Playfair Display, serif',
            },
            blockquote: {
              color: 'rgba(255, 255, 255, 0.8)',
              borderLeftColor: '#ab8850',
            },
            strong: {
              color: '#ffffff',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
