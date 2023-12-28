import { createVNode, render } from "vue"
import Modal from "~/components/modal.vue"

export default function (message?: string) {
  const parent = document.createElement("div")

  document.documentElement.appendChild(parent)

  const modal = createVNode(
    Modal,
    {
      onClose: () => {
        parent.remove()
      },
    },
    () => [message ?? ''],
  )

  render(modal, parent)
}
