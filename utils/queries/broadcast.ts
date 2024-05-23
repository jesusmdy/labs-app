import pb from "@/api"
import { KNOWN_COLLECTIONS } from "../collections"
import { IBroadcastSubscription } from "@/types/broadcast"


export const getBroadcastListService = () => pb.send(
  "api/services/broadcast",
  {
    method: "GET"
  }
)


export const getBroadcastList = () => pb.collection(KNOWN_COLLECTIONS.broadcast).getFullList({
  requestKey: null,
  expand: "author, icon"
})

export const getBroadcast = (broadcastId: string) => pb.send(
  `api/services/broadcast/${broadcastId}`,
  {
    method: "GET"
  }
)


export const getBroadcastPosts = (broadcastId: string) => pb.send(
  `api/services/broadcast/${broadcastId}/posts`,
  {
    method: "GET"
  }
)

export const getBroadcastSubscription = (broadcastId: string): Promise<IBroadcastSubscription> => pb.send(
  `api/services/broadcast/${broadcastId}/subscription`,
  {
    method: "POST"
  }
)

export const setBroadcastSubscription = (broadcastId: string): Promise<IBroadcastSubscription> => pb.send(
  `api/services/broadcast/${broadcastId}/subscription`,
  {
    method: "PUT"
  }
)

export const unsetBroadcastSubscription = (broadcastId: string): Promise<null> => pb.send(
  `api/services/broadcast/${broadcastId}/subscription`,
  {
    method: "DELETE"
  }
)

export interface ICreateBroascastPostProps {
  content: string,
  media: string[],
  broadcastId: string
}

export const createBroadcastPost = (post: ICreateBroascastPostProps) => {
  return pb.send(
    `/api/services/broadcast/${post.broadcastId}/posts`,
    {
      method: "PUT",
      requestKey: null,
      body: {
        content: post.content,
        media: post.media
      }
    }
  )
}

export interface ICreateBroascastProps {
  title: string,
  description?: string,
  icon?: string
}

export const createBroadcast = (item: ICreateBroascastProps) => {
  return pb.send(
    "/api/services/broadcast",
    {
      method: "PUT",
      requestKey: null,
      body: {
        title: item.title,
        description: item.description,
        icon: item.icon,
      }
    }
  )
}