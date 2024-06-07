import useBroadcastStore from "@/store/broadcast";
import _ from "lodash";
import { useMemo } from "react";
import { FlatList, View } from "react-native";
import BroadcastPost from "../view/posts/post/item";
import { IBroadcastPost } from "@/types/broadcast";
import useAuth from "@/hooks/useAuth";
import BroadcastHeader from "../header";
import EmptyBroadcastList from "../list/empty";

export default function BroadcastPostsByFilter() {
  const { broadcastFilter, posts, broadcastList } = useBroadcastStore();
  const { user } = useAuth();

  const filters = {
    everything: (post: IBroadcastPost) => post,
    following: (post: IBroadcastPost) => {
      return post.author !== user.id;
    },
  };

  const filteredPosts = useMemo(() => {
    return _.filter(posts, filters[broadcastFilter as never]);
  }, [broadcastFilter]);

  return (
    <FlatList
      data={filteredPosts}
      renderItem={({ item }) => (
        <BroadcastPost post={item} broadcast={item.expand.origin} />
      )}
      ListHeaderComponent={BroadcastHeader}
      stickyHeaderIndices={[0]}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ flex: 1 }}
      ListEmptyComponent={<EmptyBroadcastList />}
      scrollEnabled
      bounces={false}
    />
  );
}
