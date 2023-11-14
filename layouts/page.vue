<script setup lang="ts">
defineProps<{
  title: string
}>()

const { production } = useRuntimeConfig()

useHead({
  script: [
    ...(production
      ? [{ async: true, src: "https://cdn.splitbee.io/sb.js" }]
      : []),
  ],
})
</script>

<template>
  <NuxtLayout>
    <Head>
      <Title>{{ title }}</Title>
    </Head>

    <main class="space-y-3">
      <h1 class="text-2xl font-semibold">{{ title }}</h1>

      <slot />
    </main>
  </NuxtLayout>
</template>
