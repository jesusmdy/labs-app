import React, { Fragment, useMemo } from 'react'
import MediaItemImage from "./image"
import MediaItemVideo from "./video"
import { IMedia, IMediaItemProps } from ".."

interface IMediaViewer extends Omit<IMedia, "mediaList"> {
  asPreview?: boolean,
  videoProps?: IMediaItemProps["videoProps"],
  imageProps?: IMediaItemProps["imageProps"],
}

export default function MediaViewer({media, dimensions, imageProps, videoProps, asPreview}: IMediaViewer) {

  const preview = useMemo(
    () => {
      if (media.type === "image") {
        return (
          <MediaItemImage
            width={dimensions.width}
            height={dimensions.height}
            media={media}
            imageProps={imageProps}
            asPreview={asPreview}
          />
        )
      }
    
      if (media.type === "video") {
        return (
          <MediaItemVideo
            width={dimensions.width}
            height={dimensions.height}
            media={media}
            videoProps={videoProps}
            asPreview={asPreview}
          />
        )
      }
        
      return void null
    },
    [media.type]
  )
  return (
    <Fragment>
      {preview}
    </Fragment>
  )
}