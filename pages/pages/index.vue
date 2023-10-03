<script setup lang="ts">
const { pages, pending } = usePages()

definePageMeta({
  middleware: "auth",
})

useHead({
  title: "Lista de compras",
})
</script>

<template>
  <main class="h-[100dvh] p-2 flex flex-col flex-nowrap">
    <div class="flex-1">
      <h1 class="text-4xl text-center">Selecciona una página</h1>
      <ul
        v-if="!pending"
        role="list"
        class="mt-20 flex flex-col flex-nowrap justify-around items-center gap-8"
      >
        <li v-for="page in pages">
          <NuxtLink
            class="text-3xl"
            :to="{ name: 'pages-id', params: { id: page.id } }"
          >
            {{ page.title }}
          </NuxtLink>
        </li>
        <li v-if="!pages?.length">¡Ups! no compartiste ninguna página</li>
      </ul>
      <ul
        v-else
        class="text-xl mt-20 flex flex-col flex-nowrap justify-around items-center gap-8"
      >
        <li>Cargando...</li>
      </ul>
    </div>

    <footer class="flex items-center justify-end">
      <form class="inline-block" method="POST" action="/api/logout">
        <button
          class="border border-white-c bg-white-b text-black font-base rounded py-1 px-3"
        >
          Cerrar sesión
        </button>
      </form>
    </footer>
  </main>
</template>
