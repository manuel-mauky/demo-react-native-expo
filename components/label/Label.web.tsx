import { PropsWithChildren } from "react"
import { View, Text } from "react-native"

export function Label({ children }: PropsWithChildren) {
  return (
    <View>
      <Text>{children} web</Text>
    </View>
  )
}
