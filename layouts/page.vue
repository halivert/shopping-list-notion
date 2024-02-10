<script setup lang="ts">
const { title } = defineProps<{
  title: string
}>()

useHead({ title })

useSplitbee()
</script>

<template>
  <main class="page-layout space-y-3">
    <h1 class="text-2xl font-semibold">{{ title }}</h1>

    <slot />
  </main>
</template>
