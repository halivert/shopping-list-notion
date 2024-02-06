<script setup lang="ts">
defineProps<{
  form?: string
}>()
</script>

<template>
  <button class="default-button" :form="form">
    <slot />
  </button>
</template>
