const mode =
  process.env.NODE_ENV === 'development' ? 'development' : 'production';

module.exports = {
  content: ['./src/**/*.{js,liquid}'],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
};
