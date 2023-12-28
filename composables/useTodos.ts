import type {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  ToDoBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import { type Ref } from "vue"
import { type TodoItem } from "~~/types"

function extractCount(item: string): number {
  if (item.includes("-")) {
    const [, second] = item.split("-")

    const [possibleNum] = second.trim().split(" ")

    const num = parseInt(possibleNum, 10)

    if (!Number.isNaN(num)) {
      return num
    }
  }

  return 1
}

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
        count: extractCount(todo.to_do.rich_text[0].plain_text),
        checked: todo.to_do.checked,
        price: 0,
      }),
    ) ?? []

export const useTodos = (id: Ref<string>) => {
  const {
    data: items,
    pending,
    refresh,
  } = useFetch(`/api/notion/pages/${id.value}/items`, {
    transform,
    headers: useRequestHeaders(["cookie"]),
  })

  return { items, pending, refresh }
}
