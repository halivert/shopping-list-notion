<script setup lang="ts">
import { vInfiniteScroll } from "@vueuse/components"

definePageMeta({ middleware: "auth" })

const route = useRoute()
const hideChecked = ref(true)

const pageId = computed(() => route.params.id as string)

const {
  data,
  pending,
  refresh: refreshItems,
  loadMore: loadMoreItems,
} = useTodos(pageId)
const { page, refresh: refreshPage } = usePage(pageId)

const originalItems = computed(() => data.value?.results ?? [])

const items = computed(
  () =>
    (hideChecked.value
      ? originalItems.value?.filter((item) => !item.checked)
      : originalItems.value) ?? [],
)

const { totalFormated } = useTotal(items)

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
    return navigator.clipboard.writeText(text).then(() => myAlert("Copiado"))
}

const { newItem, pendingAdd, addItem } = useAddItems(
  `/api/notion/pages/${pageId.value}/items`,
)

const handleSubmit = (event: Event) => {
  const form = event.target as HTMLFormElement
  const formData = new FormData(form)

  const name = formData.get("name")?.toString()

  if (!name) {
    newItem.value = false
    return
  }

  addItem({ name, after: originalItems.value?.at(-1)?.id })
    .then((item) => {
      originalItems.value?.push(item)
    })
    .catch((error: Error) => myAlert(error.message))
}

const reset = () => {
  storedItems.reset()

  data.value?.results.forEach((result) => {
    result.lastPrice = result.price || result.lastPrice
    result.price = 0
  })

  myAlert("Elementos reiniciados")
}
</script>

<template>
  <div>
    <NuxtLayout :title="page?.title ?? 'Página...'">
      <main class="p-2 min-h-screen h-screen">
        <div v-if="pending" class="text-center text-xl font-semibold">
          Cargando...
        </div>
        <div v-else class="flex flex-col h-full">
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
            class="max-w-full overflow-y-scroll h-screen space-y-2 my-4 pt-1 overscroll-auto"
            v-infinite-scroll="[
              loadMoreItems,
              {
                canLoadMore: () => !!data?.has_more,
                interval: 500,
              },
            ]"
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
            <li>
              <app-button
                v-if="!newItem"
                class="w-full border-none underline"
                @click="newItem = true"
              >
                Nuevo elemento
              </app-button>
              <form v-else @submit.prevent="handleSubmit">
                <fieldset class="flex" :disabled="pendingAdd">
                  <input
                    class="bg-white-c px-1 py-0.5 text-lg rounded text-black w-full mx-2 my-1 disabled:cursor-not-allowed"
                    name="name"
                  />
                </fieldset>
              </form>
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
  </div>
</template>
