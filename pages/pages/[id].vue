<script setup lang="ts">
import {
	BlockObjectResponse,
	ListBlockChildrenResponse,
	ToDoBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"

const route = useRoute()
const pageId = route.params.id

const { data: items, pending } = useLazyFetch<ListBlockChildrenResponse>(
	`/api/notion/pages/${pageId}/items`
)

const to_dos = computed(() =>
	items.value.results
		.filter((block: BlockObjectResponse) => block.type === "to_do")
		.map((todo: ToDoBlockObjectResponse) => ({
			text: todo.to_do.rich_text[0].plain_text,
			checked: todo.to_do.checked,
		}))
)
</script>

<template>
	<div>
		<div v-if="pending">Loading...</div>
		<div v-else>
			<h1>Selected page:</h1>

			<ul>
				<li v-for="item in to_dos" :class="{ checked: item.checked }">
					{{ item.text }}
				</li>
			</ul>
		</div>
	</div>
</template>

<style scoped>
.checked {
	text-decoration: line-through;
}
</style>
