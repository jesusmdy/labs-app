import { IParsedFile } from "./file"
import { TMedia } from "./media"

export type TMessage = {
  attachment: string,
  collectionId: string,
  collectionName: string,
  content: string,
  created: string,
  id: string,
  media: string[],
  origin: string,
  sender: string,
  updated: string,
  expand?: {
    media?: TMedia[]
  }
}

export type TQueueMessage = {
  id: string,
  content: string,
  media: IParsedFile[] | undefined,
  inboxId: string
}
