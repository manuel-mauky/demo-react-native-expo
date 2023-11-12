import { Item } from "../types"
import { ReactNode } from "react"
import { Pressable, StyleSheet, Text, View } from "react-native"
import FontAwesomeIcon from "@expo/vector-icons/FontAwesome"
import { useItemsState } from "../items-state"

type Props = {
  item: Item
}

export function ItemElement({ item }: Props): ReactNode {
  const { removeItem } = useItemsState()

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{item.title}</Text>
      <Pressable onPress={() => removeItem(item)}>
        <FontAwesomeIcon style={styles.closeIcon} size={20} name="close" />
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 8,
    paddingVertical: 16,
    backgroundColor: "#eee",
  },
  closeIcon: {},
  titleText: {
    flexGrow: 1,
  },
})
