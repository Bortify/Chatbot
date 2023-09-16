/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Montserrat', 'sans-serif'],
        logo: ['Mooli', 'sans-serif'],
      },
      colors: {
        primary: '#2f2b54',
        secondary: '#3e3a64',
        accent: '#ff6c01',
      },
      fontSize: {
        xxs: '10px',
      },
    },
  },
  plugins: [],
}
