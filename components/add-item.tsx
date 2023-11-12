import { ReactNode, useState } from "react"
import { View, Button, TextInput, SafeAreaView, StyleSheet } from "react-native"
import { useItemsState } from "../items-state"

type Props = {}

export function AddItem({}: Props): ReactNode {
  const { addItem } = useItemsState()

  const [title, setTitel] = useState("")

  const isValid = () => {
    return title && title.trim() !== ""
  }

  const onAdd = () => {
    if (isValid()) {
      addItem({ title })
      setTitel("")
    }
  }

  return (
    <View style={styles.container}>
      <TextInput style={styles.textInput} onChangeText={setTitel} value={title} />

      <Button disabled={!isValid()} title="Add" onPress={onAdd} />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    gap: 5,
  },
  textInput: {
    flexGrow: 1,
    borderStyle: "solid",
    borderColor: "#999",
    borderWidth: 1,
  },
})
