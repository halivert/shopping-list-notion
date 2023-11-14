import { type Ref, type WatchStopHandle } from "vue"
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
  save: () => void
  load: () => void
}

export function getSavedItems<T = LocalStorageItems>(key: string): T {
  return JSON.parse(localStorage.getItem(key) ?? "{}")
}

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
      item.price = lastPrices[item.id]
    }

    if (count[item.id]) {
      item.price = count[item.id]
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
    const internalLoad = (stop?: WatchStopHandle) => {
      if (!key.value || !items.value) return

      const savedItems = getSavedItems(key.value)

      if (!Object.values(savedItems).length) {
        legacyLoad(items)
        stop?.()
        return onLoad?.()
      }

      items.value.forEach((item) => {
        if (!savedItems[item.id]) {
          return
        }

        Object.assign(item, {
          count: savedItems[item.id].count,
          lastPrice: savedItems[item.id].lastPrice,
          price: savedItems[item.id].price,
        })
      })

      stop?.()
      return onLoad?.()
    }

    if (items.value && key.value) {
      return internalLoad()
    }

    const stop: WatchStopHandle = watch([items, key], () => internalLoad(stop))
  }

  return { save, load }
}
