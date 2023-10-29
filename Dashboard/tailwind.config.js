/** @type {import('tailwindcss').Config} */
module.exports = {
  important: true,
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './containers/**/*.{js,ts,jsx,tsx,mdx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: '10px',
      },
      maxWidth: {
        container: '1400px',
      },
      maxHeight: {
        container: '600px',
      },
    },
    fontFamily: {
      poppins: 'var(--font-poppins)',
      manrope: 'var(--font-manrope)',
      nunito: 'var(--font-nunito)',
    },
  },
  daisyui: {
    themes: ['light'],
  },
  plugins: [require('daisyui')],
}
