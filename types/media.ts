import { ICollection } from "./collection";
import { TUser } from "./users";

export interface MediaColor {
  background: string;
  detail: string;
  platform: string;
  primary: string;
  secondary: string;
}

interface IMedia extends ICollection {
  uploader: string;
  file: string;
  id: string;
  message: string;
  filesize: number;
  width: number;
  height: number;
  colors: MediaColor;
  type: "image" | "video" | "unknown";
  expand?: {
    uploader?: TUser;
  };
}

export type TMedia = IMedia;
