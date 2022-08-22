<script setup lang="ts">
defineProps<{
	price: number,
	item: {
		text: string
		checked: boolean
	}
}>()

const emit = defineEmits<{
	(e: "update:price", price: number): void
}>()

const emitChange = (event: InputEvent) => {
	const target = event.target as HTMLInputElement
	emit("update:price", target.valueAsNumber)
}
</script>

<template>
	<div :class="{ checked: item.checked }">
		<span><slot /></span>
		<input type="number" @input="emitChange" :value="price || null" />
	</div>
</template>

<style scoped>
div {
	display: flex;
	flex-flow: row nowrap;
	gap: 1em;
	max-width: 100%;
	justify-content: space-between;
	align-items: center;
}

div.checked span {
	text-decoration: line-through;
}

div.checked input {
	filter: brightness(95%);
}

div span {
	flex: 3 1 auto;
}

div input {
	flex: 0 0 24%;
	min-width: 0;
	padding: 0.25em;
	font-size: 1.25rem;
	outline: none;
	border: 1px solid var(--text);
	background-color: var(--background);
	color: var(--text);
	border-radius: 4px;
}
</style>
