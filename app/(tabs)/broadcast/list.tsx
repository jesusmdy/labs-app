import BroadcastList from "@/components/broadcast/screen/list/items";
import BroadcastPostsByFilter from "@/components/broadcast/screen/posts";
import BroadcastPostsListHandler from "@/components/broadcast/screen/posts/handler";
import BroadcastListProvider from "@/components/broadcast/screen/provider";
import useBroadcastStore from "@/store/broadcast";
import { ReactNode } from "react";

export default function BroadcastScreen() {
  const { broadcastFilter } = useBroadcastStore();

  const pieces: Record<string, ReactNode> = {
    everything: <BroadcastPostsByFilter />,
    following: <BroadcastPostsByFilter />,
    list: <BroadcastList />,
  };

  return (
    <BroadcastListProvider>
      <BroadcastPostsListHandler>
        {pieces[broadcastFilter]}
      </BroadcastPostsListHandler>
    </BroadcastListProvider>
  );
}
