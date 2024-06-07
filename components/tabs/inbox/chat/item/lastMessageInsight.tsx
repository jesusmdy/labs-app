import useAuth from "@/hooks/useAuth";
import useColors from "@/hooks/useColors";
import useIsMessageSender from "@/hooks/useIsMessageSender";
import useMD3Theme from "@/hooks/useMD3Theme";
import { TChat } from "@/types/chats";
import { TMessage } from "@/types/messages";
import { sizes } from "@/utils/spacing";
import { formatTimeDistance } from "@/utils/time";
import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface ILastMessageInsight {
  chat: TChat;
}

export interface IMessageCheckbox extends ILastMessageInsight {
  message: TMessage;
}

function MessageCheckbox({ message }: IMessageCheckbox) {
  const { user } = useAuth();
  const isSender = useIsMessageSender(user, message);
  const colors = useColors();
  if (!isSender) return void null;
  return (
    <Ionicons
      name="checkmark"
      size={sizes.defaultSizes.large}
      color={colors.tint}
    />
  );
}

function MessageDate({ message }: Pick<IMessageCheckbox, "message">) {
  const theme = useMD3Theme();
  const dateLabel = useMemo(() => {
    return formatTimeDistance(new Date(message.created), true);
  }, [message]);
  return (
    <Text variant="labelLarge" style={{ color: theme.colors.outline }}>
      {dateLabel}
    </Text>
  );
}

export default function LastMessageInsight({ chat }: ILastMessageInsight) {
  const lastMessage = _.first(chat.lastMessage);
  if (!lastMessage) return void null;
  return (
    <View style={styles.wrapper}>
      <MessageCheckbox chat={chat} message={lastMessage} />
      <MessageDate message={lastMessage} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    gap: sizes.defaultSizes.small / 2,
    alignItems: "center",
  },
});
