import { ReactNode } from "react"
import { FlatList, StyleSheet, View } from "react-native"
import { useItemsState } from "../items-state"
import { ItemElement } from "./item-element"

function Separator({}): ReactNode {
  return <View style={styles.separator} />
}

type Props = {}

export function ItemsList({}: Props): ReactNode {
  const { items } = useItemsState()

  return (
    <View style={styles.container}>
      <FlatList
        ItemSeparatorComponent={Separator}
        data={items}
        renderItem={(item) => <ItemElement item={item.item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  separator: {
    height: 1,
    backgroundColor: "#ccc",
  },
})
