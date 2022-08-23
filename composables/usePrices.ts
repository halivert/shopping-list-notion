import { Ref } from "vue"
import { Prices, TodoItem } from "~~/types"

interface UsePriceProp {
  items: Ref<TodoItem[]>
  key: string
  onSave?: () => void
  onLoad?: () => void
}

export const usePrice = (props: UsePriceProp) => {
  const { items, key, onSave, onLoad } = props

  const save = () => {
    if (!items.value) throw new Error("Error saving, please try again")

    const prices: Prices = Object.fromEntries(
      items.value
        .filter((item) => item.price > 0)
        .map((item) => [item.id, item[key]])
    )

    localStorage.setItem(key, JSON.stringify(prices))

    onSave?.()
  }

  const load = () => {
    const prices = JSON.parse(localStorage.getItem(key) ?? "{}") as Prices

    const internalLoad = () => {
      items.value.forEach((item) => {
        if (prices[item.id]) item[key] = prices[item.id]
      })

      return onLoad?.()
    }

    if (items.value) internalLoad()
    watch(items, internalLoad)
  }

  return { save, load }
}
