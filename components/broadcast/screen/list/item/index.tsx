import { TBroadcast } from "@/types/broadcast";
import { sizes } from "@/utils/spacing";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { TouchableOpacity, View } from "react-native-ui-lib";
import BroadcastItemIcon from "./icon";
import { useRouter } from "expo-router";
import { KNOWN_ROUTES } from "@/utils/routes";
import { useBroadcastStoreSelectors } from "@/store/broadcast";
import BroadcastItemContent from "./content";
import useBorderColor from "@/hooks/useBorderColor";
import PostCreatedDate from "./created";

export interface IBroadcastItem {
  broadcast: TBroadcast;
}

export default function BroadcastItem({ broadcast }: IBroadcastItem) {
  const { setBroadcast } = useBroadcastStoreSelectors();
  const router = useRouter();
  function handlePress() {
    setBroadcast(broadcast);
    router.push(KNOWN_ROUTES.broadcast.view);
  }
  const borderColor = useBorderColor();

  return (
    <TouchableOpacity onPress={handlePress}>
      <View style={styles.wrapper}>
        <BroadcastItemIcon broadcast={broadcast} size={52} />
        <View style={{ ...styles.content, borderColor }}>
          <View style={styles.titleWrapper}>
            <Text variant="labelLarge" style={{ flex: 1 }}>
              {broadcast.title}
            </Text>
            <PostCreatedDate broadcast={broadcast} />
          </View>
          <BroadcastItemContent broadcast={broadcast} />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    height: sizes.defaultToolbar,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: sizes.defaultPadding,
    marginTop: sizes.defaultPadding / 2,
    gap: sizes.defaultSizes.small,
  },
  content: {
    flex: 1,
    height: "100%",
    borderBottomWidth: 1,
  },
  titleWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
});
