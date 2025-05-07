/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
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
      }
    },
  },
  plugins: [],
}
