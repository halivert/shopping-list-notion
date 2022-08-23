import { Client } from "@notionhq/client"

export const useNotion = (accessToken?: string) => {
  const { notionToken } = useRuntimeConfig()

  return new Client({
    auth: accessToken ?? notionToken,
  })
}
