export const useSelectedPage = (id?: string) =>
  useState("selectedPage", () => {
    const { pages } = usePages()

    return pages.value?.find((page) => page.id === id)
  })
