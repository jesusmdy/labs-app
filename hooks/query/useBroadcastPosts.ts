import { getBroadcastPosts } from "@/utils/queries/broadcast"
import useSWR from "swr"

export default function useBroadcastPosts(broadcastId: string) {
  const {data, isLoading, error} = useSWR("/api/broadcast/posts", () => getBroadcastPosts(broadcastId))

  return {
    posts: data,
    isLoading, error,
  }
}