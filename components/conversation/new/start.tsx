import { IconButton } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"
import { Link } from "expo-router"
import { KNOWN_ROUTES } from "@/utils/routes"

export default function StartConversationButton() {
  return (
    <Link href={KNOWN_ROUTES.conversation.new.direct}>
      <IconButton
        mode="contained"
        size={16}
        style={{ margin: 0 }}
        icon={({size, color}) => (
          <Ionicons
            size={size + 4}
            color={color}
            name="add"
          />
        )}
      />
    </Link>
  )
}