import useBorderColor from "@/hooks/useBorderColor";
import useMD3Theme from "@/hooks/useMD3Theme";
import { sizes } from "@/utils/spacing";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function UnavailableMessage() {
  const borderColor = useBorderColor();
  const theme = useMD3Theme();
  return (
    <View style={{ flexDirection: "row" }}>
      <View
        style={{
          ...styles.wrapper,
          borderColor,
        }}
      >
        <Ionicons
          name="information-circle-outline"
          size={sizes.defaultSizes.medium}
          color={theme.colors.onSurface}
        />
        <Text variant="labelSmall">Message unavailable</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    paddingVertical: sizes.defaultSizes.small / 2,
    paddingHorizontal: sizes.defaultSizes.small,
    flexDirection: "row",
    borderRadius: sizes.defaultBorderRadiuses.large,
    alignItems: "center",
    gap: sizes.defaultSizes.small / 2,
    marginVertical: sizes.defaultSizes.small,
  },
});
