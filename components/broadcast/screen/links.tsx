import { View, StyleSheet } from 'react-native'
import React from 'react'
import { Button, Text } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"
import useMD3Theme from "@/hooks/useMD3Theme"

export default function BroadcastLinks() {
  const {colors} = useMD3Theme()
  return (
    <View style={style.wrapper}>
      <Button
        mode="contained-tonal"
        buttonColor={colors.primaryContainer}
        textColor={colors.primary}
        icon={({size, color}) => <Ionicons name="at" color={color} size={size} />}
      >
        <Text style={{ color: colors.primary }}>Everything</Text>
      </Button>
    </View>
  )
}

const style = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    gap: 8
  }
})
