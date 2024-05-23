import { TChat } from "@/types/chats"
import _ from "lodash"
import { create } from "zustand"
import { createSelectors } from "./utils/createSelectors"

interface iInboxStore {
  chats: TChat[],
  setChats: (chats: TChat[]) => void,
  addChat: (chat: TChat) => void,
  clearChats: () => void,
  updateChat: (id: string, updated: TChat) => void,
  batchAddChats: (chats: TChat[]) => void
}

const useInboxStore = create<iInboxStore>(
  (set) => ({
    chats: [],
    setChats: (chats: TChat[]) => set(
      () => ({ chats })
    ),
    addChat: (chats: TChat) => set(
      (state) => {
        const mergedChats = _.uniqBy(
          _.concat(state.chats, chats),
          'id'
        ) as TChat[]
        return { chats: mergedChats }
      }
    ),
    batchAddChats: (chats: TChat[]) => set(
      (state) => {
        const mergedChats = _.uniqBy(
          _.concat(state.chats, chats),
          'id'
        ) as TChat[]
        return { chats: mergedChats }
      }
    ),
    updateChat: (id: string, updated: TChat) => set(
      (state) => {
        const chats = _.map(state.chats, chat => {
          if (chat.id === id) return updated
          return chat
        })
        return { chats }
      }
    ),
    removeChat: (chat: TChat) => set(
      (state) => {
        const chats = _.remove(state.chats, { id: chat.id })
        return { chats }
      }
    ),
    clearChats: () => set(
      () => ({ chats: [] })
    ),
  })
)

// setter

export const useSetChats = () => useInboxStore(state => state.setChats)
export const useAddChat = () => useInboxStore(state => state.addChat)
export const useUpdateChat = () => useInboxStore(state => state.updateChat)
export const useBatchAddChats = () => useInboxStore(state => state.batchAddChats)

// getter

export const useInboxChats = () => useInboxStore(state => state.chats)

export const useGetChatById = (chatId: string) => useInboxStore(
  (state) => {
    const chat = _.find(state.chats, { id: chatId })
    return chat
  }
)

export const useInboxStoreSelectors = createSelectors(useInboxStore)

export default useInboxStore