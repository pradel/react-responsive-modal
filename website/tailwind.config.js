module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
    },
    typography: {
      default: {
        css: {
          'code::before': {
            content: '',
          },
          'code::after': {
            content: '',
          },
        },
      },
    },
    extend: {
      colors: {
        watermelon: '#FD4659',
      },
    },
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
