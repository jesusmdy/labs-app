import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { IChatItemComponentProps } from "./item";
import { useEffect, useMemo } from "react";
import _ from "lodash";
import useGetLastMessagePrefix from "@/hooks/useLastMessagePrefix";
import useGetLastMessageContent from "@/hooks/useGetLastMessageContent";
import { Ionicons } from "@expo/vector-icons";

export default function ChatItemContent({user, chat}: IChatItemComponentProps) {

  const lastMessage = useMemo(
    () => {
      return _.first(chat.lastMessage)
    },
    [chat]
  )

  const lastMessagePrefix = useGetLastMessagePrefix(user, chat, lastMessage)
  const lastMessageContent = useGetLastMessageContent(lastMessage)
  
  return (
    <View style={styles.item}>
      <Text variant="labelSmall">{lastMessagePrefix}</Text>
      {
        lastMessageContent && (
          <View style={styles.item}>
            {
              lastMessageContent.icon && (
                <Ionicons size={12} name={lastMessageContent.icon as any} />
              )
            }
            <Text variant="labelSmall">{lastMessageContent.content}</Text>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  item: { flexDirection: "row", alignItems: "center", gap: 4 }
})
