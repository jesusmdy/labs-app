import useMD3Theme from "@/hooks/useMD3Theme"
import useBroadcastStore from "@/store/broadcast"
import { TBroadcast } from "@/types/broadcast"
import { Ionicons } from "@expo/vector-icons"
import { Button } from "react-native-ui-lib"

export default function SubscriberActions(
  {broadcast}: {
    broadcast: TBroadcast
  }
) {
  const {colors} = useMD3Theme()
  const {broadcastSubscription: subscription} = useBroadcastStore()
  
  if (
    broadcast.isAuthor
  ) return void null

  if (subscription) {
    return (
      <Button
        style={{
          padding: 8
        }}
        backgroundColor={colors.primaryContainer}
        color={colors.onPrimary}
        onPress={() => {
          console.log("unsubscribe")
        }}
        iconSource={
          () => (
            <Ionicons name="notifications-off" size={16} color={colors.onPrimaryContainer} />
          )
        }
      />
    )
  }
  return (
    <Button
      label="Subscribe"
      size="small"
      style={{
        gap: 4
      }}
      backgroundColor={colors.primary}
      color={colors.onPrimary}
    />
  )
}