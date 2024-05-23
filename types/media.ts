import { ImageColorsResult } from "react-native-image-colors";

export interface MediaColor {
  background: string,
  detail: string,
  platform: string,
  primary: string,
  secondary: string,
}

export type TMedia = {
  collectionId: string,
  collectionName: string,
  file: string,
  id: string,
  message: string,
  created: string,
  updated: string,
  filesize: number,
  width: number,
  height: number,
  colors: MediaColor,
  type: 'image' | 'video' | 'unknown',
}