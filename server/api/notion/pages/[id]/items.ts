import { useNotion } from "@/composables/useNotion"
import { NotionOAuthResponse } from "~~/types"

export default defineEventHandler((event) => {
	const { id } = event.context.params

	const loginData: NotionOAuthResponse = JSON.parse(
		getCookie(event, "loginData")
	)

	const notion = useNotion(loginData.access_token)

	return notion.blocks.children.list({
		block_id: id,
	})
})
