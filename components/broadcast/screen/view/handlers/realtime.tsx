import pb from "@/api";
import useBroadcastStore from "@/store/broadcast";
import { IBroadcastPost } from "@/types/broadcast";
import { KNOWN_COLLECTIONS } from "@/utils/collections";
import _ from "lodash";
import { RecordSubscription } from "pocketbase";
import { PropsWithChildren, useEffect } from "react";

export default function BroadcastPostRealtimeHandler({
  children,
}: PropsWithChildren) {
  const batchAddPosts = useBroadcastStore().batchAddPosts;

  async function eventHandler(data: RecordSubscription<IBroadcastPost>) {
    const { action, record } = data;
    if (action === "create") {
      batchAddPosts([record]);
    }
  }

  function startListening() {
    pb.collection(KNOWN_COLLECTIONS.broadcastItem)
      .subscribe("*", eventHandler, {
        expand: "media, author, origin",
      })
      .catch(console.log);
  }

  function stopListening() {
    pb.collection(KNOWN_COLLECTIONS.broadcastItem).unsubscribe("*");
  }

  useEffect(() => {
    startListening();
    return () => stopListening();
  }, []);
  return children;
}
