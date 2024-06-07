import { StyleSheet, TouchableOpacity, View } from "react-native";
import React, { FC, Fragment, useMemo } from "react";
import { TChat } from "@/types/chats";
import { Text } from "react-native-paper";
import { TUser } from "@/types/users";
import useAuth from "@/hooks/useAuth";
import { getChatTitle, getChatUserDetails } from "@/utils";
import ChatItemContent from "./content";
import { useRouter } from "expo-router";
import { KNOWN_ROUTES } from "@/utils/routes";
import { useConversationStoreSelectors } from "@/store/conversation";
import { Icon } from "./icon";
import { sizes } from "@/utils/spacing";
import LastMessageInsight from "./lastMessageInsight";
import useBorderColor from "@/hooks/useBorderColor";

interface IChatItemProps {
  chat: TChat;
}

export interface IChatItemComponentProps {
  chat: IChatItemProps["chat"];
  user: TUser;
}

export const Title: FC<IChatItemComponentProps> = ({ chat, user }) => {
  const details = getChatUserDetails(chat, user);

  const title = useMemo(() => {
    if (chat.isGroup) return getChatTitle(chat, user);
    if (details) return details.name;
  }, [chat, user]);

  return <Text variant="bodyLarge">{title}</Text>;
};

export default function ChatItem({ chat }: IChatItemProps) {
  const setChat = useConversationStoreSelectors().setChat;
  const { user } = useAuth();
  const router = useRouter();
  const borderColor = useBorderColor();

  const handlePress = () => {
    router.push(KNOWN_ROUTES.conversation.chat);
    setChat(chat);
  };

  return (
    <Fragment>
      <TouchableOpacity onPress={handlePress}>
        <View style={styles.item}>
          <Icon chat={chat} user={user} size={52} />
          <View style={{ ...styles.contentWrapper, borderColor }}>
            <View style={styles.titleWrapper}>
              <Title chat={chat} user={user} />
              <View style={{ flex: 1 }} />
              <LastMessageInsight chat={chat} />
            </View>
            <ChatItemContent chat={chat} user={user} />
          </View>
        </View>
      </TouchableOpacity>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  item: {
    minHeight: sizes.defaultToolbar,
    paddingHorizontal: sizes.defaultPadding,
    marginTop: sizes.defaultPadding / 2,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  contentWrapper: {
    flex: 1,
    borderBottomWidth: 1,
    height: "100%",
  },
  titleWrapper: {
    flexDirection: "row",
  },
});
