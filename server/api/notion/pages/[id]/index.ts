import { useNotion } from "@/composables/useNotion"
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"
import { NotionOAuthResponse, Page } from "~~/types"

export default defineEventHandler(async (event): Promise<Page|void> => {
	const { id } = event.context.params

	const loginData: NotionOAuthResponse = JSON.parse(
		getCookie(event, "loginData") ?? "{}"
	)

	if (!loginData.access_token) {
		return sendError(event, {
			fatal: false,
			message: "No access token provided",
			name: "Bad request",
			statusCode: 400,
			statusMessage: "Bad request",
		})
	}

	const notion = useNotion(loginData.access_token)

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
