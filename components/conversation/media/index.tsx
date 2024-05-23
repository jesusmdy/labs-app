import MediaViewer from "@/components/media/media/viewer";
import { TMedia } from "@/types/media";
import _ from "lodash";
import { View, useWindowDimensions, StyleSheet } from "react-native";
import PagerView from "react-native-pager-view";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface IMediaView {
  media: TMedia,
  mediaList: TMedia[]
}

function Media({media, mediaList}: IMediaView) {
  const {width, height} = useWindowDimensions()
  const insets = useSafeAreaInsets()
  const computedHeight = (height - (insets.top + insets.bottom))
  return (
    <MediaViewer
      media={media}
      dimensions={{
        width,
        height: computedHeight
      }}
      imageProps={{
        resizeMode: "contain",
        resizeMethod: "resize",
      }}
    />
  )
}

export default function MediaView({media, mediaList}: IMediaView) {
  const startingIndex = _.indexOf(mediaList, media)

  return (
    <PagerView style={styles.pagerView} initialPage={startingIndex}>
      {
        _.map(
          mediaList,
          (item, index) => (
            <View key={index}>
              <Media media={item} mediaList={mediaList} />
            </View>
          )
        )
      }
    </PagerView>
  )
}

const styles = StyleSheet.create({
  pagerView: {
    flex: 1,
  },
  control: {
    backgroundColor: "#f00",
    height: 60
  }
});
