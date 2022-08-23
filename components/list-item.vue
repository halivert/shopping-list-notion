<script setup lang="ts">
const props = defineProps<{
	price: number
	checked: boolean
	lastPrice?: number
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
	<div :class="{ checked: checked }">
		<span><slot /></span>
		<input
			type="number"
			@input="emitChange"
			:value="price || null"
			:placeholder="lastPrice?.toString()"
		/>
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
	background-color: var(--background-b);
}

div span {
	flex: 3 1 auto;
}

div input {
	flex: 0 0 24%;
	min-width: 0;
	padding: 0.25em;
	margin: 0.125em;
	font-size: 1.25rem;
	background-color: var(--background-c);
	border: none;
	color: var(--text);
	border-radius: 4px;
}
</style>
