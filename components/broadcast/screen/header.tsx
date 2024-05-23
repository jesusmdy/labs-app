import { View, StyleSheet } from 'react-native'
import React from 'react'
import { useSafeAreaInsets } from "react-native-safe-area-context"
import _ from "lodash";
import useBorderColor from "@/hooks/useBorderColor";
import useMD3Theme from "@/hooks/useMD3Theme";
import {Button, Text} from "react-native-ui-lib"
import { useRouter } from "expo-router";
import { KNOWN_ROUTES } from "@/utils/routes";

export const TOOLBAR_HEIGHT = 50;

export default function BroadcastHeader() {
  const {top} = useSafeAreaInsets();
  const borderColor = useBorderColor()
  const theme = useMD3Theme()
  const router = useRouter()

  return (
    <View
      style={
        {
          ...styles.wrapper, borderColor,
          height: top + TOOLBAR_HEIGHT,
          backgroundColor: theme.colors.background
        }
      }
    >
      <View style={styles.content}>
        <Text style={{ flex: 1, color: theme.colors.outline }}>Broadcasts</Text>
        <Button
          label="Create"
          size="small"
          link
          avoidInnerPadding
          labelStyle={{ color: theme.colors.primary }}
          onPress={() => router.push(KNOWN_ROUTES.broadcast.new)}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderBottomWidth: 1,
    justifyContent: "flex-end"
  },
  content: {
    height: TOOLBAR_HEIGHT,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16
  }
})
