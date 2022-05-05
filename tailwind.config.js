const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['src/**/*.{ts,tsx,js,jsx}', 'dist/**/*.{ts,tsx,js,jsx}', '**/*.html'],
  darkMode: 'class', // 'media', 'class' or false (to disable dark mode)
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        orange: colors.orange,
        'lighter-black': '#0a0e17',
      },
      borderRadius: {
        'circle': '50%',
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}