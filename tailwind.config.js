/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#202225',
        'dark-secondary': '#292b2f',
        'light-text': '#e5e7eb',
      },
      fontFamily: {
        'ubuntu': ['Ubuntu', 'sans-serif'],
      },
      spacing: {
        '7.5': '1.875rem', // 30px
      },
    },
  },
  plugins: [],
}
