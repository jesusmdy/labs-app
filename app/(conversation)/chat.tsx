import { ImageBackground, SafeAreaView, StyleSheet, View } from "react-native";
import React from "react";
import ConversationEditor from "@/components/conversation/chat/editor";
import { useConversationStoreSelectors } from "@/store/conversation";
import Messages from "@/components/conversation/chat/messages";
import { ChatMessagesHandler } from "@/components/conversation/chat/handler";
import RealtimeMessagesListener from "@/components/conversation/realtime/messages";

export default function ChatScreen() {
  const chat = useConversationStoreSelectors().chat;
  if (!chat) return void null;

  return (
    <RealtimeMessagesListener>
      <ChatMessagesHandler chat={chat}>
        <ImageBackground>
          <View style={styles.wrapper}>
            <Messages chat={chat} />
            <ConversationEditor chat={chat} />
          </View>
        </ImageBackground>
      </ChatMessagesHandler>
    </RealtimeMessagesListener>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "column",
    height: "100%",
    backgroundColor: "transparent",
  },
});
