import Media from "@/components/media";
import useAuth from "@/hooks/useAuth";
import useIsMessageSender from "@/hooks/useIsMessageSender";
import useMD3Theme from "@/hooks/useMD3Theme";
import { useShadowColor } from "@/hooks/useShadowColor";
import { useMediaViewerSelectors } from "@/store/media";
import { TMedia } from "@/types/media";
import { TMessage } from "@/types/messages";
import { KNOWN_ROUTES } from "@/utils/routes";
import { sizes } from "@/utils/spacing";
import { useRouter } from "expo-router";
import _ from "lodash";
import { FlatList, View, useWindowDimensions } from "react-native";
import { TouchableOpacity } from "react-native-ui-lib/src/incubator";

export default function MessageMediaComponent({
  message,
}: {
  message: TMessage;
}) {
  const { width } = useWindowDimensions();
  const { user } = useAuth();
  const isSender = useIsMessageSender(user, message);
  const computedSize = width / 2;
  const shadow = useShadowColor();

  const router = useRouter();
  const { setMedia, setMediaList } = useMediaViewerSelectors();
  const theme = useMD3Theme();

  if (
    message.media.length === 0 ||
    (message.media.length >= 1 && !message.expand?.media)
  )
    return void null;

  const handlePress = (media: TMedia) => {
    setMedia(media);
    setMediaList(message.expand?.media as TMedia[]);
    router.push(KNOWN_ROUTES.conversation.media);
  };

  return (
    <FlatList
      data={message.expand?.media}
      renderItem={({ item }) => (
        <TouchableOpacity onPress={() => handlePress(item)}>
          <View
            style={{
              ...shadow,
              padding: sizes.defaultSizes.small - 6,
              borderRadius: sizes.defaultBorderRadiuses.medium + 2,
              backgroundColor: isSender
                ? theme.colors.primaryContainer
                : theme.colors.surface,
            }}
          >
            <Media
              media={item}
              mediaList={_.get(message.expand, "media", [])}
              dimensions={{
                width: computedSize,
                height: computedSize,
              }}
            />
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(i) => i.id}
      style={{ gap: 8 }}
    />
  );
}
