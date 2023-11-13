import { type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { type Page } from "~~/types"

export default defineEventHandler(async (event): Promise<Page[] | void> => {
  const notion = useNotion(getCookie(event, "loginData"))

  const pages = await notion.search({
    filter: {
      property: "object",
      value: "page",
    },
  })

  const results = pages.results.filter(
    (page) => page.object === "page",
  ) as PageObjectResponse[]

  const promises = results.map((page) =>
    notion.pages.properties.retrieve({
      page_id: page.id,
      property_id: "title",
    }),
  )

  const promiseResults = await Promise.allSettled(promises)

  return promiseResults
    .map((result, idx): Page | null => {
      if (result.status !== "fulfilled") return null
      if (result.value.object !== "list") return null

      const title = result.value.results[0]
      if (title.type !== "title") return null

      return {
        ...results[idx],
        items: [],
        title: title.title.plain_text,
      }
    })
    .filter((page): page is Page => !!page)
})
