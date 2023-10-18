// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };

const konstaConfig = require("konsta/config");

module.exports = konstaConfig({
  content: ["./src/**/*.vue", "./src/*.vue"],
  theme: {
    extend: {},
  },
  plugins: [],
});
