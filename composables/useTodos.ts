import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  ToDoBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
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

export const useTodos = (id: string) => {
  const { data: items, pending } = useLazyFetch(
    `/api/notion/pages/${id}/items`,
    { transform }
  )

  return { items, pending }
}
