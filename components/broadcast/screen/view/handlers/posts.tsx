import useBroadcastPosts from "@/hooks/query/useBroadcastPosts";
import useBroadcastStore from "@/store/broadcast";
import { PropsWithChildren, useEffect } from "react";

interface IBroadcastPostsHandler extends PropsWithChildren {
  broadcastId: string;
}

export default function BroadcastPostsHandler({
  children,
  broadcastId,
}: IBroadcastPostsHandler) {
  const { posts } = useBroadcastPosts(broadcastId);
  const { batchAddPosts } = useBroadcastStore();

  useEffect(() => {
    if (posts) {
      batchAddPosts(posts);
    }
  }, [posts]);

  return children;
}
