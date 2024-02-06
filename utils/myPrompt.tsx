import { render } from "vue"
import Modal from "~/components/modal.vue"
import AppButton from "~/components/app-button.vue"
import type { InputTypeHTMLAttribute } from "nuxt/dist/app/compat/capi"

interface PromptOpts {
  defaultValue?: string
  inputType?: InputTypeHTMLAttribute
}

export default function (message?: string, opts?: PromptOpts): Promise<string> {
  const parent = document.createElement("div")

  document.documentElement.appendChild(parent)

  let resolve: (value: string | PromiseLike<string>) => void
  let reject: (reason?: any) => void

  const promise = new Promise<string>((internalResolve, internalReject) => {
    resolve = internalResolve
    reject = internalReject
  })

  const handleSubmit = (event: Event) => {
    const form = event.target as HTMLFormElement

    const formData = new FormData(form)

    resolve(formData.get("input")?.toString() ?? opts?.defaultValue ?? "")
  }

  const handleClose = () => {
    parent.remove()

    reject("Empty user input")
  }

  const modal = (
    <Modal onClose={handleClose} class="gap-1">
      {{
        default: () => (
          <form
            class="mb-3 space-y-1"
            onSubmit={handleSubmit}
            method="dialog"
            id="modalForm"
          >
            <p>{message}</p>

            <input
              class="bg-white-c px-1 py-0.5 text-lg rounded text-black w-full"
              name="input"
              type={opts?.inputType}
              value={opts?.defaultValue}
            />
          </form>
        ),
        buttons: () => (
          <div class="flex justify-end">
            <AppButton form="modalForm" class="default-button flex-none">
              Ok
            </AppButton>
          </div>
        ),
      }}
    </Modal>
  )

  render(modal, parent)

  return promise
}
