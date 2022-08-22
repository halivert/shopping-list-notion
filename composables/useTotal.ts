import { Ref } from "vue"
import { TodoItem } from "~~/types"

export const useTotal = (items: Ref<TodoItem[]>) => {
  const total = ref(0)

  const totalFormated = computed(() =>
    new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      currencyDisplay: "symbol",
    }).format(total.value)
  )

  const calculateTotal = () => {
    total.value = items.value.reduce(
      (total, { price }) => (Number.isNaN(price) ? total : total + price),
      0
    )
  }

  return { total, totalFormated, calculateTotal }
}
