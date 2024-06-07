import { StyleSheet, TouchableOpacity, View } from "react-native";
import { IMediaView, shadow } from ".";
import { sizes } from "@/utils/spacing";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { KNOWN_ROUTES } from "@/utils/routes";
import MediaTitle from "./title";
import MediaToolbarOptions from "./options";

export default function MediaToolbar({ media, mediaList }: IMediaView) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const wrapperStyles = {
    ...styles.wrapper,
    paddingTop: insets.top,
    backgroundColor: "rgba(25,25,25,0.20)",
  };
  function onBack() {
    const canGoBack = router.canGoBack();

    if (canGoBack) {
      router.back();
    } else {
      router.replace(KNOWN_ROUTES.tabs.inbox);
    }
  }
  return (
    <View style={wrapperStyles}>
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={onBack}>
          <Ionicons
            name="arrow-back"
            size={sizes.defaultSizes.large}
            color="white"
            style={shadow}
          />
        </TouchableOpacity>
        <MediaTitle media={media} mediaList={mediaList} />
        <MediaToolbarOptions media={media} mediaList={mediaList} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    zIndex: 100,
    width: "100%",
  },
  toolbar: {
    height: sizes.defaultToolbar,
    flexDirection: "row",
    paddingHorizontal: sizes.defaultPadding,
    alignItems: "center",
    gap: sizes.defaultSizes.large,
  },
});
