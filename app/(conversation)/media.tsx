import { useMediaViewerSelectors } from "@/store/media"
import { Redirect } from "expo-router"
import { KNOWN_ROUTES } from "@/utils/routes"
import MediaView from "@/components/conversation/media"

export default function MediaScreen() {
  const {media, mediaList} = useMediaViewerSelectors()

  if (
    !media
    || mediaList.length === 0
  ) {
    return (
      <Redirect href={KNOWN_ROUTES.conversation.chat} />
    )
  }
  return <MediaView media={media} mediaList={mediaList} />
}