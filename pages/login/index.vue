<script setup lang="ts">
import { urlBuilder } from "~/helpers/url"

const {
	public: { notionClient, notionUrl, baseUrl },
} = useRuntimeConfig()

const { href } = useLink({ to: { name: "login-callback" } })
const callbackUrl = new URL(href.value, baseUrl).href

const url = urlBuilder(`${notionUrl}/oauth/authorize`, {
	client_id: notionClient,
	redirect_uri: callbackUrl,
	response_type: "code",
	owner: "user",
})

if (process.client) {
	window.location.href = url.href
}
</script>

<template>
	<main>

		<Head>
			<Title>Iniciar sesión</Title>
		</Head>
	</main>
</template>

<style scoped></style>
