import React, { PropsWithChildren, useEffect } from 'react'
import useBroadcastList from "@/hooks/query/useBroadcastList"
import { Text } from "react-native-paper"
import { useBroadcastStoreSelectors } from "@/store/broadcast"
import { TBroadcast } from "@/types/broadcast"

export default function BroadcastListProvider(
  {children}: PropsWithChildren
) {
  const {broadcastList, isLoading} = useBroadcastList()
  const {setBroadcastList} = useBroadcastStoreSelectors()

  useEffect(
    () => {
      if (broadcastList) {
        setBroadcastList(
          broadcastList as TBroadcast[]
        )
      }
    },
    [broadcastList]
  )

  if (isLoading) {
    return <Text>Loading...</Text>
  }
  return children
}