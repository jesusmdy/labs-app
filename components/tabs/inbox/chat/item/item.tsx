import { StyleSheet, TouchableOpacity, View } from "react-native"
import React, { FC, Fragment, useMemo } from "react"
import { TChat } from "@/types/chats"
import { Avatar, Divider, Text } from "react-native-paper"
import { TUser } from "@/types/users"
import useAuth from "@/hooks/useAuth"
import { getChatTitle, getChatUserDetails, getOtherMember } from "@/utils"
import pb from "@/api"
import { Ionicons } from "@expo/vector-icons"
import ChatItemContent from "./content"
import { useRouter } from "expo-router"
import { KNOWN_ROUTES } from "@/utils/routes"
import { useConversationStoreSelectors } from "@/store/conversation"
import { Icon } from "./icon"

interface IChatItemProps {
  chat: TChat
}

export interface IChatItemComponentProps {
  chat: IChatItemProps["chat"],
  user: TUser
}

export const Title: FC<IChatItemComponentProps> = ({chat, user}) => {
  const details = getChatUserDetails(chat, user)

  const title = useMemo(
    () => {
      if (chat.isGroup) return getChatTitle(chat, user)
      if (details) return details.name
    },
    [chat, user]
  )

  
  return (
    <Text variant="labelLarge">{title}</Text>
  )
}

export default function ChatItem({chat}: IChatItemProps) {
  const setChat = useConversationStoreSelectors().setChat
  const {user} = useAuth()
  const router = useRouter()

  const handlePress = () => {
    router.push(KNOWN_ROUTES.conversation.chat)
    setChat(chat)
  }

  return (
    <Fragment>
      <TouchableOpacity
        onPress={handlePress}
      >
        <View style={styles.item}>
          <Icon chat={chat} user={user} />
          <View>
            <Title chat={chat} user={user} />
            <ChatItemContent chat={chat} user={user} />
          </View>
        </View>
      </TouchableOpacity>
    </Fragment>
  )
}

const styles = StyleSheet.create({
  item: {
    marginHorizontal: 16,
    paddingVertical: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
})
