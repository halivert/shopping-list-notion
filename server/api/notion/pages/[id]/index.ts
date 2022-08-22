import { useNotion } from "@/composables/useNotion"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { Page } from "~~/types"

export default defineEventHandler(async (event): Promise<Page> => {
	const { id } = event.context.params

	const notion = useNotion()

	const page = (await notion.pages.retrieve({
		page_id: id,
	})) as PageObjectResponse

	const pageProps = await notion.pages.properties.retrieve({
		page_id: id,
		property_id: "title",
	})

	if (pageProps.object !== "list") return page

	if (pageProps.results[0].type !== "title") return page

	const title = pageProps.results[0].title

	return {
		...page,
		title: title.plain_text,
	}
})
