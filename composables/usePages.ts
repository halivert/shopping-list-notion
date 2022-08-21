export const usePages = () => {
  const { data, pending } = useLazyFetch("/api/notion/root-pages")

  return { pages: data, pending }
}
