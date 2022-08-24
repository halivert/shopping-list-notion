<script setup lang="ts">
const { pages, pending } = usePages()

definePageMeta({
	middleware: "auth",
})
</script>

<template>
	<main>
		<Head>
			<Title>Lista de compras</Title>
		</Head>

		<div class="pages">
			<h1>Selecciona una página</h1>
			<ul v-if="!pending" role="list">
				<li v-for="page in pages">
					<NuxtLink :to="{ name: 'pages-id', params: { id: page.id } }">
						{{ page.title }}
					</NuxtLink>
				</li>
				<li v-if="!pages.length">
					¡Ups! no compartiste ninguna página
				</li>
			</ul>
			<ul v-else>
				<li>Cargando...</li>
			</ul>
		</div>

		<footer class="footer">
			<form method="POST" action="/api/logout">
				<button>Cerrar sesión</button>
			</form>
		</footer>
	</main>
</template>

<style scoped>
main {
	height: 100vh;
	padding: 0.5em;
	display: flex;
	flex-flow: column nowrap;
}

.pages {
	flex: 1;
}

.footer {
	display: flex;
	align-items: center;
	justify-content: flex-end;
}

.footer form {
	display: inline-block;
}

.footer button {
	border: 1px solid var(--background-c);
	background-color: var(--background-b);
	color: var(--text);
	font-size: 1rem;
	border-radius: 4px;
	padding: 0.25em 0.75em;
}

h1 {
	text-align: center;
}

ul {
	list-style: none;
	padding: 0;
	margin-top: 5em;
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-around;
	align-items: center;
	gap: 2em;
}

a {
	font-size: 2rem;
}
</style>
