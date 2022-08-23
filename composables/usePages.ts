export const usePages = () => {
  const { data: pages, pending } = useLazyFetch("/api/notion/root-pages")

  return { pages, pending }
}
