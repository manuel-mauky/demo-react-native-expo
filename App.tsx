import { StatusBar } from "expo-status-bar"
import { StyleSheet, View } from "react-native"
import React from "react"
import { AddItem } from "./components/add-item"
import { ItemsStateProvider } from "./items-state"
import { ItemsList } from "./components/items-list"

export default function App() {
  return (
    <ItemsStateProvider>
      <View style={styles.container}>
        <View style={styles.addItem}>
          <AddItem />
        </View>

        <ItemsList />

        <StatusBar style="auto" />
      </View>
    </ItemsStateProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 4,
    flex: 1,
    gap: 4,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  addItem: {
    alignSelf: "stretch",
  },
})
