import { type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { Page } from "~~/types"

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

  return results.map((page, idx): Page => {
    const promiseResult = promiseResults[idx]

    if (promiseResult.status !== "fulfilled") return page
    if (promiseResult.value.object !== "list") return page

    const title = promiseResult.value.results[0]
    if (title.type !== "title") return page

    return {
      ...results[idx],
      title: title.title.plain_text,
    }
  })
})
