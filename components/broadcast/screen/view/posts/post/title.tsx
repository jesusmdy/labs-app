import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IBroadcastPostItem } from "./item";
import { Text } from "react-native-paper";
import { formatTimeDistance } from "@/utils/time";
import useMD3Theme from "@/hooks/useMD3Theme";
import { useRouter } from "expo-router";
import { KNOWN_ROUTES } from "@/utils/routes";
import useBroadcastStore from "@/store/broadcast";

export default function Title({ post, broadcast }: IBroadcastPostItem) {
  const formattedDate = formatTimeDistance(new Date(post.created));
  const { setBroadcast } = useBroadcastStore();
  const theme = useMD3Theme();

  const router = useRouter();

  const handlePress = () => {
    setBroadcast(broadcast);
    router.push(KNOWN_ROUTES.broadcast.view);
  };
  return (
    <View style={styles.title}>
      <TouchableOpacity onPress={handlePress}>
        <Text variant="labelMedium" style={styles.broadcastName}>
          {broadcast.title}
        </Text>
      </TouchableOpacity>
      <Text variant="labelMedium">·</Text>
      <Text variant="labelMedium" style={{ color: theme.colors.outline }}>
        {formattedDate}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
  broadcastName: {
    fontWeight: "bold",
  },
});
