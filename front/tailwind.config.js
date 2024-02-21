/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,jsx}'],
  important: '#root',
  theme: {
    fontFamily: {
      sans: ['system-ui', 'sans-serif'],
      chelsea: ['Chelsea-Market', 'cursive'],
    },
    // https://coolors.co/eee3d6-c55d38-568a3f-394b38
    colors: {
      'pearl-bush': {
        50: '#faf6f2',
        100: '#eee3d6', // Almond
        200: '#e5d4c3',
        300: '#d5b79c',
        400: '#c39674',
        500: '#b67c59',
        600: '#a96a4d',
        700: '#8d5541',
        800: '#72463a',
        900: '#5d3b31',
        950: '#311d19',
      },
      tuscany: {
        50: '#fcf6f0',
        100: '#f7eadd',
        200: '#eed2ba',
        300: '#e3b28e',
        400: '#d68d61',
        500: '#ce7041',
        600: '#c55d38', // Jasper
        700: '#9f472f',
        800: '#803a2c',
        900: '#683226',
        950: '#381812',
      },
      'hippie-green': {
        50: '#f1f8ed',
        100: '#e1eed9',
        200: '#c6dfb7',
        300: '#a2ca8c',
        400: '#81b467',
        500: '#639949',
        600: '#568a3f', // Forest Green
        700: '#3c5d2e',
        800: '#324c28',
        900: '#2d4126',
        950: '#152211',
      },
      'cabbage-pont': {
        50: '#f3f6f3',
        100: '#e4e9e2',
        200: '#cad3c7',
        300: '#a5b4a1',
        400: '#7a9077',
        500: '#5a7257',
        600: '#445942',
        700: '#394b38', // Feldgrau
        800: '#2c392c',
        900: '#243024',
        950: '#141a14',
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newUtilities = {
        '.custom-transparent-bg': {
          backgroundColor: 'transparent',
        },
      };
      addUtilities(newUtilities, ['responsive', 'hover']);
    },
  ],
  corePlugins: {
    preflight: false,
  },
};
