import { TChat } from "@/types/chats";
import _ from "lodash";

export function sortChatsByLatestMessage(chats: TChat[]) {
  return _.reverse(
    _.sortBy(
      chats,
      (chat) => {
        const lastMessage = _.first(chat.lastMessage)
        if (lastMessage) {
          return lastMessage.created
        }
        return chat.created
      }
    )
  )
}