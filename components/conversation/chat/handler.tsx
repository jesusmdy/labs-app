import pb from "@/api";
import { useBatchAddMessages } from "@/store/messages";
import { TChat } from "@/types/chats";
import { TMessage } from "@/types/messages";
import { KNOWN_COLLECTIONS } from "@/utils/collections";
import { PropsWithChildren, useEffect } from "react";
import useSWR from "swr";

interface IChatMessagesHandler extends PropsWithChildren {
  chat: TChat
}

export function ChatMessagesHandler({children, chat}: IChatMessagesHandler) {
  const batchAddMessages = useBatchAddMessages()

  const {data} = useSWR(`api/inbox/${chat.id}/messages`, () => pb.collection(KNOWN_COLLECTIONS.messages).getList(1, 19, {
      filter: `origin="${chat.id}"`,
      sort: "-created",
      expand: "media, sender"
    })
  )

  useEffect(
    () => {
      if (data) {
        batchAddMessages(data.items as TMessage[])
      }
    },
    [data]
  )

  return children
}