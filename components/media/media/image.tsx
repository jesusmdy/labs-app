import { Image } from "react-native";
import React from "react";
import { getMediaUrl } from "@/utils/queries/media";
import { IMediaItemProps } from "..";
import { sizes } from "@/utils/spacing";

export default function MediaItemImage({
  width,
  height,
  media,
  imageProps,
}: IMediaItemProps) {
  return (
    <Image
      {...imageProps}
      source={{
        uri: getMediaUrl(media),
      }}
      width={width}
      height={height}
      style={{
        borderRadius: sizes.defaultBorderRadiuses.medium,
        backgroundColor: media.colors.primary,
      }}
    />
  );
}
