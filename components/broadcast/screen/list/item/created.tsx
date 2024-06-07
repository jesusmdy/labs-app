import { IBroadcastItem } from ".";
import { Text } from "react-native-paper";
import useBroadcastLastPost from "@/hooks/useBroadcastLastPost";
import useMD3Theme from "@/hooks/useMD3Theme";
import { useMemo } from "react";
import { formatTimeDistance } from "@/utils/time";

export default function PostCreatedDate({ broadcast }: IBroadcastItem) {
  const lastPost = useBroadcastLastPost(broadcast.id);
  const theme = useMD3Theme();

  const dateLabel = useMemo(() => {
    if (!lastPost) return void null;
    return formatTimeDistance(new Date(lastPost.created), true);
  }, [lastPost]);

  if (!lastPost) return void null;
  return (
    <Text variant="labelLarge" style={{ color: theme.colors.outline }}>
      {dateLabel}
    </Text>
  );
}
