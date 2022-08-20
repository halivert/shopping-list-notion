<script setup lang="ts">
const { data: pages, pending } = useLazyFetch("/api/notion/root-pages")

const selectedPage = useState("selectedPage", () => "")
</script>

<template>
	<main>
		<strong>Selected page: {{ selectedPage }}</strong>

		<ul v-if="!pending">
			<li v-for="page in pages">{{ page }}</li>
		</ul>
		<ul v-else>
			<li>Loading...</li>
		</ul>
	</main>
</template>
