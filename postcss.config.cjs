module.exports = {
  plugins: {
    tailwindcss: {
      content: ['./index.html', './src.tsx'],
      corePlugins: { preflight: false },
    },
  },
};

