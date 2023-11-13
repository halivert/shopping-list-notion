import { type PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export interface Page extends PageObjectResponse {
  title: string
  items: Array<{
    id: string
    price: number
    count: number
  }>
}

export interface TodoItem {
  id: string
  text: string
  checked: boolean
  price: number
  count: number
  lastPrice?: number
}
