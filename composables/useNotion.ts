import { Client } from "@notionhq/client"

export const useNotion = (accessToken?: string): Client => {
  const auth = accessToken ?? useLoginData().value.access_token

  if (!auth) {
    console.warn("No token setted")
  }

  return new Client({ auth })
}
