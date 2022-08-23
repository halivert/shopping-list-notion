import { Ref } from "vue"

export const usePage = (id: Ref<string>) => {
  const {
    data: page,
    pending,
    refresh,
  } = useLazyFetch(`/api/notion/pages/${id.value}`)

  return { page, pending, refresh }
}
