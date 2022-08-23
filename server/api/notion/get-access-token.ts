import { NotionOAuthResponse } from "~~/types"

export default defineEventHandler(
	async (event): Promise<NotionOAuthResponse> => {
		const config = useRuntimeConfig()
		const { notionSecret } = config

		const { code, callbackUrl } = await useBody(event)

		const authHeader = Buffer.from(
			`${config.public.notionClient}:${notionSecret}`,
			"utf-8"
		).toString("base64")

		const options = {
			method: "POST",
			body: {
				grant_type: "authorization_code",
				code,
				redirect_uri: callbackUrl,
			},
			headers: {
				Authorization: `Basic ${authHeader}`,
				"Content-Type": "application/json",
			},
		}

		return $fetch<NotionOAuthResponse>(
			`${config.public.notionUrl}/oauth/token`,
			options
		)
	}
)
