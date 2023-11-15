import type { ComputedRef } from "vue"
import type { TodoItem } from "~~/types"
import { getCurrency } from "~~/helpers/currency"

export const useTotal = (items: ComputedRef<TodoItem[]>) => {
  const total = computed(() => {
    return items.value.reduce(
      (total, { price, count }) =>
        Number.isNaN(price * count) ? total : total + price * count,
      0,
    )
  })

  const totalFormated = computed(() => getCurrency(total.value))

  return { total, totalFormated }
}
