<script setup lang="ts">
import { UseFetchOptions } from "nuxt/app"
import { NotionOAuthResponse } from "~~/types"
const route = useRoute()

const {
  public: { baseUrl, notionClient, notionUrl },
  notionSecret,
} = useRuntimeConfig()

const { code } = route.query

const { href } = useLink({ to: { name: "login-callback" } })
const callbackUrl = new URL(href.value, baseUrl).href

const loginData = useLoginData()

const getAccessToken = async () => {
  if (!process.server) return

  const authHeader = Buffer.from(
    `${notionClient}:${notionSecret}`,
    // notionSecret,
    "utf-8",
  ).toString("base64")

  const options: UseFetchOptions<NotionOAuthResponse> = {
    method: "POST",
    body: {
      grant_type: "authorization_code",
      code,
      redirect_uri: callbackUrl,
    },
    headers: {
      Authorization: `Bearer ${authHeader}`,
      "Content-Type": "application/json",
      "Notion-Version": "2022-06-28",
    },
  }

  console.log(options)

  const { data, error } = await useFetch<NotionOAuthResponse>(
    `${notionUrl}/databases/`,
    options,
  )

  console.log(error.value)

  if (!data.value?.access_token) {
    throw new Error("Error logging in, please try again.")
  }

  loginData && (loginData.value = data.value)
  return navigateTo({ name: "pages" })
}

getAccessToken()
</script>

<template>
  <main>
    <client-only>
      <h1>Algo salió mal, por favor intenta de nuevo</h1>
    </client-only>
  </main>
</template>
