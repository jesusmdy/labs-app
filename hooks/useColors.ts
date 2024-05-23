import Colors from "@/constants/Colors";
import { useMemo } from "react";
import { useColorScheme } from "react-native";

export default function useColors() {
  const colorScheme = useColorScheme()

  const colors = useMemo(
    () => {
      return Colors[colorScheme ?? "light"]
    },
    [colorScheme]
  )

  return colors

}