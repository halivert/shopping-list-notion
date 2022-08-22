<script setup lang="ts">
const route = useRoute()
const pageId = route.params.id as string

const { page: selectedPage } = usePage(pageId)

const { items: originalItems, pending } = useTodos(pageId)

const total = ref(0)

const totalFormated = computed(() =>
	new Intl.NumberFormat("es-MX", {
		style: "currency",
		currency: "MXN",
		currencyDisplay: "symbol",
	}).format(total.value)
)

const hideChecked = ref(true)

const items = computed(() =>
	hideChecked.value
		? originalItems.value.filter((item) => !item.checked)
		: originalItems.value
)

const calculateTotal = () => {
	total.value = items.value.reduce(
		(total, { price }) => (Number.isNaN(price) ? total : total + price),
		0
	)
}

const reset = () => {
	originalItems.value.forEach((item) => {
		item.price = 0
	})
	calculateTotal()
}

const { open, confirmation, message, cancel, confirm } = useConfirmation({
	confirm: reset,
})

const confirmReset = () => {
	open("Deseas reiniciar la lista?")
}
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
						:item="item"
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
