import tailwindcssAnimate from 'tailwindcss-animate';

export default {
  content: ['./src/**/*.{html,js,tsx,cjs,mjs,ts}'],
  theme: {
    extend: {
      boxShadow: {
        inner:
          'shadow-[0_2px_4px_-2px_rgb(0,0,0,0.1)] shadow-[0_2px_4px_-2px_rgb(0,0,0,0.1)]',
        underline: 'shadow-[0_2px_4px_-2px_rgb(0,0,0,0.1)]',
      },
      fontFamily: {
        display: 'Oswald, ui-serif', // Adds a new `font-display` class
      },
    },
  },
  plugins: [tailwindcssAnimate],
  darkMode: 'class',
  safelist: [
    {
      pattern: /bg-+/,
    },
  ],
};
