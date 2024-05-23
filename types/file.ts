import { TMedia } from "./media"

export interface IMetaFields {
  width: number,
  height: number,
  colors: any[]
}

export interface IParsedFile {
  file: File
  data: string,
  id: string,
  type: TMedia['type'],
  filesize: number,
  meta: IMetaFields
}