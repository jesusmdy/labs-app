import useBroadcastStore from "@/store/broadcast";
import { IBroadcastPost } from "@/types/broadcast";
import { getAllBroadcastPosts } from "@/utils/queries/broadcast";
import { Fragment, PropsWithChildren, useEffect } from "react";
import { ProgressBar } from "react-native-paper";
import useSWR from "swr";

export default function BroadcastPostsListHandler({
  children,
}: PropsWithChildren) {
  const { batchAddPosts } = useBroadcastStore();
  const { data, isLoading } = useSWR("/api/broadcasts/posts", () =>
    getAllBroadcastPosts(),
  );

  useEffect(() => {
    if (data) {
      batchAddPosts(data.items as IBroadcastPost[]);
    }
  }, [data]);

  return (
    <Fragment>
      {isLoading && <ProgressBar indeterminate />}
      {children}
    </Fragment>
  );
}
