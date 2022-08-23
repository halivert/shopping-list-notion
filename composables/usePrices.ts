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

    items.value.forEach((item) => {
      if (prices[item.id]) item[key] = prices[item.id]
    })

    onLoad?.()
  }

  return { save, load }
}
