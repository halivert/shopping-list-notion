<script setup lang="ts">
defineProps<{
  title: string
}>()

const { production } = useRuntimeConfig()
</script>

<template>
  <NuxtLayout>
    <Head>
      <Title>{{ title }}</Title>
      <Script v-if="production" async src="https://cdn.splitbee.io/sb.js" />
    </Head>

    <main class="space-y-3">
      <h1 class="text-2xl font-semibold">{{ title }}</h1>

      <slot />
    </main>
  </NuxtLayout>
</template>
