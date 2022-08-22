export const usePage = (id: string) => {
  const { data, pending } = useLazyFetch(`/api/notion/pages/${id}`)

  return { page: data, pending }
}
