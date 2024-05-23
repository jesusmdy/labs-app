import useInbox from "@/hooks/query/useInbox";
import { useBatchAddChats } from "@/store/inbox";
import { PropsWithChildren, useEffect } from "react";
import { Text } from "react-native-paper";

export default function InboxHandler({children}: PropsWithChildren) {
  const {isLoading, chatList, error} = useInbox()
  const batchAddChats = useBatchAddChats()

  useEffect(
    () => {
      if (chatList) {
        batchAddChats(chatList)
      }
    },
    [chatList]
  )

  if (isLoading) {
    return <Text>Loading...</Text>
  }

  if (!isLoading && error) {
    return <Text>Error {':('}</Text>
  }

  return children
}