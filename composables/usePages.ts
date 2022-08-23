export const usePages = () => {
  const { data: pages, pending } = useLazyFetch("/api/notion/root-pages", {
    headers: useRequestHeaders(["cookie"]),
  })

  return { pages, pending }
}
