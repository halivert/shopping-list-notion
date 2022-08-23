import { useNotion } from "@/composables/useNotion"

export default defineEventHandler((event) => {
	const { id } = event.context.params

	const notion = useNotion()

	return notion.blocks.children.list({
		block_id: id,
	})
})
