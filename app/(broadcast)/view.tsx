import { View, Text } from "react-native";
import { useBroadcastStoreSelectors } from "@/store/broadcast";
import BroadcastHeader from "@/components/broadcast/screen/view/header";
import SubscriptionHandlerWrapper from "@/components/broadcast/screen/view/handlers/subscription";
import BroadcastEditorWrapper from "@/components/broadcast/screen/view/editor";
import BroadcastPostsHandler from "@/components/broadcast/screen/view/handlers/posts";
import BroadcastPostsList from "@/components/broadcast/screen/view/posts/list";

export default function BroadcastViewScreen() {
  const { broadcast } = useBroadcastStoreSelectors();

  if (!broadcast)
    return (
      <View>
        <Text>No broadcast selected</Text>
      </View>
    );
  return (
    <SubscriptionHandlerWrapper broadcastId={broadcast.id}>
      <BroadcastHeader broadcast={broadcast} />
      <BroadcastPostsHandler broadcastId={broadcast.id}>
        <BroadcastPostsList broadcast={broadcast} />
      </BroadcastPostsHandler>
      <BroadcastEditorWrapper broadcast={broadcast} />
    </SubscriptionHandlerWrapper>
  );
}
