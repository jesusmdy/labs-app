import pb from "@/api";
import { useInboxStoreSelectors } from "@/store/inbox";
import { useBatchAddMessages } from "@/store/messages";
import { TMessage } from "@/types/messages";
import { KNOWN_COLLECTIONS } from "@/utils/collections";
import { parseReceivedMessage } from "@/utils/message";
import _ from "lodash";
import { RecordSubscription } from "pocketbase";
import { PropsWithChildren, useEffect } from "react";

export default function RealtimeMessagesListener({
  children,
}: PropsWithChildren) {
  const batchAddMessage = useBatchAddMessages();
  const { chats, updateChat } = useInboxStoreSelectors();

  function updateAssociatedChatLastMessage(message: TMessage) {
    const associatedChat = _.find(chats, { id: message.origin });
    if (associatedChat) {
      updateChat(associatedChat.id, {
        ...associatedChat,
        lastMessage: [message],
      });
    }
  }

  async function eventHandler(data: RecordSubscription<TMessage>) {
    const { action, record } = data;
    if (action === "create") {
      batchAddMessage([parseReceivedMessage(record)]);
      updateAssociatedChatLastMessage(record);
    }
  }

  function startListening() {
    pb.collection(KNOWN_COLLECTIONS.messages)
      .subscribe("*", eventHandler, {
        expand: "media, sender",
      })
      .catch(console.log);
  }

  function stopListening() {
    pb.collection(KNOWN_COLLECTIONS.messages).unsubscribe("*");
  }

  useEffect(() => {
    startListening();
    return () => stopListening();
  }, []);
  return children;
}
