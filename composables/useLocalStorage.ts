import { type Ref } from "vue"
import { type TodoItem } from "~~/types"

interface LocalStorageItem {
  id: string
  price: number
  count: number
  lastPrice?: number
}

type LocalStorageItems = Record<string, LocalStorageItem>

interface UseLocalStorageProp {
  items: Ref<TodoItem[] | null>
  key: ComputedRef<string> | ComputedRef<string | undefined> | string
  onSave?: () => void
  onLoad?: () => void
}

interface UseLocalStorageReturn {
  /**
   * Saves the items in the local storage
   */
  save: () => void

  /**
   * Loads the items from the local storage
   */
  load: () => void

  /**
   * Resets the local storage items, sets the price to 0 and the last price to
   * the current price, or the last price setted
   */
  reset: () => void
}

export function getSavedItems<T = LocalStorageItems>(key: string): T {
  return JSON.parse(localStorage.getItem(key) ?? "{}")
}

/**
 * @deprecated
 * Please use newly load, deprecaded in 2024-08
 */
function legacyLoad(items: Ref<TodoItem[] | null>): void {
  if (!items.value) {
    return
  }

  const count = getSavedItems<Record<string, number>>("count")
  const prices = getSavedItems<Record<string, number>>("price")
  const lastPrices = getSavedItems<Record<string, number>>("lastPrice")

  const isEmpty = (list: Record<string, number>): boolean => {
    return !Object.values(list).length
  }

  if (isEmpty(prices) && isEmpty(lastPrices) && isEmpty(count)) {
    return
  }

  items.value.forEach((item) => {
    if (prices[item.id]) {
      item.price = prices[item.id]
    }

    if (lastPrices[item.id]) {
      item.lastPrice = lastPrices[item.id]
    }

    if (count[item.id]) {
      item.count = count[item.id]
    }
  })
}

export function useLocalStorage(
  props: UseLocalStorageProp,
): UseLocalStorageReturn {
  const { items, key: propKey, onSave, onLoad } = props

  const key = isRef(propKey) ? propKey : computed(() => propKey)

  function save(): void {
    if (!items.value || !key.value)
      throw new Error("Error saving, please try again")

    const savedItems = getSavedItems(key.value)

    const newItems = Object.fromEntries(
      items.value.map((item): [string, LocalStorageItem] => [
        item.id,
        {
          count: item.count,
          price: item.price,
          id: item.id,
          lastPrice: item.lastPrice,
        },
      ]),
    )

    const toSave = { ...savedItems, ...newItems }

    localStorage.setItem(key.value, JSON.stringify(toSave))

    return onSave?.()
  }

  function load(): void {
    watch(
      [items, key],
      () => {
        if (!key.value || !items.value) return

        const savedItems = getSavedItems(key.value)

        if (!Object.values(savedItems).length) {
          legacyLoad(items)
          return onLoad?.()
        }

        items.value.forEach((item) => {
          if (!savedItems[item.id]) {
            return
          }
          const { count, lastPrice, price } = savedItems[item.id]

          if (count === 1 && !price) {
            return
          }

          Object.assign(item, {
            lastPrice,
            price,
            count: item.count > 1 ? item.count : (count || 1),
          })
        })

        return onLoad?.()
      },
      { immediate: true },
    )
  }

  function reset(): void {
    if (!key.value) return

    const savedItems = getSavedItems(key.value)

    const toSave = Object.fromEntries(
      Object.entries(savedItems).map(([id, item]) => [
        item.id,
        {
          id: id,
          count: item.count ?? 1,
          price: 0,
          lastPrice: item.price || item.lastPrice || 0,
        },
      ]),
    )

    localStorage.setItem(key.value, JSON.stringify(toSave))
  }

  return { save, load, reset }
}
