import type { NuxtError } from "nuxt/app"

export function IdNotProvided(): NuxtError {
  return createError({
    statusCode: 400,
    statusMessage: "Falta el id",
  })
}
