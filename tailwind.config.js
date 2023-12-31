/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Open Sans', 'sans-serif'],
      body: ['Open Sans', 'sans-serif'],
    },
    extend: {
      fontSize: {
        14: '14px',
      },
      backgroundColor: {
        'main-bg': '#FAFBFB',
        'main-dark-bg': '#20232A',
        'secondary-dark-bg': '#33373E',
        'light-gray': '#F7F7F7',
        'half-transparent': 'rgba(0, 0, 0, 0.5)',
      },
      borderWidth: {
        1: '1px',
      },
      borderColor: {
        color: 'rgba(0, 0, 0, 0.1)',
        'dark-color': 'rgba(255, 255, 255, 0.1)',
      },
      colors: {
        accent: 'var(--accent)',
        'accent-secondary': 'var(--accentSecondary)',
      },
      width: {
        400: '400px',
        500: '500px',
        760: '760px',
        780: '780px',
        800: '800px',
        1000: '1000px',
        1200: '1200px',
        1400: '1400px',
      },
      height: {
        80: '80px',
      },
      minHeight: {
        590: '590px',
      },
      backgroundImage: {
        'hero-pattern': "url('/assets/images/welcome-bg.svg')",
      },
      flex: {
        2: '2 2 0%',
      },
      transitionProperty: {
        width: 'width',
      },
      zIndex: {
        max: 10000,
      },
      screens: {
        900: '900px',
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant('child', '& > *');
    },
  ],
  safelist: ['text-green-600', 'text-red-600'],
};
