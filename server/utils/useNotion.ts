import { Client } from "@notionhq/client"
import { type OauthTokenResponse } from "@notionhq/client/build/src/api-endpoints"

export function useNotion(cookieData?: string): Client {
  const loginData: OauthTokenResponse = JSON.parse(cookieData ?? "{}")

  if (!loginData.access_token) {
    throw {
      fatal: true,
      message: "No access token provided",
      name: "Bad request",
      statusCode: 400,
      statusMessage: "Bad request",
    }
  }

  return new Client({ auth: loginData.access_token })
}
