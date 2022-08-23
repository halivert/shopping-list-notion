import { ComputedRef } from "vue"
import { TodoItem } from "~~/types"
import { getCurrency } from "~~/helpers/currency"

export const useTotal = (items: ComputedRef<TodoItem[]>) => {
  const total = ref(0)

  const totalFormated = computed(() => getCurrency(total.value))

  const calculateTotal = () => {
    total.value = items.value.reduce(
      (total, { price }) => (Number.isNaN(price) ? total : total + price),
      0
    )
  }

  return { total, totalFormated, calculateTotal }
}
