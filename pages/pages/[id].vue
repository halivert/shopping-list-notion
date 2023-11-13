<script setup lang="ts">
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
  originalItems.value?.forEach((item) => {
    item.lastPrice = item.price
    item.price = 0
  })
}

const storedItems = useLocalStorage({
  items: originalItems,
  key: pageId,
})

onBeforeMount(() => {
  if (page.value?.id !== pageId.value) {
    refreshPage()
    refreshItems()
  }
})

onMounted(() => {
  storedItems.load()
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
</script>

<template>
  <NuxtLayout :title="page?.title ?? 'Página...'">
    <main class="p-2 min-h-screen">
      <div v-if="pending" class="text-center text-xl font-semibold">
        Cargando...
      </div>
      <div v-else>
        <h1 class="text-2xl font-semibold">{{ page?.title }}</h1>

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

        <ul
          role="list"
          class="max-w-full overflow-x-hidden space-y-2 my-4 pt-1"
        >
          <li v-for="item in items" :key="item.id">
            <list-item
              v-bind="item"
              v-model:price="item.price"
              v-model:count="item.count"
              @update:price="storedItems.save()"
              @update:count="storedItems.save()"
            >
              {{ item.text }}
            </list-item>
          </li>
        </ul>

        <div class="flex gap-3">
          <app-button @click="reset">Reiniciar</app-button>

          <app-button class="bg-green-a text-white-a" @click="copy">
            Copiar
          </app-button>
        </div>
      </div>
    </main>
  </NuxtLayout>
</template>
