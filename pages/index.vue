<script setup lang="ts">
const { pages, pending } = usePages()
</script>

<template>
	<main>
		<ul v-if="!pending">
			<li v-for="page in pages">
				<NuxtLink :to="{ name: 'pages-id', params: { id: page.id } }">
					{{ page.title }}
				</NuxtLink>
			</li>
		</ul>
		<ul v-else>
			<li>Loading...</li>
		</ul>
	</main>
</template>
