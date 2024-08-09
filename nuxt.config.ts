export default defineNuxtConfig({
  modules: ["@vueuse/nuxt"],

  runtimeConfig: {
    notionSecret: process.env.NUXT_NOTION_SECRET,
    public: {
      notionClient: process.env.NUXT_NOTION_CLIENT,
      baseUrl: process.env.NUXT_BASE_URL,
      notionUrl: "https://api.notion.com/v1",
      production: process.env.NODE_ENV === "production",
    },
  },

  css: ["@/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  compatibilityDate: "2024-08-09",
})