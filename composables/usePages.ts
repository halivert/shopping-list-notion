export const usePages = () => {
  const { data: pages, pending } = useFetch("/api/notion/root-pages", {
    headers: useRequestHeaders(["cookie"]),
  })

  return { pages, pending }
}
