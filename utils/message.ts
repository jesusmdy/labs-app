import { TChat } from "@/types/chats";
import { TMessage } from "@/types/messages";
import _ from "lodash";

export const formatMessageTime = (message: TMessage) => new Date(message.created).toLocaleTimeString('en-US', {
  hour: 'numeric',
  minute: 'numeric',
})

export const getLastMessage = (messages: TMessage[], chat: TChat) => {
  const sortedMessages = _.filter(_.sortBy(messages, 'created'), { origin: chat.id })
  const message = _.last(sortedMessages)
  return message
}
