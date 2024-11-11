import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: ['./src/**/*.{html,js,tsx,cjs,mjs,ts}'],
  theme: {
    extend: {},
  },
  plugins: [tailwindcssAnimate],
  darkMode: 'class',
  safelist: [
    {
      pattern: /bg-+/,
    },
  ],
};
