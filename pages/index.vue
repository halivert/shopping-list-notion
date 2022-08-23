<script setup lang="ts">
import { urlBuilder } from "~~/helpers/url"

const { baseUrl, notionClient, notionUrl } = useRuntimeConfig()

const { href } = useLink({ to: { name: "login-callback" } })
const callbackUrl = new URL(href.value, baseUrl).href

const url = urlBuilder(`${notionUrl}/oauth/authorize`, {
	client_id: notionClient,
	redirect_uri: callbackUrl,
	response_type: "code",
	owner: "user",
})
</script>

<template>
	<main>
		<Head>
			<Title>Lista de compras</Title>
		</Head>

		<div>
			<h1>Lista de compras</h1>

			<p>
				Hola, aquí podrás utilizar tu lista de compras como una calculadora y
				también almacenar los precios anteriores con un solo toque*
			</p>

			<p>Aquí debe ir un vídeo que demuestre como se hace esto</p>

			<p>
				<a :href="url.href">Agregar a Notion</a>
			</p>

			<details>
				<summary>Nota: *</summary>
				<small
					>En realidad son dos toques, mira uno es para abrir un cuadro de
					diálogo y el otro es para confirmar, pero estás de acuerdo que si no
					confirmamos podríamos tener algunos errores, ¿verdad? entonces pues
					digamos que es un solo toque, el de confirmación.</small
				>
			</details>
		</div>
	</main>
</template>

<style scoped>
main {
	padding: 0 1em;
}
</style>
