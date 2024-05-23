import { FlatList, ImageBackground, StyleSheet } from "react-native"
import _ from "lodash";
import ChatItem from "./item/item";
import { useInboxStoreSelectors } from "@/store/inbox";
import { Text } from "react-native-paper";
import { useMemo } from "react";
import { sortChatsByLatestMessage } from "@/utils/chat";
import useColors from "@/hooks/useColors";
import useMD3Theme from "@/hooks/useMD3Theme";

export default function ChatList() {
  const {chats} = useInboxStoreSelectors()
  const colors =  useColors()
  const theme = useMD3Theme()

  const sortedChats = useMemo(
    () => sortChatsByLatestMessage(chats),
    [chats]
  )

  if (!sortedChats || sortedChats.length === 0) {
    return (
      <Text>No chats</Text>
    )
  }

  return (
    <FlatList
      data={sortedChats}
      style={styles.wrapper}
      renderItem={
        ({item}) => <ChatItem chat={item} />
      }
      keyExtractor={item => item.id}
      scrollEnabled
    />
  )
}

const styles = StyleSheet.create({
  wrapper: {
  }
})