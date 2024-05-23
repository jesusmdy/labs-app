import { StyleSheet, TouchableOpacity } from "react-native"
import { TBroadcast } from "@/types/broadcast"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { sizes } from "@/utils/spacing"
import { View } from "react-native-ui-lib"
import { Text } from "react-native-paper"
import BroadcastItemIcon from "../list/item/icon"
import { useRouter } from "expo-router"
import { Ionicons } from "@expo/vector-icons"
import { useMemo } from "react"
import SubscriberActions from "./actions/subscriber"

export default function BroadcastHeader(
  {broadcast}: {
    broadcast: TBroadcast
  }
) {
  const insets = useSafeAreaInsets()
  const router = useRouter()

  const numSubscribersLabel = useMemo(
    () => {
      if (broadcast.subscribers === 0) return "No subscribers"
      if (broadcast.subscribers === 1) return "1 subscriber"
      return `${broadcast.subscribers} subscribers`
    },
    [broadcast.subscribers]
  )

  const headerWrapperStyles = {
    ...styles.headerWrapper,
    height: insets.top + sizes.defaultToolbar,
    backgroundColor: "rgba(25,25,25,.03)"
  }
  const headerStyles = {
    ...styles.header,
  }
  return (
    <View style={headerWrapperStyles}>
      <View style={headerStyles}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons size={20} name="chevron-back" />
        </TouchableOpacity>
        <BroadcastItemIcon broadcast={broadcast} size={30} />
        <View style={{ flex: 1 }}>
          <Text variant="titleSmall">{broadcast.title}</Text>
          <Text variant="bodySmall">{numSubscribersLabel}</Text>
        </View>
        <SubscriberActions broadcast={broadcast} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  headerWrapper: {
    justifyContent: "flex-end",
  },
  header: {
    height: sizes.defaultToolbar,
    paddingHorizontal: sizes.defaultPadding,
    flexDirection: "row",
    alignItems: "center",
    gap: 4
  },
  backButton: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  }
})
