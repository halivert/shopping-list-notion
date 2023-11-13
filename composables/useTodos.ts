import type {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  ToDoBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import { type Ref } from "vue"
import { type TodoItem } from "~~/types"

const transform = (data: ListBlockChildrenResponse): TodoItem[] =>
  data.results
    .filter((block): block is BlockObjectResponse =>
      Object.hasOwn(block, "type"),
    )
    .filter((block): block is ToDoBlockObjectResponse => "to_do" === block.type)
    .map(
      (todo): TodoItem => ({
        id: todo.id,
        text: todo.to_do.rich_text[0].plain_text,
        count: 1,
        checked: todo.to_do.checked,
        price: 0,
      }),
    ) ?? []

export const useTodos = (id: Ref<string>) => {
  const {
    data: items,
    pending,
    refresh,
  } = useLazyFetch(`/api/notion/pages/${id.value}/items`, {
    transform,
    headers: useRequestHeaders(["cookie"]),
  })

  return { items, pending, refresh }
}
