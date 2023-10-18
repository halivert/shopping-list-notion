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

const updateCount = (newCount: number) => {
  if (newCount <= 0) return
  emit("update:count", newCount)
}

const total = computed(() => {
  const total = props.count * props.price

  return Number.isNaN(total) ? 0 : total
})

const stringPrice = computed(() =>
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

  if (countInput instanceof HTMLInputElement) {
    const count = countInput.valueAsNumber

    if (Number.isNaN(count)) {
      return
    }

    updateCount(count)
    editCount.value = false
  }
}
</script>

<template>
  <div
    :class="[
      { checked: checked },
      'flex gap-5 max-w-full justify-between items-center flex-row flex-nowrap relative',
    ]"
  >
    <span class="flex-[3] shrink-0 basis-[30%]">
      <slot />
    </span>
    <div
      class="flex-1 basis-auto inline-flex min-w-0 justify-end gap-3 flex-col-reverse items-end px-0.5 sm:flex-row"
    >
      <div class="flex flex-1 items-center justify-end max-w-full self-stretch">
        <template v-if="!editCount">
          <button
            class="flex items-center justify-center h-6 w-6 rounded bg-white-c disabled:opacity-30 disabled:cursor-not-allowed"
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
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M18 12H6"
              />
            </svg>
          </button>
          <span
            class="px-3"
            @contextmenu.prevent="context(() => (editCount = true))"
          >
            {{ props.count }}
          </span>
          <button
            class="flex items-center justify-center h-6 w-6 rounded bg-green-b text-white-a"
            @click="updateCount(Math.floor(props.count + 1))"
            @contextmenu.prevent
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 6v12m6-6H6"
              />
            </svg>
          </button>
        </template>
        <form
          v-else
          class="max-w-full min-w-0 flex-[0_0_50%] flex"
          @submit.prevent="handleSubmit"
        >
          <input
            class="min-w-0 max-w-full bg-white-c px-1 py-0.5 text-lg rounded-l text-black"
            name="count"
            type="number"
            step="0.01"
            :value="props.count"
          />

          <button class="bg-green-a text-white-a rounded-r w-full px-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 12.75l6 6 9-13.5"
              />
            </svg>
          </button>
        </form>
      </div>
      <input
        class="flex-[0_0_40%] min-w-0 w-full bg-white-c px-1 py-0.5 text-lg rounded text-black"
        type="number"
        :placeholder="stringPrice"
        :value="props.price || null"
        @input="emitChange"
      />
    </div>

    <span
      v-if="total && props.count !== 1"
      class="absolute top-1 right-7 bg-white-a px-1 rounded"
      >{{ getCurrency(total) }}</span
    >
  </div>
</template>

<style lang="postcss">
div.checked span {
  @apply line-through;
}

div.checked input {
  background-color: var(--background-b);
}
</style>
