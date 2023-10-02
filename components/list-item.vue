<script setup lang="ts">
import { getCurrency } from "~~/helpers/currency"

const props = defineProps<{
  price: number
  checked: boolean
  lastPrice?: number
}>()

const emit = defineEmits<{
  "update:price": [price: number]
}>()

const emitChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit("update:price", target.valueAsNumber)
}

const stringPrice = computed(() =>
  props.lastPrice ? getCurrency(props.lastPrice) : "",
)
</script>

<template>
  <div
    :class="[
      { checked: checked },
      'flex gap-4 max-w-full justify-between items-center flex-row flex-nowrap',
    ]"
  >
    <span class="flex-[3_1_auto]"><slot /></span>
    <input
      class="price-input flex-[0_0_24%]"
      type="number"
      :placeholder="stringPrice"
      :value="props.price || null"
      @input="emitChange"
    />
  </div>
</template>

<style scoped>
div.checked span {
  @apply line-through;
}

div.checked input {
  background-color: var(--background-b);
}

div input {
  min-width: 0;
  padding: 0.25em;
  margin: 0.125em;
  font-size: 1.25rem;
  background-color: var(--background-c);
  border: none;
  color: var(--text);
  border-radius: 4px;
}
</style>
