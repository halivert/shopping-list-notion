import { IdNotProvided } from "~/server/utils/errors"

export default defineEventHandler((event) => {
  const id = getRouterParam(event, "id")

  if (!id) {
    throw IdNotProvided()
  }

  const notion = useNotion(getCookie(event, "loginData"))

  return notion.blocks.children.list({
    block_id: id,
  })
})
