import pb from "@/api"
import { TQueueMessage } from "@/types/messages"

interface TExtendedQueueMessage extends Omit<TQueueMessage, 'media'> {
  media: (string | undefined)[]
}

export const sendMessage = (item: TExtendedQueueMessage) => {
  return pb.send(
    `/api/services/inbox/${item.inboxId}/messages`,
    {
      method: "PUT",
      requestKey: item.id,
      body: {
        content: item.content,
        media: item.media
      }
    }
  )
}