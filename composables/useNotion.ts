import { Client, LogLevel } from "@notionhq/client"

export const useNotion = () => {
  const { notionToken } = useRuntimeConfig()

  return new Client({
    auth: notionToken,
    logLevel: LogLevel.DEBUG
  })
}
