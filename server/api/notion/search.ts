import { useNotion } from "@/composables/useNotion"
import { NotionOAuthResponse } from "~~/types"

export default defineEventHandler(async (event) => {
	const loginData: NotionOAuthResponse = JSON.parse(
		getCookie(event, "loginData") ?? "{}"
	)

	const notion = useNotion(loginData.access_token)

	return notion.search({})
})
