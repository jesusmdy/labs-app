import useBroadcastStore from "@/store/broadcast";
import _ from "lodash";
import { useMemo } from "react";

export default function useBroadcastLastPost(broadcastId: string) {
  const { posts } = useBroadcastStore();

  const lastPost = useMemo(() => {
    const sortedPosts = _.filter(_.sortBy(posts, "created"), {
      origin: broadcastId,
    });
    const post = _.last(sortedPosts);
    return post;
  }, [posts]);
  return lastPost;
}
