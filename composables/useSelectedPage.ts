export const useSelectedPage = (id?: string) => {
  const selectedPage = useState("selectedPage", () => {
    const { pages } = usePages()

    return pages.value?.find((page) => page.id === id)
  })

  if (selectedPage.value && selectedPage.value.id !== id) {
    const { pages } = usePages()
    selectedPage.value = pages.value?.find((page) => page.id === id)
  }

  return selectedPage
}
