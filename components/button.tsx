import { PropsWithChildren, ReactNode } from "react"
import { Pressable } from "react-native"

export function Button({ children }: PropsWithChildren): ReactNode {
  return <Pressable>{children}</Pressable>
}
