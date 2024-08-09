import type {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  ToDoBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints"
import { type Ref } from "vue"
import { type TodoItem } from "~~/types"

function extractCount(itemName: string): number {
  if (itemName.includes("-")) {
    const [, second] = itemName.split("-")

    const [possibleNum] = second.trim().split(" ")

    const num = parseInt(possibleNum, 10)

    if (!Number.isNaN(num)) {
      return num
    }
  }

  return 1
}

const transform = (
  data: ListBlockChildrenResponse,
): Omit<ListBlockChildrenResponse, "results"> & { results: TodoItem[] } => ({
  ...data,
  results:
    data.results
      .filter((block): block is BlockObjectResponse =>
        Object.hasOwn(block, "type"),
      )
      .filter(
        (block): block is ToDoBlockObjectResponse => "to_do" === block.type,
      )
      .map(
        (todo): TodoItem => ({
          id: todo.id,
          text: todo.to_do.rich_text[0].plain_text,
          count: extractCount(todo.to_do.rich_text[0].plain_text),
          checked: todo.to_do.checked,
          price: 0,
        }),
      ) ?? [],
})

export const useTodos = (id: Ref<string>) => {
  const { data, status, refresh } = useFetch(
    `/api/notion/pages/${id.value}/items`,
    {
      transform,
      headers: useRequestHeaders(["cookie"]),
    },
  )

  const lastLoaded = ref<string | null>(null)

  const loadMore = () => {
    if (!data.value?.has_more) {
      return
    }

    const cursor = data.value.next_cursor

    if (lastLoaded.value === cursor) {
      return
    }

    lastLoaded.value = cursor

    $fetch(`/api/notion/pages/${id.value}/items?cursor=${cursor}`)
      .then((newData) => {
        const transformed = transform(newData)

        data.value = {
          ...transformed,
          results: [...(data.value?.results ?? []), ...transformed.results],
        }
      })
      .catch(() => {
        lastLoaded.value = null
      })
  }

  return { data, status, refresh, loadMore }
}
