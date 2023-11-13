import { type OauthTokenResponse } from "@notionhq/client/build/src/api-endpoints"
import { type CookieRef } from "nuxt/dist/app/composables"

export const useLoginData = (): CookieRef<OauthTokenResponse> => {
  const config = useRuntimeConfig()

  const cookie = useCookie<OauthTokenResponse>("loginData", {
    httpOnly: true,
    secure: config.public.production,
  })

  return cookie
}
