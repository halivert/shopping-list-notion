<script setup lang="ts">
import { type Prices } from "~~/types"

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

const { totalFormated } = useTotal(items)

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

const confirmReset = () => {
  const shouldReset = confirm("Deseas reiniciar la lista?")
  if (shouldReset) {
    reset()
  }
}

const prices = useLocalStorage({
  items: originalItems,
  key: PRICE_KEY,
})

const lastPrices = useLocalStorage({
  items: originalItems,
  key: LAST_PRICE_KEY,
})

const count = useLocalStorage({
  items: originalItems,
  key: COUNT,
})

onBeforeMount(() => {
  if (page.value?.id !== pageId.value) {
    refreshPage()
    refreshItems()
  }
})

onMounted(() => {
  prices.load()
  count.load()
  lastPrices.load()
})

const copy = () => {
  const text = items.value
    ?.map((item) => {
      return [
        item.text,
        item.count || "",
        Number.isNaN(item.price) ? "" : item.price,
      ].join("\t")
    })
    .join("\n")

  if (text)
    return navigator.clipboard.writeText(text).then(() => alert("Copiado"))
}

useHead({
  title: computed(() => page.value?.title ?? "Página..."),
})
</script>

<template>
  <main class="p-2">
    <div v-if="pending">Cargando...</div>
    <div v-else>
      <h1>{{ page?.title }}</h1>

      <header
        class="text-xl sticky top-0 pt-2 pb-1 bg-white-a flex justify-between z-10 border-b-2 border-white-c -mx-2 px-2"
      >
        <span>Total: {{ totalFormated }}</span>
        <small>
          <label>
            Ocultar marcados
            <input type="checkbox" v-model="hideChecked" />
          </label>
        </small>
      </header>

      <ul role="list" class="max-w-full overflow-x-hidden space-y-2 my-4 pt-1">
        <li v-for="item in items" :key="item.id">
          <list-item
            v-bind="item"
            v-model:price="item.price"
            v-model:count="item.count"
            @update:price="prices.save()"
            @update:count="count.save()"
          >
            {{ item.text }}
          </list-item>
        </li>
      </ul>

      <div class="flex gap-3">
        <app-button @click="confirmReset">Reiniciar</app-button>

        <app-button class="bg-green-a text-white-a" @click="copy"
          >Copiar</app-button
        >
      </div>
    </div>
  </main>
</template>
