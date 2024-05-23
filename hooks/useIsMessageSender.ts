import { TMessage } from "@/types/messages";
import { TUser } from "@/types/users";
import { useMemo } from "react";

export default function useIsMessageSender(
  user: TUser,
  message: TMessage
) {
  const isSender = useMemo(
    () => {
      if (!user) return false
      return message.sender === user.id
    },
    [user]
  )
  return isSender
}