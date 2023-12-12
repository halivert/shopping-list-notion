import type { TodoItem } from "~/types"

interface Return {
  newItem: Ref<boolean>
  pendingAdd: Ref<boolean>
  addItem: (params: { name?: string; after?: string }) => Promise<TodoItem>
}

export default function useAddItems(action: string): Return {
  const newItem = ref(false)
  const pendingAdd = ref(false)

  const addItem: Return["addItem"] = async ({ name, after }) => {
    if (pendingAdd.value) {
      throw new Error("Solicitud en curso")
    }

    pendingAdd.value = true

    if (!name) {
      newItem.value = false
      pendingAdd.value = false
      throw new Error("El nombre es requerido")
    }

    const { data, error } = await useFetch<TodoItem>(action, {
      method: "POST",
      body: { name, after },
    })

    if (error.value) {
      throw new Error(error.value?.data?.data ?? error.value.statusMessage)
    }

    newItem.value = false
    pendingAdd.value = false

    if (!data.value) {
      throw new Error("Error en la respuesta")
    }

    return data.value
  }

  return { newItem, pendingAdd, addItem }
}
