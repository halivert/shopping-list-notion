import { CookieRef } from "nuxt/dist/app/composables"
import { NotionOAuthResponse } from "~~/types"

export const useLoginData = (): CookieRef<NotionOAuthResponse> | undefined => {
  const config = useRuntimeConfig()

  const cookie = useCookie("loginData", {
    httpOnly: true,
    secure: config.public.production,
  })

  if (!cookie) return undefined

  return useCookie<NotionOAuthResponse>("loginData", {
    httpOnly: true,
    secure: config.public.production,
  })
}
