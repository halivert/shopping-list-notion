import { NotionOAuthResponse } from "~~/types"

export const useLoginData = () => {
  return useCookie<NotionOAuthResponse>("loginData", { httpOnly: true })
}
