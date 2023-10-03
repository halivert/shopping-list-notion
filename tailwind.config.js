/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./components/**/*.{js,vue,ts}", "./pages/**/*.vue", "./app.vue"],
  theme: {
    extend: {
      colors: {
        black: "var(--text)",
        white: {
          a: "var(--background)",
          b: "var(--background-b)",
          c: "var(--background-c)",
        },
        green: {
          a: "var(--accent)",
          b: "var(--accent-hover)",
        },
      },
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("initial", "html :where(&)")
    },
  ],
}
