import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints"

export interface Page extends PageObjectResponse {
  title?: string
}

export interface TodoItem {
  id: string
  text: string
  checked: boolean
  price: number
  lastPrice?: number
}

export type Prices = Record<string, number>

export interface NotionOAuthResponse {
  access_token: string
  token_type: string
  bot_id: string
  workspace_name: string
  workspace_icon: string
  workspace_id: string
  owner: {
    type: string
    user: {
      object: string
      id: string
    }
  }
}
