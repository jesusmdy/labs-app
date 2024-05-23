import { View, StyleSheet } from "react-native"
import React, { useEffect, useRef, useState } from "react"
import { getMediaUrl } from "@/utils/queries/media"
import { useVideoPlayer, VideoView } from "expo-video"
import { Ionicons } from "@expo/vector-icons"
import { Card } from "react-native-paper"
import { IMediaItemProps } from ".."
import { useMediaProviderContext } from "../provider"

export default function MediaItemVideo(props: IMediaItemProps) {
  const source = getMediaUrl(props.media)
  const ref = useRef<VideoView>(null);

  const player = useVideoPlayer(source, (player) => {
    player.loop = true;
    player.currentTime = props.asPreview ? 1 : 0;
    !props.asPreview && player.play()
  });

  return (
    <View
      style={{
        ...styles.contentContainer,
        width: props.width,
        height: props.height
      }}
    >
      <VideoView
        {
          ...props.videoProps
        }
        ref={ref}
        style={{
          ...styles.video,
          width: props.width,
          height: props.height,
        }}
        player={player}
        nativeControls={!props.asPreview}
        contentFit="cover"
      />
      {
        props.asPreview && (
          <Card
            style={styles.startOverlay}
            mode="contained"
          >
            <Card.Content>
              <Ionicons
                name="play"
                size={64}
                color="#fff"
              />
            </Card.Content>
          </Card>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  contentContainer: {
    borderRadius: 8,
    position: "relative"
  },
  video: {
    borderRadius: 8,
    backgroundColor: "#000",
    resizeMode: "stretch"
  },
  controlsContainer: {
    padding: 10,
  },
  startOverlay: {
    backgroundColor: "rgba(25,25,25,0.20)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 0, right: 0,
    top: 0, bottom: 0,
    width: "100%", height: "100%"
  }
});
