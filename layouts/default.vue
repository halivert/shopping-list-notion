<script setup lang="ts">
const { title } = defineProps<{
  title?: string
}>()

useHead({
  title: title ?? "Lista de compras",
  link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.webp" }],
})
</script>

<template>
  <div class="default-layout">
    <slot />
  </div>
</template>
