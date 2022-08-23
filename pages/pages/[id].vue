<script setup lang="ts">
import { Prices } from "~~/types"

const PRICE_KEY = "price"
const LAST_PRICE_KEY = "lastPrice"

const route = useRoute()
const hideChecked = ref(true)

const pageId = computed(() => route.params.id as string)

const {
	items: originalItems,
	pending,
	refresh: refreshItems,
} = useTodos(pageId)
const { page: selectedPage, refresh: refreshPage } = usePage(pageId)

useHead({
	title: computed(() => selectedPage.value?.title ?? "Página..."),
})

const items = computed(() =>
	hideChecked.value
		? originalItems.value.filter((item) => !item.checked)
		: originalItems.value
)

const { total, totalFormated, calculateTotal } = useTotal(items)

const reset = () => {
	const allZeros = originalItems.value.every((item) => !item.price)

	if (allZeros) {
		localStorage.removeItem(LAST_PRICE_KEY)

		originalItems.value.forEach((item) => (item.lastPrice = undefined))
	} else {
		const lastPrices: Prices = JSON.parse(
			localStorage.getItem(LAST_PRICE_KEY) ?? "{}"
		)

		originalItems.value.forEach((item) => {
			if (!item.price) return
			lastPrices[item.id] = item.price
			item.lastPrice = item.price
		})

		localStorage.setItem(LAST_PRICE_KEY, JSON.stringify(lastPrices))
	}

	originalItems.value.forEach((item) => {
		item.price = 0
	})

	calculateTotal()
}

const { open, confirmation, message, cancel, confirm } = useConfirmation({
	confirm: reset,
})

const confirmReset = () => open("Deseas reiniciar la lista?")

const prices = usePrice({
	items: originalItems,
	key: PRICE_KEY,
	onLoad: () => calculateTotal(),
})

const lastPrices = usePrice({
	items: originalItems,
	key: LAST_PRICE_KEY,
	onLoad: () => calculateTotal(),
})

onBeforeMount(() => {
	if (selectedPage.value?.id !== pageId.value) {
		refreshPage()
		refreshItems()
	}
})

onMounted(() => {
	prices.load()
	lastPrices.load()
})

watch(total, () => prices.save())
</script>

<template>
	<main>
		<div v-if="pending">Cargando...</div>
		<div v-else>
			<h1>{{ selectedPage?.title }}</h1>

			<header class="header">
				<span>Total: {{ totalFormated }}</span>
				<small>
					<label>
						Ocultar marcados
						<input
							type="checkbox"
							v-model="hideChecked"
							@change="calculateTotal"
						/>
					</label>
				</small>
			</header>

			<ul role="list">
				<li v-for="item in items" :key="item.id">
					<list-item
						v-bind="item"
						v-model:price="item.price"
						@update:price="calculateTotal"
					>
						{{ item.text }}
					</list-item>
				</li>
			</ul>

			<div class="buttons">
				<button @click="confirmReset">Reiniciar</button>
			</div>
		</div>

		<modal :open="confirmation">
			<div class="confirmation-modal">
				{{ message }}

				<div class="buttons">
					<button class="black" @click="cancel">Cancelar</button>
					<button @click="confirm">Confirmar</button>
				</div>
			</div>
		</modal>
	</main>
</template>

<style scoped>
main {
	padding: 0.5em;
}

h1,
ul,
header {
	padding: 0;
}

ul {
	max-width: 100%;
	overflow: hidden;
	list-style: none;
}

ul > :not(:last-of-type) {
	margin-bottom: 0.5em;
}

.header {
	font-size: 1.25rem;
	position: sticky;
	top: 0;
	padding-top: 0.5em;
	padding-bottom: 0.25em;
	display: block;
	background-color: var(--background);
	display: flex;
	justify-content: space-between;
	z-index: 1;
}

.buttons {
	display: flex;
}

.buttons button {
	flex: 1;
	font-size: 1rem;
	background-color: var(--background);
	color: var(--text);
	border: 1px solid var(--text);
	border-radius: 4px;
	padding: 0.25em 0.75em;
}

.confirmation-modal {
	display: flex;
	flex-flow: column nowrap;
	gap: 1em;
}

.confirmation-modal .buttons {
	justify-content: space-between;
}

.confirmation-modal .buttons button {
	flex: 0;
	font-size: 0.825em;
}

button.black {
	background-color: var(--text);
	color: var(--background);
}
</style>
