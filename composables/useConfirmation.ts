export const useConfirmation = () => {
  return {
    open(message: string) {
      const body = document.body

      console.log(message)
    },
  }
}
