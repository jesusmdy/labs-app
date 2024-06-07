import { useColorScheme } from "@/components/useColorScheme.web";
import { TMedia } from "@/types/media";
import { lightOrDark } from "@/utils/color";
import { useMemo } from "react";

type TColorSchemes = "light" | "dark";

export default function useMediaPaletteScheme(
  media: TMedia,
  using: "primary" | "background" = "primary",
): TColorSchemes {
  const defaultColorScheme = useColorScheme();
  const colorScheme = useMemo(() => {
    if (media.type === "video") return defaultColorScheme;
    return lightOrDark(media.colors[using]);
  }, [media]);
  return colorScheme as TColorSchemes;
}
