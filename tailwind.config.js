/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html", // Убедитесь, что указаны все HTML-файлы
    "./src/**/*.{js,ts,jsx,tsx}", // Укажите пути к исходным файлам (JS/TS/React)
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
