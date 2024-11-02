/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,tsx,cjs,mjs,ts}'],
  theme: {
    extend: {},
  },
  plugins: [require('tailwindcss-animate')],
  darkMode: 'class',
  safelist: [
    {
      pattern: /bg-+/,
    },
    {
      pattern: /text-+/,
    },
  ],
};
