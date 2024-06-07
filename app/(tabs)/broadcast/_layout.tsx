import { Stack } from "expo-router";

export default function BroadcastLayout() {
  return (
    <Stack initialRouteName="list">
      <Stack.Screen
        name="new"
        options={{
          headerShown: true,
          presentation: "modal",
          headerTitle: "Write a post",
        }}
      />
      <Stack.Screen
        name="create"
        options={{
          headerShown: true,
          presentation: "modal",
          headerTitle: "Start a new channel",
        }}
      />
      <Stack.Screen
        name="list"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
