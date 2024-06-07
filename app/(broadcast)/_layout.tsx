import { Stack } from "expo-router";

export default function BroadcastLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="new"
        options={{
          title: "New broadcast channel",
        }}
      />
      <Stack.Screen
        name="view"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
