import { type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { type Page } from "~~/types"

export default defineEventHandler(async (event): Promise<Page | void> => {
  const id = getRouterParam(event, "id")

  if (!id) {
    throw {
      fatal: true,
      message: "No id provided",
      name: "Bad request",
      statusCode: 400,
      statusMessage: "Bad request",
    }
  }

  const notion = useNotion(getCookie(event, "loginData"))

  const page = (await notion.pages.retrieve({
    page_id: id,
  })) as PageObjectResponse

  const pageProps = await notion.pages.properties.retrieve({
    page_id: id,
    property_id: "title",
  })

  if (pageProps.object !== "list") return

  if (pageProps.results[0].type !== "title") return

  const title = pageProps.results[0].title

  return {
    ...page,
    title: title.plain_text,
    items: [],
  }
})
