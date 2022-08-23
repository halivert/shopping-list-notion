export function urlBuilder(
  baseUrl: string,
  queryParameters: Record<string, string | undefined | null>
) {
  const result = new URL(baseUrl)

  Object.entries(queryParameters).forEach(([key, value]) => {
    if (value) result.searchParams.append(key, value)
  })

  return result
}
