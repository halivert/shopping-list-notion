import { useNotion } from "@/composables/useNotion"

export default defineEventHandler(async (event) => {
	const notion = useNotion()

	return notion.search({})
})
