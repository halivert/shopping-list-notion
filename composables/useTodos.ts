import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  ToDoBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import { TodoItem } from "~~/types"

export const useTodos = (id: string) => {
  const { data, pending } = useLazyFetch<ListBlockChildrenResponse>(
    `/api/notion/pages/${id}/items`
  )

  const items = computed(
    () =>
      data.value?.results
        .filter((block: BlockObjectResponse) => block.type === "to_do")
        .map(
          (todo: ToDoBlockObjectResponse): TodoItem => ({
            id: todo.id,
            text: todo.to_do.rich_text[0].plain_text,
            checked: todo.to_do.checked,
            price: 0,
          })
        ) ?? []
  )

  return { items, pending }
}
