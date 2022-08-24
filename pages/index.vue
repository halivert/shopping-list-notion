<script setup lang="ts">
import { urlBuilder } from "~~/helpers/url"

definePageMeta({ middleware: "guest" })

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
				<a :href="url.href" class="notion-login">
					<span> Agregar a Notion </span>
					<svg
						height="30"
						viewBox="0 0 30 30"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M1.805 1.294l16.6-1.226c2.039-.175 2.563-.057 3.845.875l5.299 3.733c.874.642 1.165.817 1.165 1.516v20.473c0 1.283-.466 2.042-2.097 2.158L7.34 29.99c-1.224.058-1.807-.117-2.448-.934L.99 23.982c-.7-.934-.99-1.633-.99-2.45V3.334c0-1.049.466-1.924 1.805-2.04z"
							fill="#fff"
						></path>
						<path
							fill-rule="evenodd"
							clip-rule="evenodd"
							d="M18.405.068l-16.6 1.226C.466 1.41 0 2.285 0 3.334v18.198c0 .817.29 1.516.99 2.45l3.902 5.074c.641.817 1.224.992 2.448.934l19.277-1.167c1.63-.116 2.097-.875 2.097-2.158V6.192c0-.663-.262-.854-1.033-1.42a85.473 85.473 0 01-.133-.096L22.25.943c-1.282-.932-1.806-1.05-3.845-.875zM7.776 5.857c-1.574.106-1.931.13-2.825-.597L2.678 3.452c-.231-.234-.115-.526.467-.584l15.958-1.166c1.34-.117 2.038.35 2.562.758l2.737 1.983c.117.059.408.408.058.408l-16.48.992-.204.014zM5.941 26.49V9.11c0-.759.233-1.109.931-1.168L25.8 6.834c.642-.058.932.35.932 1.108v17.264c0 .759-.117 1.401-1.165 1.459l-18.113 1.05c-1.048.058-1.513-.291-1.513-1.225zm17.88-16.448c.116.525 0 1.05-.525 1.11l-.873.173v12.832c-.758.408-1.456.641-2.039.641-.932 0-1.165-.292-1.863-1.166l-5.709-8.982v8.69l1.806.409s0 1.05-1.457 1.05l-4.017.233c-.117-.234 0-.817.407-.933l1.049-.291v-11.49L9.144 12.2c-.117-.525.174-1.283.99-1.342l4.31-.29 5.94 9.098v-8.049l-1.514-.174c-.117-.643.349-1.11.931-1.167l4.02-.234z"
							fill="#000"
						></path>
					</svg>
				</a>
			</p>

			<section>
				<h2>Instrucciones</h2>

				<div>
					Para utilizar esta integración, debes tener una página de
					<a href="https://notion.so">Notion</a> con una lista de tareas (To-do
					List)

					<p>
						<img src="/img/to-do-list.webp" alt="Lista de tareas" />
					</p>

					Después puedes seleccionarla cuando te pregunte por que páginas deseas
					elegir.

					<p>
						<img src="/img/select-page.webp" alt="Seleccionar página deseada" />
					</p>

					Así tendrás la lista de tareas con una casilla a un lado donde podrás
					escribir el precio que te costó.

					<p>
						<img
							src="/img/example-list.webp"
							alt="Lista de ejemplo, con cuadros de texto"
						/>
					</p>

					<p>
						Cuando le pongas reiniciar, se guardará el precio anterior y
						aparecerá en el fondo de la casilla, y si le pones reiniciar sin
						escribir ningún precio, se borrarán los precios anteriores.
					</p>

					<p>Espero que sea de utilidad para ti 💖</p>
				</div>
			</section>

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
.notion-login {
	display: inline-flex;
	gap: 1em;
	border: 1px solid var(--accent);
	background-color: var(--background-c);
	border-radius: 4px;
	align-items: center;
	padding: 0.25em 0.5em;
	text-align: center;
}

.notion-login:hover {
	background-color: var(--background-b);
}

.notion-login:hover {
	color: var(--accent);
}
</style>
