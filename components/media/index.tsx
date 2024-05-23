import { TMedia } from "@/types/media";
import { Fragment, PureComponent } from "react";
import Provider, { useMediaProviderContext } from "./provider";
import MediaViewer from "./media/viewer";
import { ImagePropsBase } from "react-native";
import { VideoPlayer, VideoViewProps } from "expo-video";

export interface IMediaItemProps {
  media: TMedia,
  width: number,
  height: number,
  imageProps?: ImagePropsBase,
  videoProps?: VideoPlayer,
  asPreview?: boolean
}


export interface IMedia {
  media: TMedia,
  mediaList: TMedia[],
  dimensions: {
    width: number,
    height: number
  }
}

function MediaPreview(props: IMedia) {
  return (
    <Fragment>
      <MediaViewer
        {...props}
        asPreview
      />
    </Fragment>
  )
}

export default function Media(props: IMedia) {
  return (
    <Provider>
      <MediaPreview {...props} />
    </Provider>
  )
}