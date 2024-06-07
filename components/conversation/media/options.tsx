import { StyleSheet, Text, View } from "react-native";
import { IMediaView, shadow } from ".";
import { sizes } from "@/utils/spacing";
import { useMemo } from "react";
import { formatTimeDistance } from "@/utils/time";

export default function MediaToolbarOptions({ media }: IMediaView) {
  const formattedHour = useMemo(
    () => formatTimeDistance(new Date(media.created)),
    [media],
  );
  return (
    <View style={styles.optionsWrapper}>
      <Text style={shadow}>{formattedHour}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  optionsWrapper: {
    flexDirection: "row",
    gap: sizes.defaultSizes.small,
  },
});
