import { useNotion } from "@/composables/useNotion"
import { NotionOAuthResponse } from "~~/types"

export default defineEventHandler((event) => {
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

	return notion.blocks.children.list({
		block_id: id,
	})
})
