import { TBroadcast } from "./broadcast"
import { TChat } from "./chats"
import { ICollection } from "./collection"
import { TUser } from "./users"

interface IInvite extends ICollection {
  broadcast: string,
  group: string,
  issuer: string,
  note: string,
  revoked: boolean,
  spots: number,
  validUntil: string,
  expand: {
    broadcast?: TBroadcast,
    group: TChat,
    issuer: TUser
  }
}

export type TInvite = IInvite
