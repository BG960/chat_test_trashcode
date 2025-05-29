/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
   theme: {
    extend: {
      // Добавляем кастомные стили для Markdown превью
      typography: {
        invert: {
          css: {
            color: 'white',
            a: { color: '#3b82f6' },
            strong: { color: 'white' },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Для стилизации Markdown
  ],
}
