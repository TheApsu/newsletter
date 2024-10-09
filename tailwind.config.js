/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontSize: {
      xs: '0.6rem',
      sm: '0.8rem',
      base: '.88rem',
      xl: '1.25rem',
      '2xl': '1.363rem',
      '3xl': '1.553rem',
      '4xl': '2.241rem',
      '5xl': '2.852rem',
    },
    extend: {
      colors: {
        fontColor: '#626262',
        primary: '#02a194',
        secondary: '#09bfb3',
        tertiary: '#09d8c8',
        contrastColor: '#fe6700',
      },
      fontFamily: {
        georgia: ['Georgia', 'serif'],
        corbel: ['Corbel', 'serif'],
      },
    },
  },
  plugins: [],
};
