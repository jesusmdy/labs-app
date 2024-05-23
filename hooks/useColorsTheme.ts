import { IColorTheme } from "@/types/color";
import { MediaColor, TMedia } from "@/types/media";
// @ts-ignore
import materialDynamicColors from "material-dynamic-colors";
import { useEffect, useMemo, useState } from "react";
import { useColorScheme } from "react-native";

type TMediaColor = Pick<MediaColor, "background" | "primary" | "secondary">

interface IColorsThemeResult {
  theme?: {
    light: IColorTheme,
    dark: IColorTheme,
  }
}

export function useSafeImplementColorTheme(media: TMedia) {
  const colorScheme = useColorScheme()
  const defaultColor = colorScheme === "dark" ? "#000000" : "#ffffff"
  const colors = useMemo(
    () => {
      if (
        media &&
        media.type === "image"
        && media.colors
      ) {
        return media.colors;
      } else return {
        background: defaultColor,
        primary: defaultColor,
        secondary: defaultColor,
      }
    },
    [media]
  )
  return colors;
}

export default function useColorsTheme(
  colors: TMediaColor,
  using: keyof TMediaColor
): IColorsThemeResult {
  const [theme, setTheme] = useState<IColorsThemeResult["theme"]>()

  async function getColorsTheme() {
    try {
      const theme = await materialDynamicColors(colors[using])
      setTheme(theme)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(
    () => {
      getColorsTheme()
    },
    []
  )

  return {theme}
}