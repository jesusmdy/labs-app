import { View, Text, StyleSheet, Image } from 'react-native'
import React, { Fragment, useMemo } from 'react'
import { IBroadcastItem } from "."
import { getMediaUrl } from "@/utils/queries/media"
import { Avatar, Icon } from "react-native-paper"
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons"
import useMD3Theme from "@/hooks/useMD3Theme"

interface IBroadcastItemProps extends Pick<IBroadcastItem, "broadcast"> {
  size?: number;
}

export default function BroadcastItemIcon(
  {broadcast, size = 45}: IBroadcastItemProps
) {
  const {colors} = useMD3Theme()
  const uri = useMemo(
    () => {
      if (
        broadcast.icon
        && broadcast.expand.icon
      ) {
        return getMediaUrl(broadcast.expand.icon)
      }
    },
    [broadcast]
  )
  return (
    <Fragment>
      {
        uri
          ? (
            <Image
              source={{uri}}
              width={size}
              height={size}
              style={styles.avatar}
            />
          )
          : (
            <Avatar.Icon
              style={styles.avatar}
              size={size}
              icon={
                ({size, color}) => (
                  <MaterialCommunityIcons
                    name="broadcast"
                    size={size}
                    color={color}
                  />
                )
              }   
            />
          )
      }
    </Fragment>
  )
}

const styles = StyleSheet.create({
  avatar: {
    borderRadius: 8
  }
})
