import { IdNotProvided } from "~/server/utils/errors"
import { z } from "zod"

const validator = (data: unknown) => {
  return z
    .object({
      cursor: z.string().optional(),
    })
    .parse(data)
}

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const query = await getValidatedQuery(event, validator)

  if (!id) {
    throw IdNotProvided()
  }

  const notion = useNotion(getCookie(event, "loginData"))

  return notion.blocks.children.list({
    block_id: id,
    start_cursor: query.cursor,
    page_size: 50,
  })
})
