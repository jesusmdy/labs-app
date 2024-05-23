import { TBroadcast } from "@/types/broadcast"
import { sizes } from "@/utils/spacing"
import { StyleSheet } from "react-native"
import { Text } from "react-native-paper"
import { Colors, Drawer, TouchableOpacity, View } from "react-native-ui-lib"
import BroadcastItemIcon from "./icon"
import { useRouter } from "expo-router"
import { KNOWN_ROUTES } from "@/utils/routes"
import { useBroadcastStoreSelectors } from "@/store/broadcast"

export interface IBroadcastItem {
  broadcast: TBroadcast,
}

export default function BroadcastItem(
  {broadcast}: IBroadcastItem
) {
  const {setBroadcast} = useBroadcastStoreSelectors()
  const router = useRouter()
  function handlePress() {
    setBroadcast(broadcast)
    router.push(KNOWN_ROUTES.broadcast.view)
  }

  return (
    <Drawer
      rightItems={[{text: 'Read', background: Colors.blue30, onPress: () => console.log('read pressed')}]}
      leftItem={{text: 'Delete', background: Colors.red30, onPress: () => console.log('delete pressed')}}
    >
      <TouchableOpacity
        onPress={handlePress}
      >
        <View
          style={styles.wrapper}
        >
          <BroadcastItemIcon broadcast={broadcast} size={40} />
          <View>
            <Text variant="bodyMedium">{broadcast.title}</Text>
            <Text variant="bodySmall">Started broadcast</Text>
          </View>
        </View>
      </TouchableOpacity>
    </Drawer>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    height: sizes.defaultToolbar,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: sizes.defaultPadding,
    marginTop: sizes.defaultPadding / 2,
    gap: 8
  }
})
