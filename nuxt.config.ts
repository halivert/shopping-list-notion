import { defineNuxtConfig } from "nuxt"

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  runtimeConfig: {
    notionToken: process.env.NUXT_NOTION_TOKEN,
    notionSecret: process.env.NUXT_NOTION_SECRET,
    public: {
      notionClient: process.env.NUXT_NOTION_CLIENT,
      baseUrl: process.env.NUXT_BASE_URL,
      notionUrl: "https://api.notion.com/v1",
    },
  },
})
