<script setup lang="ts">
const dialog = ref<HTMLDialogElement | null>(null)

const emit = defineEmits<{
  close: []
  open: []
}>()

function close() {
  if (dialog.value?.open) {
    dialog.value?.close()
  }
  document.documentElement.classList.remove("overflow-y-hidden")
  emit("close")
}

function open() {
  if (!dialog.value?.open) {
    dialog.value?.showModal()
  }
  document.documentElement.classList.add("overflow-y-hidden")
  emit("open")
}

onMounted(open)
</script>

<template>
  <dialog
    @close="close()"
    ref="dialog"
    class="p-3 rounded bg-white-a max-w-full w-1/3"
  >
    <div class="flex flex-col">
      <slot></slot>

      <slot name="buttons">
        <div class="flex justify-end">
          <app-button class="flex-none" @click="close()">Ok</app-button>
        </div>
      </slot>
    </div>
  </dialog>
</template>

<style lang="postcss">
dialog::backdrop {
  opacity: 0.5;
  background-color: var(--text);
}
</style>
