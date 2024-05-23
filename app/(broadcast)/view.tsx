import { View, Text } from 'react-native'
import React from 'react'
import { StatusBar } from "expo-status-bar"
import { useBroadcastStoreSelectors } from "@/store/broadcast"
import BroadcastHeader from "@/components/broadcast/screen/view/header"

export default function BroadcastViewScreen() {
  const {broadcast} = useBroadcastStoreSelectors()

  if (!broadcast) return (
    <View>
      <Text>No broadcast selected</Text>
    </View>
  )
  return (
    <View>
      <BroadcastHeader broadcast={broadcast} />
      <View>
        <Text>BroadcastViewScreen</Text>
      </View>
    </View>
  )
}