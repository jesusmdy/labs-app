import { TChat } from "@/types/chats"
import { TMessage } from "@/types/messages"
import { TUser } from "@/types/users"
import { getUserById } from "@/utils"
import { useMemo } from "react"

export default function useGetLastMessagePrefix(
  user: TUser,
  chat: TChat,
  lastMessage?: TMessage,
) {
  const lastMessagePrefix = useMemo(() => {
    if (lastMessage) {
      const messageSender = getUserById(chat.expand.members, lastMessage.sender)
      const isSender = messageSender && messageSender.id === user.id

      if (chat.isGroup) {
        if (!messageSender) return "Unknown:"
        if (isSender) return "You:"
        return `${messageSender.name}:`
      } else {
        if (isSender) return "You:"
        return void null
      }
    } else {
      return "Started conversation"
    }
  }, [lastMessage])
  return lastMessagePrefix
}