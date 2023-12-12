<script setup lang="ts">
import { getCurrency } from "~/helpers/currency"

definePageMeta({ middleware: "auth" })

const { pages, pending } = usePages()

const getTotal = (pageId: string): number => {
  return Object.values(getSavedItems(pageId)).reduce(
    (a, { count, price }) => a + count * price,
    0,
  )
}

const getCount = (pageId: string): number => {
  return Object.values(getSavedItems(pageId)).filter(({ price }) => !!price)
    .length
}

const total = computed(
  () => pages.value?.reduce((a, page) => a + getTotal(page.id), 0) ?? 0,
)

const totalCount = computed(
  () => pages.value?.reduce((a, page) => a + getCount(page.id), 0) ?? 0,
)

function clearStorage(event: Event) {
  const button = event.target as HTMLButtonElement
  const form = button.closest("form")
  localStorage.clear()
  form?.submit()
}
</script>

<template>
  <NuxtLayout>
    <main class="h-screen p-2 flex flex-col flex-nowrap">
      <div class="flex-1">
        <header
          class="sticky top-0 pt-2 pb-1 bg-white-a flex items-center justify-around z-10 border-b-2 border-white-c -mx-2 px-2 gap-2 flex-col sm:flex-row"
        >
          <h1 class="text-3xl text-center">Selecciona una página</h1>

          <ClientOnly>
            <span class="self-end sm:self-center"
              >Total: {{ getCurrency(total) }} ({{ totalCount }})</span
            >
            <template #fallback>
              <span class="self-end sm:self-center">Total...</span>
            </template>
          </ClientOnly>
        </header>

        <ul
          v-if="pending"
          class="text-xl mt-20 flex flex-col flex-nowrap justify-around items-center gap-8"
        >
          <li>Cargando...</li>
        </ul>
        <ul
          v-else
          role="list"
          class="mt-10 flex flex-col flex-nowrap justify-around items-center gap-5"
        >
          <li v-for="page in pages">
            <NuxtLink
              class="text-2xl"
              :to="{ name: 'pages-id', params: { id: page.id } }"
            >
              {{ page.title }}
            </NuxtLink>
            <ClientOnly fallback-tag="p" fallback="Total...">
              <p v-if="getCount(page.id)">
                Total: {{ getCurrency(getTotal(page.id)) }} ({{
                  getCount(page.id)
                }})
              </p>
            </ClientOnly>
          </li>
          <li v-if="!pages?.length">¡Ups! no compartiste ninguna página</li>
        </ul>
      </div>

      <footer class="flex items-center justify-end">
        <form class="inline-block" method="POST" action="/api/logout">
          <app-button
            type="button"
            @click="clearStorage($event)"
            class="border border-white-c bg-white-b py-1 px-3"
          >
            Cerrar sesión
          </app-button>
        </form>
      </footer>
    </main>
  </NuxtLayout>
</template>
