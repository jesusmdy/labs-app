import { getBroadcastSubscription } from "@/utils/queries/broadcast";
import useSWR from "swr";

export default function useBroadcastSubscription(broadcastId: string) {
  const {data, isLoading, error} = useSWR("/api/broadcast/subscription", () => getBroadcastSubscription(broadcastId))

  return {
    subscription: data,
    isLoading, error,
  }
}