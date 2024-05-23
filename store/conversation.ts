import { TChat } from "@/types/chats";
import { create } from "zustand";
import { createSelectors } from "./utils/createSelectors";

interface IConversationStoreProps {
  chat: TChat | undefined,
  setChat: (chat: TChat) => void,
  clearChat: () => void
}

const useConversationStore = create<IConversationStoreProps>(
  (set) => ({
    chat: void null,
    setChat: (chat) => set(
      (state) => ({ chat })
    ),
    clearChat: () => set(
      (state) => ({ chat: void null })
    )
  })
)

export const useConversationStoreSelectors = createSelectors(useConversationStore)

export default useConversationStore
