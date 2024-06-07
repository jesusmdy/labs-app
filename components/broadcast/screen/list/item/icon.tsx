import { View, Text, StyleSheet, Image } from "react-native";
import React, { Fragment, useMemo } from "react";
import { IBroadcastItem } from ".";
import { getMediaUrl } from "@/utils/queries/media";
import { Avatar, Icon } from "react-native-paper";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import useMD3Theme from "@/hooks/useMD3Theme";
import { sizes } from "@/utils/spacing";
import { palette } from "@/utils/palette";

interface IBroadcastItemProps extends Pick<IBroadcastItem, "broadcast"> {
  size?: number;
}

export default function BroadcastItemIcon({
  broadcast,
  size = 45,
}: IBroadcastItemProps) {
  const theme = useMD3Theme();
  const uri = useMemo(() => {
    if (broadcast.icon && broadcast.expand.icon) {
      return getMediaUrl(broadcast.expand.icon);
    }
  }, [broadcast]);
  return (
    <Fragment>
      {uri ? (
        <Image
          source={{ uri }}
          width={size}
          height={size}
          style={styles.avatar}
        />
      ) : (
        <Avatar.Icon
          style={{
            ...styles.avatar,
            backgroundColor: palette.amaranth_purple[800],
          }}
          size={size}
          color={palette.amaranth_purple[500]}
          icon={({ size, color }) => (
            <MaterialCommunityIcons
              name="broadcast"
              size={size}
              color={color}
            />
          )}
        />
      )}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: sizes.defaultSizes.small,
  },
});
