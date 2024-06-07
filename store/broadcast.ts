import {
  IBroadcastPost,
  IBroadcastSubscription,
  TBroadcast,
} from "@/types/broadcast";
import { create } from "zustand";
import { createSelectors } from "./utils/createSelectors";
import _ from "lodash";

export type IBroadcastFilter = "everything" | "following" | "list";

interface IBroadcastStore {
  broadcast: TBroadcast | undefined;
  broadcastSubscription: IBroadcastSubscription | undefined;
  broadcastList: TBroadcast[];
  posts: IBroadcastPost[];
  broadcastFilter: IBroadcastFilter;

  setBroadcast: (broadcast: TBroadcast) => void;
  setBroadcastList: (broadcastList: TBroadcast[]) => void;
  batchAddPosts: (posts: IBroadcastPost[]) => void;
  setPosts: (posts: IBroadcastPost[]) => void;
  setBroadcastSubscription: (
    broadcastSubscription: IBroadcastSubscription | undefined,
  ) => void;
  setBroadcastFilter: (filter: IBroadcastFilter) => void;
}

const useBroadcastStore = create<IBroadcastStore>((set) => ({
  broadcast: void null,
  broadcastFilter: "everything",
  broadcastSubscription: void null,
  broadcastList: [],
  posts: [],
  setBroadcast: (broadcast) => set((state) => ({ broadcast })),
  setBroadcastList: (broadcastList) => set((state) => ({ broadcastList })),
  setPosts: (posts) => set((state) => ({ posts })),
  batchAddPosts: (posts) =>
    set((state) => {
      const merged = _.uniqBy(
        _.concat(state.posts, posts),
        "id",
      ) as IBroadcastPost[];
      return { posts: merged };
    }),
  setBroadcastSubscription: (broadcastSubscription) =>
    set((state) => ({ broadcastSubscription })),
  setBroadcastFilter: (filter) => set(() => ({ broadcastFilter: filter })),
}));

export const useBroadcastStoreSelectors = createSelectors(useBroadcastStore);
export const useGetPostsByBroadcast = (broadcastId: string) =>
  useBroadcastStore((state) => {
    const posts = _.filter(state.posts, { origin: broadcastId });
    return posts;
  });

export default useBroadcastStore;
