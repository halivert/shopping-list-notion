import { useNotion } from "@/composables/useNotion"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export default defineEventHandler(async () => {
	const notion = useNotion()

	const pages = await notion.search({
		filter: {
			property: "object",
			value: "page",
		},
	})

	const results = pages.results.filter((page) => {
		if (page.object !== "page") return false

		return (page as PageObjectResponse).parent.type === "workspace"
	}) as PageObjectResponse[]

	const promises = results.map((page) =>
		notion.pages.properties.retrieve({
			page_id: page.id,
			property_id: "title",
		})
	)

	// TODO: Return info about page
})
