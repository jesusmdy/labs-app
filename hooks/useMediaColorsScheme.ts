import { MediaColor } from "@/types/media";
import { lightOrDark } from "@/utils/color";
import { useMemo } from "react";
import { StatusBarStyle, useColorScheme } from "react-native";

export default function useMediaColorsScheme(colors: MediaColor) {
  const defaultColorScheme = useColorScheme()
  const scheme = useMemo(
    () => {
      if (!colors) return {
        primaryScheme: defaultColorScheme,
        secondaryScheme: defaultColorScheme,
        tertiaryScheme: defaultColorScheme,
        platformScheme: defaultColorScheme,
        backgroundScheme: defaultColorScheme,
      }
      return {
        primaryScheme: lightOrDark(colors.secondary) as StatusBarStyle,
        secondaryScheme: lightOrDark(colors.primary) as StatusBarStyle,
      }
    },
    [colors]
  )
  return scheme;
}