import { createContext, PropsWithChildren, ReactNode, useContext, useState } from "react"
import { Item } from "./types"
import "react-native-get-random-values"
import { nanoid } from "nanoid"

type State = {
  items: ReadonlyArray<Item>
  addItem: (item: Omit<Item, "id">) => void
  removeItem: (item: Item | string) => void
}

const initialState: State = {
  items: [
    {
      id: "i1",
      title: "Test 123",
    },
    {
      id: "i2",
      title: "Test 345",
    },
    {
      id: "i3",
      title: "Test 678",
    },
  ],
  addItem: (item) => {},
  removeItem: (item: Item | string) => {},
}

export const ItemsStateContext = createContext<State>(initialState)

export function ItemsStateProvider({ children }: PropsWithChildren): ReactNode {
  const [items, setItems] = useState<ReadonlyArray<Item>>(initialState.items)

  const state: State = {
    items,
    addItem: (newItem) => {
      setItems([...items, {
        id: nanoid(),
        ...newItem
      }])
    },
    removeItem: (itemOrId) => {
      const id = typeof itemOrId === "string" ? itemOrId : itemOrId.id
      setItems(items.filter((item) => item.id !== id))
    },
  }

  return <ItemsStateContext.Provider value={state}>{children}</ItemsStateContext.Provider>
}

export function useItemsState(): State {
  return useContext(ItemsStateContext)
}
