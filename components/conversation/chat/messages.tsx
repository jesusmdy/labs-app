import { useGetCurrentChatMessages } from "@/store/messages";
import { TChat } from "@/types/chats";
import _ from "lodash";
import { StyleSheet, FlatList, ViewStyle } from "react-native";
import { useMemo } from "react";
import { MessagesGroup } from "./message/group";
import ChatTitle from "./title";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { sizes } from "@/utils/spacing";
import ConversationEditor from "./editor";

export default function Messages(props: { chat: TChat }) {
  const { chat } = props;
  const messageList = useGetCurrentChatMessages(chat);

  const groupedMessages = useMemo(() => {
    const groups = _.groupBy(_.sortBy(messageList, "created"), (i) =>
      _.first(i.created.split(" ")),
    );
    return _.toArray(groups);
  }, [messageList]);

  return (
    <FlatList
      nestedScrollEnabled
      contentContainerStyle={styles.contentContainer}
      data={_.reverse(groupedMessages)}
      renderItem={({ item }) => <MessagesGroup messages={item} chat={chat} />}
      inverted
    />
  );
}

const styles = StyleSheet.create({
  scrollArea: {},
  contentContainer: {
    paddingHorizontal: 18,
  },
});
