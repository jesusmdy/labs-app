import CustomBlurView from "@/components/common/blurView";
import { Icon } from "@/components/tabs/inbox/chat/item/icon";
import { Title } from "@/components/tabs/inbox/chat/item/item";
import useAuth from "@/hooks/useAuth";
import { useConversationStoreSelectors } from "@/store/conversation";
import { sizes } from "@/utils/spacing";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StyleSheet, View, ViewStyle } from "react-native";
import { IconButton } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export function BackButton({ size = 28 }: { size?: number }) {
  const router = useRouter();

  return (
    <IconButton
      onPress={() => router.back()}
      style={{
        marginRight: -8,
        marginLeft: -8,
      }}
      size={size}
      icon={({ color, size }) => (
        <Ionicons name="chevron-back" size={size} color={color} />
      )}
    />
  );
}

export default function ChatTitle() {
  const { user } = useAuth();
  const chat = useConversationStoreSelectors().chat;
  const { top } = useSafeAreaInsets();

  const headerStyle: ViewStyle = {
    ...styles.title,
  };

  const toolbarStyle: ViewStyle = {
    marginTop: top,
    height: sizes.defaultToolbar,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: sizes.defaultPadding,
    gap: sizes.defaultSizes.small,
  };

  if (!chat) return void null;

  return (
    <CustomBlurView style={headerStyle}>
      <View style={toolbarStyle}>
        <BackButton size={20} />
        <Icon chat={chat} user={user} size={sizes.defaultSizes.large * 2} />
        <Title chat={chat} user={user} />
      </View>
    </CustomBlurView>
  );
}

const styles = StyleSheet.create({
  title: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
