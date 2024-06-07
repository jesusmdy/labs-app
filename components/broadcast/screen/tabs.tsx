import useMD3Theme from "@/hooks/useMD3Theme";
import useBroadcastStore, { IBroadcastFilter } from "@/store/broadcast";
import { broadcastFilterTabs } from "@/utils/broadcast";
import { sizes } from "@/utils/spacing";
import { useMemo } from "react";
import { FlatList, StyleSheet, TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";

type ITab = {
  label: string;
  value: string;
};

function Tab({ tab }: { tab: ITab }) {
  const { broadcastFilter, setBroadcastFilter } = useBroadcastStore();
  const theme = useMD3Theme();
  const isEnabled = useMemo(
    () => tab.value === broadcastFilter,
    [tab, broadcastFilter],
  );
  const onPress = () => setBroadcastFilter(tab.value as IBroadcastFilter);
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{
          marginRight: sizes.defaultSizes.small / 2,
        }}
      >
        <Text
          variant="labelLarge"
          style={
            {
              paddingVertical: sizes.defaultSizes.small,
              color: isEnabled ? theme.colors.primary : theme.colors.outline,
            } as never
          }
        >
          {tab.label}
        </Text>
        <View
          style={{
            height: 3,
            backgroundColor: isEnabled ? theme.colors.primary : "transparent",
            borderTopEndRadius: 2,
            borderTopStartRadius: 2,
          }}
        />
      </TouchableOpacity>
    </View>
  );
}

export default function BroadcastTabs() {
  return (
    <View style={styles.wrapper}>
      <FlatList
        data={broadcastFilterTabs}
        renderItem={({ item }) => <Tab tab={item} />}
        keyExtractor={(i) => i.value}
        contentContainerStyle={{
          gap: sizes.defaultSizes.small,
        }}
        horizontal
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: sizes.defaultPadding,
    paddingVertical: sizes.defaultPadding / 2,
    paddingBottom: 0,
  },
});
