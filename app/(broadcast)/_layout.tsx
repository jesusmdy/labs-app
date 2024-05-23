import useBroadcastHeaderOptions from "@/hooks/headers/useBroadcastHeader";
import { Stack } from "expo-router";

export default function BroadcastLayout() {
  const broadcastViewHeaderOptions = useBroadcastHeaderOptions()
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
          headerShown: false
        }}
      />
    </Stack>
  );
}
