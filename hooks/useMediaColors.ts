import { TMedia } from "@/types/media";
import { useMemo } from "react";

export default function useMediaColors(media: TMedia) {
  const colors = useMemo(
    () => {
      if (media.type === "video") return void null;
      return media.colors;
    },
    [media]
  )
  return colors;
}