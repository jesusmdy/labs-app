import { IBroadcastPost, TBroadcast } from "@/types/broadcast";
import { create } from "zustand";
import { createSelectors } from "./utils/createSelectors";

interface IBroadcastStore {
  broadcast: TBroadcast | undefined,
  broadcastList: TBroadcast[],
  posts: IBroadcastPost[],

  setBroadcast: (broadcast: TBroadcast) => void,
  setBroadcastList: (broadcastList: TBroadcast[]) => void,
  setPosts: (posts: IBroadcastPost[]) => void,
}

const useBroadcastStore = create<IBroadcastStore>(
  (set) => (
    {
      broadcast: void null,
      broadcastList: [],
      posts: [],
      setBroadcast: (broadcast) => set(
        (state) => ({ broadcast })
      ),
      setBroadcastList: (broadcastList) => set(
        (state) => ({ broadcastList })
        ),
      setPosts: (posts) => set(
        (state) => ({ posts })
      )
    }
  )
)

export const useBroadcastStoreSelectors = createSelectors(useBroadcastStore)

export default useBroadcastStore
