import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { IChatItemComponentProps } from "./item";
import { useMemo } from "react";
import _ from "lodash";
import useGetLastMessagePrefix from "@/hooks/useLastMessagePrefix";
import useGetLastMessageContent from "@/hooks/useGetLastMessageContent";
import { Ionicons } from "@expo/vector-icons";
import useMD3Theme from "@/hooks/useMD3Theme";
import { sizes } from "@/utils/spacing";

export default function ChatItemContent({
  user,
  chat,
}: IChatItemComponentProps) {
  const { colors } = useMD3Theme();

  const lastMessage = useMemo(() => {
    return _.first(chat.lastMessage);
  }, [chat]);

  const lastMessagePrefix = useGetLastMessagePrefix(user, chat, lastMessage);
  const lastMessageContent = useGetLastMessageContent(lastMessage);

  return (
    <View style={styles.item}>
      <Text variant="bodyMedium" style={{ color: colors.outline }}>
        {lastMessagePrefix}
      </Text>
      {lastMessageContent && (
        <View style={styles.item}>
          {lastMessageContent.icon && (
            <Ionicons
              size={sizes.defaultSizes.large}
              name={lastMessageContent.icon as any}
              color={colors.outline}
            />
          )}
          <Text variant="bodyMedium" style={{ color: colors.outline }}>
            {lastMessageContent.content}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
  },
});
