const defaultTheme = require('tailwindcss/defaultTheme'); // Importa defaultTheme

export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Asegúrate de que las rutas estén correctas
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', ...defaultTheme.fontFamily.sans], // Usa defaultTheme correctamente
        poppins: ['Poppins', 'sans-serif'], // Asegúrate de no duplicar claves
      },
      colors: {
        primary: '#00040f',
        secondary: '#00f6ff',
        dimWhite: 'rgba(255, 255, 255, 0.7)',
        dimBlue: 'rgba(9, 151, 124, 0.1)',
      },
    },
    screens: {
      xs: '480px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
      '3xl': '1920px',
    },
  },
  plugins: [],
};
