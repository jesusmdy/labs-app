import { View, StyleSheet } from 'react-native'
import React, { Fragment } from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import useBorderColor from "@/hooks/useBorderColor"
import { Divider, Text } from "react-native-paper"
import StartConversationButton from "@/components/conversation/new/start"
import useMD3Theme from "@/hooks/useMD3Theme"
import useColors from "@/hooks/useColors"

export default function InboxHeader() {
  const insets = useSafeAreaInsets()
  const theme = useMD3Theme()

  return (
    <Fragment>

      <View style={{
        ...styles.header,
        paddingTop: insets.top + 8,
        backgroundColor: theme.colors.background
      }}>
        <View
          style={{
            flex: 1,
          }}
        >
          <Text variant="titleMedium" style={{ flex: 1, color: theme.colors.outline }}>Conversations</Text>
        </View>
        <StartConversationButton />
      </View>
      <Divider />
    </Fragment>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 16,
    paddingBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    position: "relative"
  }
})
