import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export interface Page extends PageObjectResponse {
  title?: string
}

export interface TodoItem {
  id: string
  text: string
  checked: boolean
  price: number
}

export type Prices = Record<string, number>
