import { View, Text, FlatList, StyleSheet } from "react-native";
import React from "react";
import { TBroadcast } from "@/types/broadcast";
import { useGetPostsByBroadcast } from "@/store/broadcast";
import BroadcastPost from "./post/item";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import useMD3Theme from "@/hooks/useMD3Theme";

export default function BroadcastPostsList({
  broadcast,
}: {
  broadcast: TBroadcast;
}) {
  const posts = useGetPostsByBroadcast(broadcast.id);
  const insets = useSafeAreaInsets();
  const theme = useMD3Theme();
  return (
    <FlatList
      data={posts}
      renderItem={({ item }) => (
        <BroadcastPost post={item} broadcast={broadcast} />
      )}
      keyExtractor={(item) => item.id}
      scrollEnabled
      style={{
        paddingBottom: broadcast.isAuthor ? void null : insets.bottom,
        backgroundColor: theme.colors.surface,
      }}
    />
  );
}
