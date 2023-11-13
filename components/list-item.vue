<script setup lang="ts">
import { getCurrency } from "~~/helpers/currency"

const props = defineProps<{
  checked: boolean
  price: number
  count: number
  lastPrice?: number
}>()

const emit = defineEmits<{
  "update:price": [price: number]
  "update:count": [count: number]
}>()

const updatePrice = (event: Event) => {
  const target = event.target as HTMLInputElement
  emit("update:price", target.valueAsNumber)
}

const updateCount = (newCount: number) => {
  if (newCount <= 0) return
  emit("update:count", newCount)
}

const total = computed(() => {
  const total = props.count * props.price

  return Number.isNaN(total) ? 0 : total
})

const lastPriceFormatted = computed(() =>
  props.lastPrice ? getCurrency(props.lastPrice) : "",
)

const editCount = ref(false)

const context = (fn?: () => void) => {
  navigator.vibrate([100, 100, 150])

  fn?.()
}

const handleSubmit = (e: Event) => {
  const form = e.target as HTMLFormElement
  const countInput = form.elements.namedItem("count")

  if (!(countInput instanceof HTMLInputElement)) {
    return
  }

  const count = countInput.valueAsNumber

  if (Number.isNaN(count)) {
    return
  }

  updateCount(count)
  editCount.value = false
}
</script>

<template>
  <div :class="[{ checked: checked }, 'flex gap-5 flex-nowrap items-start']">
    <span class="basis-2/6 shrink-0 slot">
      <slot />
    </span>
    <div class="flex-1 flex gap-3 px-0.5 flex-wrap-reverse justify-end">
      <div
        v-if="!editCount"
        class="flex items-center justify-between w-1/2 sm:w-1/3"
      >
        <button
          class="h-6 w-6 rounded bg-white-c disabled:opacity-30 disabled:cursor-not-allowed p-0.5"
          @click="updateCount(Math.ceil(props.count - 1))"
          @contextmenu.prevent="context(() => updateCount(1))"
          :disabled="props.count === 1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mx-auto"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
          </svg>
        </button>
        <span
          class="px-3"
          @contextmenu.prevent="context(() => (editCount = true))"
        >
          {{ props.count }}
        </span>
        <button
          class="h-6 w-6 rounded bg-green-b text-white-a p-0.5"
          @click="updateCount(Math.floor(props.count + 1))"
          @contextmenu.prevent
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="mx-auto"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M12 6v12m6-6H6"
            />
          </svg>
        </button>
      </div>
      <form v-else @submit.prevent="handleSubmit" class="w-1/2 sm:w-1/3">
        <input
          class="bg-white-c px-1 py-0.5 text-lg rounded text-black w-full"
          name="count"
          type="number"
          step="0.01"
          :value="props.count"
        />
      </form>
      <div class="relative">
        <input
          class="bg-white-c px-1 py-0.5 text-lg rounded text-black w-full"
          type="number"
          :placeholder="lastPriceFormatted"
          :value="props.price || null"
          @input="updatePrice"
        />

        <span
          v-if="total && props.count !== 1"
          class="absolute top-1 right-7 bg-white-a px-1 rounded"
          >{{ getCurrency(total) }}</span
        >
      </div>
    </div>
  </div>
</template>

<style lang="postcss">
div.checked span.slot {
  @apply line-through;
}

div.checked input {
  background-color: var(--background-b);
}
</style>
