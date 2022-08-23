<script setup lang="ts">
import { NotionOAuthResponse } from "~~/types"
const route = useRoute()

const { baseUrl, notionSecret, notionClient, notionUrl } = useRuntimeConfig()

const { code } = route.query

const { href } = useLink({ to: { name: "login-callback" } })
const callbackUrl = new URL(href.value, baseUrl).href

const loginData = useLoginData()

const getAccessToken = async () => {
	if (!process.server) return

	const authHeader = Buffer.from(
		`${notionClient}:${notionSecret}`,
		"utf-8"
	).toString("base64")

	const options = {
		method: "POST",
		body: {
			grant_type: "authorization_code",
			code,
			redirect_uri: callbackUrl,
		},
		headers: {
			Authorization: `Basic ${authHeader}`,
			"Content-Type": "application/json",
		},
	}

	const { data } = await useFetch<NotionOAuthResponse>(
		`${notionUrl}/oauth/token`,
		options
	)

	if (!data.value?.access_token) {
		throw new Error("Error logging in, please try again.")
	}

	loginData.value = data.value
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
