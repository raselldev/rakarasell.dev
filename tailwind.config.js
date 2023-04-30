/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './app/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#334257',
        'secondary': '#EEEEEE',
        'accent': '#548CA8'
      },
      zIndex: {
        '1000':'1000'
      }
    }
  },
  plugins: [],
}
