import { getBroadcastList } from "@/utils/queries/broadcast"
import useSWR from "swr"

export default function useBroadcastList() {
  const {data, isLoading, error} = useSWR(
    "/api/services/broadcast",
    () => getBroadcastList()
  )

  return {
    broadcastList: data,
    isLoading,
    error
  }
}