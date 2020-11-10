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
  },
  variants: {},
  plugins: [require('@tailwindcss/typography')],
};
