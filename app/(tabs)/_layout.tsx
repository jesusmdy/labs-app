import { Tabs } from "expo-router";

import { useClientOnlyValue } from "@/components/useClientOnlyValue";
import { Ionicons } from "@expo/vector-icons";
import useMD3Theme from "@/hooks/useMD3Theme";
import { Fragment } from "react";

export default function TabLayout() {
  const theme = useMD3Theme();
  return (
    <Fragment>
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: theme.colors.primary,
          headerShown: useClientOnlyValue(false, true),
        }}
      >
        <Tabs.Screen
          name="inbox/index"
          options={{
            headerShown: false,
            title: "Inbox",
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name={focused ? "chatbubbles" : "chatbubbles-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="broadcast"
          options={{
            title: "Community",
            headerShown: false,
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name={focused ? "people" : "people-outline"}
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings/index"
          options={{
            title: "Settings",
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name={focused ? "cog" : "cog-outline"}
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tabs>
    </Fragment>
  );
}
