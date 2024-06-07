import { View } from "react-native";
import { Text } from "react-native-paper";
import { IBroadcastItem } from ".";
import useBroadcastLastPost from "@/hooks/useBroadcastLastPost";
import useGetLastMessageContent from "@/hooks/useGetLastMessageContent";
import { TMessage } from "@/types/messages";
import _ from "lodash";
import { Ionicons } from "@expo/vector-icons";
import { sizes } from "@/utils/spacing";
import useMD3Theme from "@/hooks/useMD3Theme";

export default function BroadcastItemContent({ broadcast }: IBroadcastItem) {
  const lastPost = useBroadcastLastPost(broadcast.id);
  const theme = useMD3Theme();

  const content = useGetLastMessageContent({
    media: _.get(lastPost, "media", []),
    expand: {
      media: _.get(lastPost, "expand.media", []),
    },
    content: _.get(lastPost, "content", ""),
  } as TMessage);

  if (!lastPost) {
    return (
      <View>
        <Text>Started broadcast</Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: sizes.defaultSizes.small / 2,
      }}
    >
      {content?.icon && (
        <Ionicons
          name={content.icon as never}
          size={sizes.defaultSizes.large}
          color={theme.colors.onBackground}
        />
      )}
      <Text style={{ color: theme.colors.onBackground }}>
        {content?.content}
      </Text>
    </View>
  );
}
