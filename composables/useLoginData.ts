import { NotionOAuthResponse } from "~~/types"

export const useLoginData = () => {
  const config = useRuntimeConfig()

  return useCookie<NotionOAuthResponse>("loginData", {
    httpOnly: true,
    secure: config.public.production,
  })
}
