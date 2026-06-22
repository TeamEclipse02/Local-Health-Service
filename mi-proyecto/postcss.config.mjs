const postcssConfig = {
  plugins: {
    '@tailwindcss/postcss': {}, // <-- Aquí le agregamos el '@tailwindcss/' adelante
    'autoprefixer': {},
  },
};

export default postcssConfig;