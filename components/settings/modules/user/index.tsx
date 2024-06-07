import useAuth from "@/hooks/useAuth";
import { sizes } from "@/utils/spacing";
import { StyleSheet, View } from "react-native";
import { Divider, Text } from "react-native-paper";
import AvatarModule from "./avatar";
import LogoutModule from "./logout";
import useMD3Theme from "@/hooks/useMD3Theme";

export default function UserSettingsModule() {
  const { user } = useAuth();
  const theme = useMD3Theme();
  const wrapperStyles = {
    ...styles.wrapper,
    backgroundColor: theme.colors.background,
  };
  return (
    <View style={wrapperStyles}>
      <View style={styles.content}>
        <AvatarModule />
        <View>
          <Text variant="bodyLarge">{user.name}</Text>
          <Text variant="labelLarge">@{user.username}</Text>
        </View>
      </View>
      <View>
        <Divider />
        <LogoutModule />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: sizes.defaultBorderRadiuses.medium,
    padding: sizes.defaultPadding,
    gap: sizes.defaultSizes.large,
  },
  content: {
    flexDirection: "row",
    gap: sizes.defaultSizes.small,
    alignItems: "center",
  },
});
