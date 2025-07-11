module.exports = {
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
