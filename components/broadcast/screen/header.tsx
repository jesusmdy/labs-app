import { View, StyleSheet, useColorScheme } from "react-native";
import React, { Fragment, useMemo } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import _ from "lodash";
import { ActionSheet, Button } from "react-native-ui-lib";
import { useRouter } from "expo-router";
import { KNOWN_ROUTES } from "@/utils/routes";
import { Text } from "react-native-paper";
import { sizes } from "@/utils/spacing";
import { BlurView } from "@react-native-community/blur";
import { BLUR_AMMOUNT } from "@/utils/blur";
import { useToggle } from "@uidotdev/usehooks";
import { TouchableOpacity } from "react-native-ui-lib/src/incubator";
import { Ionicons } from "@expo/vector-icons";
import { broadcastFilterTabs } from "@/utils/broadcast";
import useBroadcastStore, { IBroadcastFilter } from "@/store/broadcast";
import SearchButton from "./search";

function FilterSelector() {
  const [open, toggleOpen] = useToggle();
  const { setBroadcastFilter, broadcastFilter } = useBroadcastStore();
  const insets = useSafeAreaInsets();

  const options = broadcastFilterTabs.map(({ label, value }) => ({
    label,
    onPress: () => setBroadcastFilter(value as IBroadcastFilter),
  }));

  const currentOption = useMemo(
    () => _.find(broadcastFilterTabs, { value: broadcastFilter }),
    [broadcastFilter],
  );

  return (
    <Fragment>
      <TouchableOpacity
        onPress={toggleOpen}
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: sizes.defaultSizes.small / 2,
        }}
      >
        <Text
          variant="bodyLarge"
          style={{ fontWeight: "bold", textTransform: "capitalize" }}
        >
          {currentOption?.label}
        </Text>
        <Ionicons name="chevron-down" size={sizes.defaultSizes.medium} />
      </TouchableOpacity>
      <ActionSheet
        visible={open}
        onDismiss={() => toggleOpen(false)}
        showCancelButton
        options={options}
        dialogStyle={{ paddingBottom: insets.bottom }}
      />
    </Fragment>
  );
}

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
          <FilterSelector />
          <View style={{ flexDirection: "row", gap: sizes.defaultSizes.small }}>
            <SearchButton />
            <Button
              label="Create"
              size="small"
              link
              onPress={() => router.push(KNOWN_ROUTES.broadcast.new)}
            />
          </View>
        </View>
      </View>
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
