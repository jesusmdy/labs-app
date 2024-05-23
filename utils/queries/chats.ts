import { TChat } from "@/types/chats";
import { RecordModel } from "pocketbase";
import { KNOWN_COLLECTIONS } from "../collections";
import pb from "@/api";

export const normalizeChatObject = (chat: TChat): TChat => {
  const normalized = {
    ...chat,
    users: chat.expand?.members || []
  };

  return normalized;
}

export const queryChatInfo = (id: string): Promise<RecordModel> => {
  return pb.collection(KNOWN_COLLECTIONS.chats).getOne(id, {
    requestKey: null,
    expand: 'members'
  })
}

export const getInbox = (sync: boolean) => pb.send(
  KNOWN_COLLECTIONS.inbox,
  {
    method: 'GET',
    requestKey: null,
    query: {
      sync
    }
  }
)

export const listenChats = () => pb.collection('chats')

export const startConversation = (userId: string): Promise<TChat> => {
  return pb.send<TChat>(
    '/api/services/inbox', {
      method: 'PUT',
      body: { userId }
    }
  )
}
