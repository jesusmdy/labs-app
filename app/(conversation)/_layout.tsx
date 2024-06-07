import { Stack } from "expo-router";
import ChatTitle, { BackButton } from "@/components/conversation/chat/title";

export default function ConversationLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="chat"
        options={{
          headerBackVisible: false,
          header: () => <ChatTitle />,
        }}
      />
      <Stack.Screen
        name="new/direct"
        options={{
          title: "Start conversation",
          headerLeft: () => <BackButton size={23} />,
        }}
      />
      <Stack.Screen
        name="media"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
