import { FlatList, StyleSheet } from "react-native";
import _ from "lodash";
import ChatItem from "./item/item";
import { useInboxStoreSelectors } from "@/store/inbox";
import { Text } from "react-native-paper";
import { useMemo } from "react";
import { sortChatsByLatestMessage } from "@/utils/chat";
import { sizes } from "@/utils/spacing";

export default function ChatList() {
  const { chats } = useInboxStoreSelectors();

  const sortedChats = useMemo(() => sortChatsByLatestMessage(chats), [chats]);

  if (!sortedChats || sortedChats.length === 0) {
    return <Text>No chats</Text>;
  }

  return (
    <FlatList
      data={sortedChats}
      style={styles.wrapper}
      contentContainerStyle={{ gap: sizes.defaultSizes.small }}
      renderItem={({ item }) => <ChatItem chat={item} />}
      keyExtractor={(item) => item.id}
      scrollEnabled
    />
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: sizes.defaultSizes.small,
  },
});
