import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  ToDoBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"

export const useTodos = (id: string) => {
  const { data: items, pending } = useLazyFetch<ListBlockChildrenResponse>(
    `/api/notion/pages/${id}/items`
  )

  return {
    items: computed(() =>
      items.value.results
        .filter((block: BlockObjectResponse) => block.type === "to_do")
        .map((todo: ToDoBlockObjectResponse) => ({
          id: todo.id,
          text: todo.to_do.rich_text[0].plain_text,
          checked: todo.to_do.checked,
          price: 0
        }))
    ),
    pending,
  }
}
