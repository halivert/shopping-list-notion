<script setup lang="ts">
import { getCurrency } from "~~/helpers/currency"

const props = defineProps<{
  price: number
  checked: boolean
  count: number
  lastPrice?: number
}>()

const emit = defineEmits<{
  "update:price": [price: number]
  "update:count": [count: number]
}>()

const emitChange = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit("update:price", target.valueAsNumber)
}

const updateCount = (num: number) => {
  if (props.count + num < 1) return
  emit("update:count", props.count + num)
}

const total = computed(() => {
  const total = props.count * props.price

  return Number.isNaN(total) ? 0 : total
})

const stringPrice = computed(() =>
  props.lastPrice ? getCurrency(props.lastPrice) : "",
)
</script>

<template>
  <div
    :class="[
      { checked: checked },
      'flex gap-5 max-w-full justify-between items-center flex-row flex-nowrap relative',
    ]"
  >
    <span class="flex-[3_1_auto]">
      <slot />
    </span>
    <div
      class="flex-[0_0_50%] inline-flex min-w-0 justify-end gap-3 flex-col-reverse items-end px-0.5 sm:flex-[0_0_60%] sm:flex-row"
    >
      <div class="flex items-center gap-3">
        <button
          class="flex items-center justify-center h-6 w-6 rounded bg-white-c disabled:opacity-30 disabled:cursor-not-allowed"
          @click="updateCount(-1)"
          @contextmenu.prevent="updateCount(-props.count + 1)"
          :disabled="props.count === 1"
        >
          -
        </button>
        {{ props.count }}
        <button
          class="flex items-center justify-center h-6 w-6 rounded bg-green-b text-white-a"
          @click="updateCount(1)"
          @contextmenu.prevent
        >
          +
        </button>
      </div>
      <input
        class="flex-[0_0_50%] min-w-0 w-full bg-white-c px-1 py-0.5 text-lg rounded text-black"
        type="number"
        :placeholder="stringPrice"
        :value="props.price || null"
        @input="emitChange"
      />
    </div>

    <span
      v-if="total && props.count > 1"
      class="absolute top-1 right-6 bg-white-a px-1 rounded"
      >{{ getCurrency(total) }}</span
    >
  </div>
</template>

<style scoped lang="postcss">
div.checked span {
  @apply line-through;
}

div.checked input {
  background-color: var(--background-b);
}
</style>
