import { TChat } from "@/types/chats";
import { TMessage, TQueueMessage } from "@/types/messages";
import _ from "lodash";
import { create } from "zustand"
import { createSelectors } from "./utils/createSelectors";

interface IChatStoreProps {
  queue: TQueueMessage[],
  messages: TMessage[] | null
  setMessages: (messages: TMessage[]) => void
  batchAddMessage: (messages: TMessage[]) => void
  addMessage: (message: TMessage) => void
  clearMessages: () => void
  setMessageQueue: (queue: TQueueMessage[]) => void
  addQueueMessage: (item: TQueueMessage) => void
  removeQueueMessage: (item: TQueueMessage) => void
}

const useMessagesStore = create<IChatStoreProps>(
  (set) => ({
    queue: [],
    messages: [],
    // messages
    setMessages: (messages: TMessage[]) => set(
      () => ({ messages })
    ),
    addMessage: (message: TMessage) => set(
      (state) => ({ messages: [...state.messages as TMessage[], message] })
    ),
    batchAddMessage: (messages: TMessage[]) => set(
      (state) => {
        const mergedMessages = _.uniqBy(
          _.concat(state.messages, messages),
          'id'
        ) as TMessage[]
        return { messages: mergedMessages }
      }
    ),
    clearMessages: () => set(
      () => ({ messages: [] })
    ),

    // messages queue
    setMessageQueue: (queue: TQueueMessage[]) => set(
      () => ({ queue })
    ),
    addQueueMessage: (item: TQueueMessage) => set(
      (state) => ({ queue: [...state.queue, item] })
    ),
    removeQueueMessage: (item: TQueueMessage) => set(
      (state) => {
        const queue = state.queue.filter(_i => item.id != item.id)
        return { queue }
      }
    )

  })
)

// SETTERS

export const useSetMessages = () => useMessagesStore(
  (state) => state.setMessages
)

export const useBatchAddMessages = () => useMessagesStore(
  (state) => state.batchAddMessage
)

export const useAddMessage = () => useMessagesStore(
  (state) => state.addMessage
)

export const useClearMessages = () => useMessagesStore(
  (state) => state.clearMessages
)

export const useSetMessageQueue = () => useMessagesStore(
  (state) => state.setMessageQueue
)

export const useAddQueueMessage = () => useMessagesStore(
  (state) => state.addQueueMessage
)

export const useRemoveQueueMessage = () => useMessagesStore(
  (state) => state.removeQueueMessage
)


// GETTERS

export const useGetMessages = () => useMessagesStore(
  (state) => state.messages
)

export const useGetMessageQueue = () => useMessagesStore(
  (state) => state.queue
)

export const useGetCurrentChatMessages = (chat: TChat) => useMessagesStore(
  (state) => {
    if (!state.messages) return []
    const filteresMessages = state.messages.filter(
      message => message.origin === chat.id
    )
    return filteresMessages
  }
)

export const useMessagesStoreSelectors = createSelectors(useMessagesStore)

export default useMessagesStore;