/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        theme_color: {
          light_blue: "#5dc7c2",
          blue : "#E6EFFC",
          font : "#2D3861",
          main : "#1E2734",
          dark_light : "#273241"
        },
      },
    },
  },
  plugins: [],
};
