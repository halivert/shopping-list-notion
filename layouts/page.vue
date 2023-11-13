<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<template>
  <main class="space-y-3">
    <Head>
      <Title>{{ title }}</Title>
    </Head>
    <h1 class="text-2xl font-semibold">{{ title }}</h1>

    <slot />
  </main>
</template>
