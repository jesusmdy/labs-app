import React, { PropsWithChildren, useEffect } from 'react'
import useBroadcastList from "@/hooks/query/useBroadcastList"
import { Text } from "react-native-paper"
import { useBroadcastStoreSelectors } from "@/store/broadcast"
import { TBroadcast } from "@/types/broadcast"
import useAuth from "@/hooks/useAuth"
import { parseBroadcasts } from "@/utils/broadcast"

export default function BroadcastListProvider(
  {children}: PropsWithChildren
) {
  const {broadcastList, isLoading} = useBroadcastList()
  const {setBroadcastList} = useBroadcastStoreSelectors()
  const {user} = useAuth()

  useEffect(
    () => {
      if (broadcastList) {
        setBroadcastList(
          parseBroadcasts(
            broadcastList as TBroadcast[],
            user
          )
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