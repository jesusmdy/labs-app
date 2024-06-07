import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { IBroadcastPost, TBroadcast } from "@/types/broadcast";
import { sizes } from "@/utils/spacing";
import useBorderColor from "@/hooks/useBorderColor";
import Title from "./title";
import PostContent from "./content";
import PostMedia from "./media";
import BroadcastItemIcon from "../../../list/item/icon";

export interface IBroadcastPostItem {
  post: IBroadcastPost;
  broadcast: TBroadcast;
}

export default function BroadcastPost({ post, broadcast }: IBroadcastPostItem) {
  const borderColor = useBorderColor();
  const wrapperStyles = {
    ...styles.wrapper,
    borderColor,
  };
  return (
    <View style={wrapperStyles}>
      <View>
        <BroadcastItemIcon
          broadcast={broadcast}
          size={sizes.defaultSizes.largeX2}
        />
      </View>
      <View style={styles.content}>
        <Title broadcast={broadcast} post={post} />
        <PostContent post={post} broadcast={broadcast} />
        <PostMedia post={post} broadcast={broadcast} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: sizes.defaultPadding,
    borderBottomWidth: 1,
    paddingVertical: sizes.defaultPadding,
    flexDirection: "row",
    gap: 6,
  },
  content: {
    gap: 4,
    flex: 1,
  },
});
