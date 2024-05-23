import { getInbox } from "@/utils/queries/chats";
import useSWR from "swr";

export default function useInbox() {
  const {data, isLoading, error} = useSWR("/api/services/inbox", () => getInbox(false))
  return {
    chatList: data,
    isLoading,
    error
  }
}