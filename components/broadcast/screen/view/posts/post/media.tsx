import { FlatList, useWindowDimensions } from "react-native";
import React from "react";
import { IBroadcastPostItem } from "./item";
import { TMedia } from "@/types/media";
import Media from "@/components/media";
import _ from "lodash";
import { useRouter } from "expo-router";
import { useMediaViewerSelectors } from "@/store/media";
import { KNOWN_ROUTES } from "@/utils/routes";
import { TouchableOpacity } from "react-native-ui-lib";

export default function PostMedia({ post }: IBroadcastPostItem) {
  const { width } = useWindowDimensions();
  const computedSize = width / 2;
  const router = useRouter();
  const { setMedia, setMediaList } = useMediaViewerSelectors();

  function handlePress(media: TMedia) {
    setMedia(media);
    setMediaList(post.expand?.media as TMedia[]);
    router.push(KNOWN_ROUTES.conversation.media);
  }
  if (post.media.length === 0) return void null;
  return (
    <FlatList
      data={post.expand.media}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => handlePress(item)}
          style={{ marginRight: 8 }}
        >
          <Media
            media={item}
            mediaList={_.get(post.expand, "media", [])}
            dimensions={{
              width: computedSize,
              height: computedSize,
            }}
          />
        </TouchableOpacity>
      )}
      horizontal
      keyExtractor={(i) => i.id}
      style={{ gap: 8 }}
    />
  );
}
