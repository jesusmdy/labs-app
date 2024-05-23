import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export default function useMD3Theme() {
  const colorScheme = useColorScheme()
  const theme = useMemo(
    () => {
      if (colorScheme == "dark") return MD3DarkTheme
      return MD3LightTheme
    },
    [colorScheme]
  )

  return theme;
}