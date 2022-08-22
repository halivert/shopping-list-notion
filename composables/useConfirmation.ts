interface ConfirmationProps {
  confirm?: () => void
  cancel?: () => void
}

export const useConfirmation = ({
  confirm: confirmCallback,
  cancel: cancelCallback,
}: ConfirmationProps = {}) => {
  const confirmation = ref(false)
  const message = ref("")

  const open = (newMessage: string) => {
    confirmation.value = true
    message.value = newMessage
  }

  const close = () => {
    confirmation.value = false
    message.value = ""
  }

  return {
    confirmation,
    message,
    open,
    close,
    confirm() {
      confirmCallback?.()
      close()
    },
    cancel() {
      cancelCallback?.()
      close()
    },
  }
}
