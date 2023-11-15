import type { PartialBlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { IdNotProvided } from "~/server/utils/errors"
import type { TodoItem } from "~/types"

function getTodoItem(
  result: BlockObjectResponse | PartialBlockObjectResponse,
): TodoItem {
  if (result.object !== "block") {
    console.log(result)

    throw createError({
      statusCode: 500,
      statusMessage: "Error en conexión con Notion",
    })
  }

  const todo = result as BlockObjectResponse

  if (todo.type !== "to_do") {
    console.log(result)

    throw createError({
      statusCode: 500,
      statusMessage: "Error en conexión con Notion",
    })
  }

  return {
    id: todo.id,
    count: 1,
    price: 0,
    text: todo.to_do.rich_text[0].plain_text,
    checked: todo.to_do.checked,
  }
}

export default defineEventHandler(async (event): Promise<TodoItem> => {
  const id = getRouterParam(event, "id")

  if (!id) {
    throw IdNotProvided()
  }

  const notion = useNotion(getCookie(event, "loginData"))

  const body = await readBody(event)

  const name: unknown = body.name

  if (!name || typeof name !== "string") {
    throw createError({
      statusCode: 400,
      data: "El nombre no es válido",
    })
  }

  const data = await notion.blocks.children.append({
    block_id: id,
    children: [
      {
        object: "block",
        type: "to_do",
        to_do: {
          rich_text: [
            {
              type: "text",
              text: {
                content: name,
              },
            },
          ],
        },
      },
    ],
  })

  return getTodoItem(data.results[0])
})
