<script setup lang="ts">
const route = useRoute()

const {
  public: { baseUrl, notionClient },
  notionSecret,
} = useRuntimeConfig()

const { code } = route.query

const { href } = useLink({ to: { name: "login-callback" } })
const callbackUrl = new URL(href.value, baseUrl).href

const loginData = useLoginData()
const notion = useNotion(notionSecret)

if (process.server) {
  const response = await notion.oauth.token({
    client_id: notionClient,
    client_secret: notionSecret,
    code: code?.toString() ?? "",
    grant_type: "authorization_code",
    redirect_uri: callbackUrl,
  })

  if (!response.access_token) {
    throw new Error("Error on login")
  }

  loginData.value = response
  navigateTo({ name: "pages" })
}
</script>

<template>
  <main>
    <client-only>
      <h1>Algo salió mal, por favor intenta de nuevo</h1>
    </client-only>
  </main>
</template>
