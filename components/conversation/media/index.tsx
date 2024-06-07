import MediaViewer from "@/components/media/media/viewer";
import useMediaPaletteScheme from "@/hooks/usePaletteScheme";
import { TMedia } from "@/types/media";
import { StatusBar } from "expo-status-bar";
import _ from "lodash";
import { Fragment } from "react";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import MediaToolbar from "./toolbar";

export const shadow: StyleSheet.NamedStyles<unknown> = {
  textShadowOffset: 0,
  textShadowRadius: 3,
  textShadowColor: "black",
  color: "white",
};

export interface IMediaView {
  media: TMedia;
  mediaList: TMedia[];
}

function Media({ media, mediaList }: IMediaView) {
  const { width, height } = useWindowDimensions();
  const colorScheme = useMediaPaletteScheme(media, "primary");
  return (
    <Fragment>
      <StatusBar style={colorScheme ?? "dark"} />
      <MediaToolbar media={media} mediaList={mediaList} />
      <MediaViewer
        media={media}
        dimensions={{
          width,
          height,
        }}
        imageProps={{
          resizeMode: "contain",
          resizeMethod: "resize",
        }}
      />
    </Fragment>
  );
}

export default function MediaView({ media, mediaList }: IMediaView) {
  const startingIndex = _.indexOf(mediaList, media);

  return (
    <PagerView style={styles.pagerView} initialPage={startingIndex}>
      {_.map(mediaList, (item, index) => (
        <View key={index}>
          <Media media={item} mediaList={mediaList} />
        </View>
      ))}
    </PagerView>
  );
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  control: {
    backgroundColor: "#f00",
    height: 60,
  },
});
