<script setup lang="ts">
defineProps<{
  title?: string
}>()
</script>

<template>
  <Head>
    <Title>{{ title ?? "Lista de compras" }}</Title>
    <Link rel="icon" type="image/x-icon" href="/favicon.webp" />
  </Head>

  <slot />
</template>
