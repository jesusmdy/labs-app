import { TMedia } from "@/types/media";
import { create } from "zustand";
import { createSelectors } from "./utils/createSelectors";

interface IMediaViewer {
  media: TMedia | undefined,
  mediaList: TMedia[],
  setMedia: (media: TMedia) => void,
  setMediaList: (mediaList: TMedia[]) => void,
  clearMedia: () => void,
  clearMediaList: () => void
}

export const useMediaViewerStore = create<IMediaViewer>(
  (set) => ({
    media: void null,
    mediaList: [],
    setMedia: (media) => set(state => ({ media })),
    setMediaList: (mediaList) => set(state => ({mediaList})),
    clearMedia: () => set(state => ({ media: void null })),
    clearMediaList: () => set(state => ({mediaList: []}))
  })
)

export const useMediaViewerSelectors = createSelectors(useMediaViewerStore)
