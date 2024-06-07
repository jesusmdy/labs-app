import { View, StyleSheet, useColorScheme } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import _ from "lodash";
import { Button } from "react-native-ui-lib";
import { useRouter } from "expo-router";
import { KNOWN_ROUTES } from "@/utils/routes";
import { Text } from "react-native-paper";
import { sizes } from "@/utils/spacing";
import { BlurView } from "@react-native-community/blur";
import { BLUR_AMMOUNT } from "@/utils/blur";
import BroadcastTabs from "./tabs";
import WriteBroadcastButton from "./new/write";

export const TOOLBAR_HEIGHT = 50;

export default function BroadcastHeader() {
  const { top } = useSafeAreaInsets();
  const router = useRouter();
  const colorScheme = useColorScheme();

  return (
    <BlurView blurType={colorScheme ?? "light"} blurAmount={BLUR_AMMOUNT}>
      <View
        style={{
          ...styles.wrapper,
          height: top + sizes.defaultToolbar,
        }}
      >
        <View style={styles.content}>
          <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
            Community
          </Text>
          <View style={{ flexDirection: "row", gap: sizes.defaultSizes.small }}>
            <Button
              label="Create"
              size="small"
              link
              onPress={() => router.push(KNOWN_ROUTES.broadcast.new)}
            />
            <WriteBroadcastButton />
          </View>
        </View>
      </View>
      <BroadcastTabs />
    </BlurView>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    justifyContent: "flex-end",
  },
  content: {
    height: sizes.defaultToolbar,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: sizes.defaultPadding,
  },
});
