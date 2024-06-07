import { Fragment, useCallback, useMemo, useRef, useState } from "react";
import { Checkbox, IconButton, Text } from "react-native-paper";
import {
  BottomSheetFooter,
  BottomSheetFooterProps,
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { FlatList, StyleSheet, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import useMD3Theme from "@/hooks/useMD3Theme";
import { sizes } from "@/utils/spacing";
import MessageEditor from "@/components/editor/editor";
import CustomBlurView from "@/components/common/blurView";
import useBroadcastStore from "@/store/broadcast";
import _ from "lodash";
import { IBroadcast, TBroadcast } from "@/types/broadcast";
import useBorderColor from "@/hooks/useBorderColor";
import BroadcastItemIcon from "../list/item/icon";
import { TouchableOpacity } from "react-native-ui-lib/src/incubator";
import { useDebounce, useToggle } from "@uidotdev/usehooks";
import { stringIncludes } from "@/utils/search";

function ChannelListItem({ broadcast }: { broadcast: IBroadcast }) {
  const [selected, toggleSelected] = useToggle(false);
  const borderColor = useBorderColor();
  const theme = useMD3Theme();
  return (
    <TouchableOpacity
      onPress={toggleSelected}
      style={{
        position: "relative",
      }}
    >
      <View
        style={{
          borderWidth: 1,
          borderColor: selected ? theme.colors.primaryContainer : borderColor,
          borderRadius: sizes.defaultBorderRadiuses.small,
          flexDirection: "row",
          alignItems: "center",
          gap: sizes.defaultSizes.small,
          padding: sizes.defaultSizes.small,
          flex: 1,
        }}
      >
        <Ionicons
          name={selected ? "checkmark-circle" : "radio-button-off"}
          size={sizes.defaultSizes.medium}
          color={
            selected ? theme.colors.onPrimaryContainer : theme.colors.outline
          }
        />
        <BroadcastItemIcon
          broadcast={broadcast}
          size={sizes.defaultSizes.largeX2}
        />
        <Text
          variant="bodyMedium"
          style={{ textAlign: "center", color: theme.colors.onSurface }}
        >
          {_.truncate(broadcast.title, { length: 35 })}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

function ChannelList() {
  const { broadcastList } = useBroadcastStore();
  const [filter, setFilter] = useState("");
  const searchFilter = useDebounce(filter, 500);

  const theme = useMD3Theme();
  const borderColor = useBorderColor();

  const filteredBroadcastList = useMemo((): TBroadcast[] => {
    if (searchFilter && searchFilter !== "") {
      const filtered = _.filter(broadcastList, (item: TBroadcast) => {
        if (stringIncludes(searchFilter, item.title) && item.isAuthor)
          return true;
        return false;
      });
      console.log(filtered, "filtered");
      return filtered;
    }
    return _.filter(broadcastList, { isAuthor: true });
  }, [broadcastList, searchFilter]);

  return (
    <View
      style={{
        flex: 1,
        marginTop: sizes.defaultSizes.small,
        rowGap: sizes.defaultSizes.small,
      }}
    >
      <CustomBlurView style={{ ...styles.searchContainer, borderColor }}>
        <Ionicons
          name="search"
          size={sizes.defaultSizes.medium}
          color={theme.colors.outline}
        />
        <TextInput
          placeholder="Search"
          placeholderTextColor={theme.colors.outline}
          style={styles.searchInput}
          value={filter}
          onChangeText={setFilter}
        />
      </CustomBlurView>
      <FlatList
        data={filteredBroadcastList}
        style={{ flex: 1 }}
        contentContainerStyle={{ gap: sizes.defaultSizes.small }}
        renderItem={({ item }) => <ChannelListItem broadcast={item} />}
        keyExtractor={(i) => i.id}
        scrollEnabled
        bounces={false}
      />
    </View>
  );
}

export default function WriteBroadcastButton() {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["25%", "75%"], []);

  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

  const theme = useMD3Theme();

  async function handleSend(data: any) {}

  const renderFooter = useCallback(
    (props: BottomSheetFooterProps) => (
      <BottomSheetFooter {...props} bottomInset={24}>
        <CustomBlurView
          style={{
            padding: sizes.defaultPadding,
          }}
        >
          <MessageEditor onSend={handleSend} />
        </CustomBlurView>
      </BottomSheetFooter>
    ),
    [],
  );

  return (
    <View style={styles.container}>
      <IconButton
        onPress={handlePresentModalPress}
        size={sizes.defaultSizes.medium}
        iconColor={theme.colors.onPrimaryContainer}
        style={{ backgroundColor: theme.colors.primaryContainer }}
        icon={({ size, color }) => (
          <Ionicons name="add" size={size} color={color} />
        )}
      />
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backgroundStyle={{ backgroundColor: theme.colors.surface }}
        footerComponent={renderFooter}
      >
        <BottomSheetView style={styles.contentContainer}>
          <View style={{ flex: 1, paddingHorizontal: sizes.defaultPadding }}>
            <Text
              variant="labelLarge"
              style={{ color: theme.colors.onSurface }}
            >
              Where to publish
            </Text>
            <ChannelList />
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  contentContainer: {
    flex: 1,
  },
  footerContainer: {
    padding: 12,
    margin: 12,
    borderRadius: 12,
    backgroundColor: "#80f",
  },
  footerText: {
    textAlign: "center",
    color: "white",
    fontWeight: "800",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: sizes.defaultSizes.small,
    gap: sizes.defaultSizes.small / 2,
    borderWidth: 1,
    borderRadius: sizes.defaultSizes.small,
  },
  searchInput: {
    padding: sizes.defaultSizes.small,
    flex: 1,
  },
});
