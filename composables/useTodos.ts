import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  ToDoBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import { Ref } from "vue"
import { TodoItem } from "~~/types"

const transform = (data: ListBlockChildrenResponse): TodoItem[] =>
  data.results
    .filter((block: BlockObjectResponse) => block.type === "to_do")
    .map(
      (todo: ToDoBlockObjectResponse): TodoItem => ({
        id: todo.id,
        text: todo.to_do.rich_text[0].plain_text,
        checked: todo.to_do.checked,
        price: 0,
      })
    ) ?? []

export const useTodos = (id: Ref<string>) => {
  const { data: items, pending, refresh } = useLazyFetch(
    `/api/notion/pages/${id.value}/items`,
    { transform }
  )

  return { items, pending, refresh }
}
