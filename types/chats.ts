import { TMedia } from "./media"
import { TMessage } from "./messages"
import { TUser } from "./users"

export type TChat = {
  admins: string[],
  collectionId: string,
  collectionName: string,
  created: string,
  title: string,
  description: string,
  icon: string,
  id: string,
  isGroup: boolean,
  members: string[],
  users: TUser[],
  expand: {
    members: TUser[],
    icon?: TMedia
  },
  lastMessage?: TMessage[]
  updated: string,
}