import { createContext, PropsWithChildren, ReactNode, useContext, useEffect, useState } from "react"
import "react-native-get-random-values"
import { nanoid } from "nanoid"

import AsyncStorage from "@react-native-async-storage/async-storage"

export type Item = {
  id: string
  title: string
}

type State = {
  items: ReadonlyArray<Item>
  addItem: (item: Omit<Item, "id">) => Promise<void>
  removeItem: (item: Item | string) => Promise<void>
}

const initialState: State = {
  items: [],
  addItem: (item) => Promise.resolve(),
  removeItem: (item: Item | string) => Promise.resolve(),
}

export const ItemsStateContext = createContext<State>(initialState)

const STORAGE_KEY = "expo-todo-app"

export function ItemsStateProvider({ children }: PropsWithChildren): ReactNode {
  const [items, setItems] = useState<ReadonlyArray<Item>>(initialState.items)

  useEffect(() => {
    ;(async () => {
      const value = await AsyncStorage.getItem(STORAGE_KEY)
      if (value) {
        setItems(JSON.parse(value))
      }
    })()
  }, [])

  const updateItems = async (newItems: ReadonlyArray<Item>) => {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newItems))
    setItems(newItems)
  }

  const state: State = {
    items,
    addItem: async (newItem) => {
      await updateItems([
        ...items,
        {
          id: nanoid(),
          ...newItem,
        },
      ])
    },
    removeItem: async (itemOrId) => {
      const id = typeof itemOrId === "string" ? itemOrId : itemOrId.id

      await updateItems(items.filter((item) => item.id !== id))
    },
  }

  return <ItemsStateContext.Provider value={state}>{children}</ItemsStateContext.Provider>
}

export function useItemsState(): State {
  return useContext(ItemsStateContext)
}
