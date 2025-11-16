/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Courier New', 'Courier', 'Lucida Console', 'Monaco', 'monospace'],
      },
      colors: {
        cta: '#006F72',
        app: '#FEFEFF',
        table: '#F9F9F8',
        filter: '#F4F5F4',
      },
    },
  },
  plugins: [],
}

