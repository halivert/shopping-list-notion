import { IdNotProvided } from "~/server/utils/errors"

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, "id")
  const cursor = getRouterParam(event, "cursor")

  if (!id) {
    throw IdNotProvided()
  }

  const notion = useNotion(getCookie(event, "loginData"))

  return notion.blocks.children.list({
    block_id: id,
    start_cursor: cursor,
    page_size: 50,
  })
})
