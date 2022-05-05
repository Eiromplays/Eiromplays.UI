const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  jit: true,
  content: ['src/**/*.{ts,tsx,js,jsx}', '**/*.html'],
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
  experimental: {
    optimizeUniversalDefaults: true
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [require('@tailwindcss/typography')],
}