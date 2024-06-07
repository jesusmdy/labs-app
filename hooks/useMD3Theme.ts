import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { MD3DarkTheme, MD3LightTheme } from "react-native-paper";

export default function useMD3Theme(definedScheme?: string) {
  const colorScheme = useColorScheme();
  const theme = useMemo(() => {
    if (definedScheme) {
      if (definedScheme === "light") return MD3LightTheme;
      return MD3DarkTheme;
    }
    if (colorScheme == "dark") return MD3DarkTheme;
    return MD3LightTheme;
  }, [colorScheme]);

  return theme;
}
