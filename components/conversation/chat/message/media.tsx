import Media from "@/components/media"
import { useMediaViewerSelectors } from "@/store/media"
import { TMedia } from "@/types/media"
import { TMessage } from "@/types/messages"
import { KNOWN_ROUTES } from "@/utils/routes"
import { useRouter } from "expo-router"
import _ from "lodash"
import { FlatList, useWindowDimensions } from "react-native"
import { Card } from "react-native-paper"

export default function MessageMediaComponent(
  {message}: {
    message: TMessage
  }
) {
  const {width} = useWindowDimensions()
  const computedSize = width / 2
  
  const router = useRouter()
  const {setMedia, setMediaList} = useMediaViewerSelectors()


  if (
    message.media.length === 0
    || (
      message.media.length >= 1
      && !message.expand?.media
    )
  ) return void null

  const handlePress = (media: TMedia) => {
    setMedia(media)
    setMediaList(message.expand?.media as TMedia[])
    router.push(KNOWN_ROUTES.conversation.media)
  }

  return (
    <FlatList
      data={message.expand?.media}
      renderItem={
        ({item}) => (
          <Card
            onPress={() => handlePress(item)}
            mode="contained"
          >
            <Card.Content
              style={{ paddingHorizontal: 0, paddingVertical: 0 }}
            >
              <Media
                media={item}
                mediaList={
                  _.get(message.expand, "media", [])
                }
                dimensions={{
                  width: computedSize,
                  height: computedSize
                }}
              />
            </Card.Content>
          </Card>
        )
      }
      keyExtractor={i => i.id}
      style={{  gap: 8 }}
    />
  )
}