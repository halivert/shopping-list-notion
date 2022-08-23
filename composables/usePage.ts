export const usePage = (id: string) => {
  const { data: page, pending } = useLazyFetch(`/api/notion/pages/${id}`)

  return { page, pending }
}
