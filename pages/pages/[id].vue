<script setup lang="ts">
import { Prices } from "~~/types"

definePageMeta({ middleware: "auth" })

const route = useRoute()
const hideChecked = ref(true)

const pageId = computed(() => route.params.id as string)

const {
	items: originalItems,
	pending,
	refresh: refreshItems,
} = useTodos(pageId)
const { page, refresh: refreshPage } = usePage(pageId)

const items = computed(
	() =>
		(hideChecked.value
			? originalItems.value?.filter((item) => !item.checked)
			: originalItems.value) ?? [],
)

const { total, totalFormated } = useTotal(items)

const reset = () => {
	const allZeros = originalItems.value?.every((item) => !item.price)

	const lastPrices: Prices = JSON.parse(
		localStorage.getItem(LAST_PRICE_KEY) ?? "{}",
	)

	if (allZeros) {
		originalItems.value?.forEach((item) => {
			item.lastPrice = 0
			lastPrices[item.id] = 0
		})
	} else {
		originalItems.value?.forEach((item) => {
			if (!item.price) return
			item.lastPrice = item.price
			lastPrices[item.id] = item.price
		})
	}

	localStorage.setItem(LAST_PRICE_KEY, JSON.stringify(lastPrices))

	originalItems.value?.forEach((item) => {
		item.price = 0
	})
}

const { open, confirmation, message, cancel, confirm } = useConfirmation({
	confirm: reset,
})

const confirmReset = () => open("Deseas reiniciar la lista?")

const prices = usePrice({
	items: originalItems,
	key: PRICE_KEY,
})

const lastPrices = usePrice({
	items: originalItems,
	key: LAST_PRICE_KEY,
})

onBeforeMount(() => {
	if (page.value?.id !== pageId.value) {
		refreshPage()
		refreshItems()
	}
})

onMounted(() => {
	prices.load()
	lastPrices.load()
})

watch(total, () => prices.save())

useHead({
	title: page.value?.title ?? "Página...",
})
</script>

<template>
	<main class="p-2">
		<div v-if="pending">Cargando...</div>
		<div v-else>
			<h1>{{ page?.title }}</h1>

			<header class="text-xl sticky top-0 pt-2 pb-1 bg-white-a flex justify-between z-10">
				<span>Total: {{ totalFormated }}</span>
				<small>
					<label>
						Ocultar marcados
						<input type="checkbox" v-model="hideChecked" />
					</label>
				</small>
			</header>

			<ul role="list" class="max-w-full overflow-hidden space-y-2 my-4">
				<li v-for="item in items" :key="item.id">
					<list-item v-bind="item" v-model:price="item.price">
						{{ item.text }}
					</list-item>
				</li>
			</ul>

			<div class="flex">
				<app-button @click="confirmReset">Reiniciar</app-button>
			</div>
		</div>

		<modal :open="confirmation">
			<div class="flex flex-col flex-nowrap gap-2">
				{{ message }}

				<div class="flex justify-between">
					<app-button class="bg-black text-white-a flex-initial text-sm" @click="cancel">
						Cancelar
					</app-button>
					<app-button class="flex-initial text-sm" @click="confirm">Confirmar</app-button>
				</div>
			</div>
		</modal>
	</main>
</template>
