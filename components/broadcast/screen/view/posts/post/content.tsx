import { Text } from "react-native-paper";
import { IBroadcastPostItem } from "./item";

export default function PostContent({ post, broadcast }: IBroadcastPostItem) {
  if (post.content === "") return void null;
  return (
    <Text variant="bodyMedium" selectable>
      {post.content}
    </Text>
  );
}
