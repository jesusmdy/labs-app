import { View, StyleSheet } from "react-native";
import React, { Fragment } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "react-native-paper";
import { sizes } from "@/utils/spacing";
import useBorderColor from "@/hooks/useBorderColor";
import StartConversationButton from "@/components/conversation/new/start";

export default function InboxHeader() {
  const insets = useSafeAreaInsets();
  const borderColor = useBorderColor();
  const wrapperStyles = {
    ...styles.headerWrapper,
    paddingTop: insets.top,
    borderBottomWidth: 1,
    borderColor,
  };

  return (
    <Fragment>
      <View style={wrapperStyles}>
        <View style={styles.header}>
          <Text variant="bodyLarge" style={{ fontWeight: "bold" }}>
            Conversations
          </Text>
          <StartConversationButton />
        </View>
      </View>
    </Fragment>
  );
}

const styles = StyleSheet.create({
  headerWrapper: {},
  header: {
    height: sizes.defaultToolbar,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: sizes.defaultPadding,
  },
});
