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

export function getSavedItems(key: string): LocalStorageItems {
  return JSON.parse(localStorage.getItem(key) ?? "{}")
}

export const useLocalStorage = (props: UseLocalStorageProp) => {
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
