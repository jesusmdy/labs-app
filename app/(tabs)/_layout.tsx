import React, { Fragment } from 'react';
import { Tabs } from 'expo-router';

import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { Button, MD3Colors } from "react-native-paper";
import StartConversationButton from "@/components/conversation/new/start";
import RealtimeMessagesListener from "@/components/conversation/realtime/messages";
import { RssIcon } from "lucide-react-native";

export default function TabLayout() {
  return (
    <RealtimeMessagesListener>

      <Tabs
        screenOptions={{
          tabBarActiveTintColor: MD3Colors.primary50,
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
                name={
                  focused
                    ? "chatbubbles"
                    : "chatbubbles-outline"
                }
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="broadcast/index"
          options={{
            title: 'Broadcasts',
            headerShown: false,
            tabBarIcon: ({ color, focused, size }) => (
              <MaterialCommunityIcons
                name="broadcast"
                size={size}
                color={color}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="settings/index"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color, focused, size }) => (
              <Ionicons
                name={
                  focused
                    ? "cog"
                    : "cog-outline"
                }
                color={color}
                size={size}
              />
            ),
          }}
        />
      </Tabs>
    </RealtimeMessagesListener>
  );
}
