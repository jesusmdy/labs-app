import React, { Fragment } from 'react';
import { Stack } from 'expo-router';
import ChatTitle, { BackButton } from "@/components/conversation/chat/title";
import { Platform } from "react-native";

export default function ConversationLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="chat"
        options={{
          headerBackVisible: false,
          headerTitle: () => <Fragment />,
          // headerBlurEffect:,
          headerLeft: Platform.select({
            android: () => <ChatTitle />,
            ios: () => <ChatTitle />
          })
        }}
      />
      <Stack.Screen
        name="new/direct"
        options={{
          title: "Start conversation",
          headerLeft: () => <BackButton size={23} />
        }}
      />
      <Stack.Screen
        name="media"
        options={{
          headerBackTitle: "Conversation",
          title: "Media",
        }}
      />
    </Stack>
  );
}
