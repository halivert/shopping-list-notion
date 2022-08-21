import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export interface Page extends PageObjectResponse {
	title?: string
}
