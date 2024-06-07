import useMD3Theme from "@/hooks/useMD3Theme";
import { KNOWN_ROUTES } from "@/utils/routes";
import { sizes } from "@/utils/spacing";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";
import { View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function EmptyBroadcastList() {
  const theme = useMD3Theme();
  return (
    <View
      style={{
        flex: 1,
        padding: sizes.defaultPadding,
        justifyContent: "center",
        alignItems: "center",
        gap: sizes.defaultSizes.large,
      }}
    >
      <Ionicons
        name="snow-outline"
        size={sizes.defaultSizes.largeX2 * 4}
        color={theme.colors.outline}
        style={{ marginBottom: sizes.defaultSizes.large }}
      />
      <Text variant="titleMedium">You are not following any community</Text>
      <Link href={KNOWN_ROUTES.broadcast.new}>
        <Button mode="contained-tonal">Create a community</Button>
      </Link>
    </View>
  );
}
