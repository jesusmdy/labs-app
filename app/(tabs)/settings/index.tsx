import UserSettingsModule from "@/components/settings/modules/user";
import { sizes } from "@/utils/spacing";
import { StyleSheet, View } from "react-native";

export default function SettingsTabScreen() {
  return (
    <View style={styles.container}>
      <UserSettingsModule />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: sizes.defaultPadding,
  },
});
