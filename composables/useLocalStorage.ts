import { Ref } from "vue"
import { Prices, TodoItem } from "~~/types"

export const PRICE_KEY = "price"
export const LAST_PRICE_KEY = "lastPrice"
export const COUNT = "count"

interface UseLocalStorageProp {
  items: Ref<TodoItem[] | null>
  key: typeof PRICE_KEY | typeof LAST_PRICE_KEY | typeof COUNT
  onSave?: () => void
  onLoad?: () => void
}

export const useLocalStorage = (props: UseLocalStorageProp) => {
  const { items, key, onSave, onLoad } = props

  function save(): void {
    if (!items.value) throw new Error("Error saving, please try again")

    const savedPrices = JSON.parse(localStorage.getItem(key) ?? "{}") as Prices

    const prices: Prices = Object.fromEntries(
      items.value.map((item) => [item.id, item[key] || 0]),
    )

    localStorage.setItem(key, JSON.stringify({ ...savedPrices, ...prices }))

    return onSave?.()
  }

  function load(): void {
    if (!items.value) return

    const prices = JSON.parse(localStorage.getItem(key) ?? "{}") as Prices

    const internalLoad = () => {
      items.value?.forEach((item) => {
        if (prices[item.id]) item[key] = prices[item.id]
      })

      return onLoad?.()
    }

    if (items.value) internalLoad()
    watch(items, internalLoad)
  }

  return { save, load }
}
