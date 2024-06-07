import { StyleSheet, View, ViewStyle } from "react-native";
import { TChat } from "@/types/chats";
import { TMessage } from "@/types/messages";
import { Text } from "react-native-paper";
import useAuth from "@/hooks/useAuth";
import { formatMessageTime } from "@/utils/message";
import useIsMessageSender from "@/hooks/useIsMessageSender";
import _ from "lodash";
import Media from "@/components/conversation/chat/message/media";
import UnavailableMessage from "./unavailable";
import Content from "./content";
import { sizes } from "@/utils/spacing";
import MessageStatus from "./status";

interface IMessageItem {
  chat: TChat;
  message: TMessage;
}

export interface IMessageItemComponent extends Pick<IMessageItem, "message"> {
  isSender: boolean;
}

function Created(props: IMessageItemComponent) {
  const { message } = props;
  const time = formatMessageTime(message);
  return <Text variant="labelSmall">{time}</Text>;
}

export default function MessageItem(props: IMessageItem) {
  const { message } = props;
  const { user } = useAuth();
  const isSender = useIsMessageSender(user, message);

  const contentAlignment = isSender ? "flex-end" : "flex-start";

  const footerStyles: ViewStyle = {
    ...styles.footer,
    justifyContent: contentAlignment,
  };

  const messageStyles: ViewStyle = {
    ...styles.wrapper,
    alignItems: contentAlignment,
  };

  if (message.content === "" && message.media.length === 0)
    return <UnavailableMessage />;

  return (
    <View style={messageStyles}>
      <Media message={message} />
      <Content message={message} isSender={isSender} />
      <View style={footerStyles}>
        <Created message={message} isSender={isSender} />
        <MessageStatus message={message} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.defaultSizes.small / 2,
  },
});
