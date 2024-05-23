import { Icon } from "@/components/tabs/inbox/chat/item/icon";
import { Title } from "@/components/tabs/inbox/chat/item/item";
import useAuth from "@/hooks/useAuth";
import useBorderColor from "@/hooks/useBorderColor";
import usePlatform from "@/hooks/usePlatform";
import { useConversationStoreSelectors } from "@/store/conversation";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";
import { IconButton } from "react-native-paper";

export function BackButton({
  size = 28
}: {
  size?: number
}) {

  const router = useRouter()

  return (
    <IconButton
      onPress={
        () => router.back()
      }
      style={{
        marginRight: -8,
        marginLeft: -8,
      }}
      size={size}
      icon={
        ({color, size}) => (
          <Ionicons
            name="chevron-back"
            size={size}
            color={color}
          />
        )
      }
    />
  )
}

export default function ChatTitle() {
  const {user} = useAuth()
  const {isIos} = usePlatform()
  const chat = useConversationStoreSelectors().chat
  const borderColor = useBorderColor()

  if (!chat) return void null

  return (
    <View
      style={{
        ...styles.title,
        borderColor,
      }}
    >
      <BackButton size={20} />
      <Icon
        chat={chat}
        user={user}
        size={
          isIos ? 32 : 38
        }
      />
      <Title chat={chat} user={user} />
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  }
})
