import React from 'react';
import { Redirect, Stack } from 'expo-router';
import useAuth, { STATUS } from "@/hooks/useAuth";
import { View, Text } from "react-native";
import { KNOWN_ROUTES } from "@/utils/routes";

export default function IdentifyLayout() {
  const {status} = useAuth()

  if (status === STATUS.UNKNOWN) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    )
  }
  if (status === STATUS.AUTHED) {
    return <Redirect href={KNOWN_ROUTES.tabs.inbox} />
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
    </Stack>
  );
}
