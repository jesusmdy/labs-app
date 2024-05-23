import Colors from "@/constants/Colors"
import { TBroadcast } from "@/types/broadcast"
import { Ionicons } from "@expo/vector-icons"
import { Button } from "react-native-ui-lib"

export default function SubscriberActions(
  {broadcast}: {
    broadcast: TBroadcast
  }
) {
  const colorScheme = Colors["dark"]
  return (
    <Button
      label="Subscribe"
      size="small"
      style={{
        gap: 4
      }}
      iconOnRight
      iconSource={
        (props) => <Ionicons name="notifications" size={16} color={colorScheme.text} />
      }
    />
  )
}