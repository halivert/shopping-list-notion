/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./app.vue",
  ],
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
      height: {
        screen: "100dvh",
      },
      minHeight: {
        screen: "100dvh",
      },
    },
  },
}
