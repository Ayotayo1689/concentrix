/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",
    "./node_modules/tw-elements/dist/js/**/*.js",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        // helvetica: ["HelveticaNowDisplay-Regular"],
        sans: ["Inter", "sans-serif", "Plus Jakarta Sans"],
      },
    },
  },
  plugins: [],
};
