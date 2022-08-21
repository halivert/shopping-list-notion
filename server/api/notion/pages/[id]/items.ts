import { useNotion } from "@/composables/useNotion"
import { ListBlockChildrenResponse } from "@notionhq/client/build/src/api-endpoints"

export default defineEventHandler(
	(event): Promise<ListBlockChildrenResponse> => {
		const { id } = event.context.params

		const notion = useNotion()

		return notion.blocks.children.list({
			block_id: id,
		})
	}
)
