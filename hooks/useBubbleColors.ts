import { TMessage } from "@/types/messages";
import { useMemo } from "react";
import { MD3Colors } from "react-native-paper";
import { useColorScheme } from "react-native";
import useColors from "./useColors";

export default function useBubbleColors(message: TMessage) {
  const colorScheme = useColorScheme()
  const colors = useColors()
  
  const bubbleColors = useMemo(
    () => {
      return {
        color: colors.text,
        background: (
          colorScheme === "light"
            ?  MD3Colors.primary90
            : MD3Colors.primary40
        )
      }
    },
    [colorScheme]
  )

  return bubbleColors
}