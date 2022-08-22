<script setup lang="ts">
const { pages, pending } = usePages()
</script>

<template>
	<main>
		<h1>Selecciona una página</h1>
		<ul v-if="!pending" role="list">
			<li v-for="page in pages">
				<NuxtLink :to="{ name: 'pages-id', params: { id: page.id } }">
					{{ page.title }}
				</NuxtLink>
			</li>
		</ul>
		<ul v-else>
			<li>Cargando...</li>
		</ul>
	</main>
</template>

<style scoped>
main {
	height: 100vh;
	padding: 0.5em;
}

h1 {
	text-align: center;
}

ul {
	list-style: none;
	padding: 0;
	margin: 0;
	display: flex;
	flex-flow: column nowrap;
	justify-content: space-around;
	align-items: center;
	min-height: 100%;
	gap: 1em;
}

a {
	text-decoration: none;
	font-size: 2rem;
	color: var(--accent);
}

a:hover {
	color: var(--accent-hover);
}
</style>
