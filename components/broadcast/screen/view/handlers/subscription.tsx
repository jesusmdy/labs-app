import useBroadcastSubscription from "@/hooks/query/useBroadcastSubscription"
import {useBroadcastStoreSelectors} from "@/store/broadcast";
import {PropsWithChildren, useEffect} from "react"

interface ISubscriptionHandlerWrapperProps extends PropsWithChildren {
  broadcastId: string;
}

export default function SubscriptionHandlerWrapper({children, broadcastId}: ISubscriptionHandlerWrapperProps) {
  const {subscription} = useBroadcastSubscription(broadcastId)
  const {setBroadcastSubscription} = useBroadcastStoreSelectors()
  useEffect(
    () => {
      if (subscription && (subscription.broadcast === broadcastId)) {
        setBroadcastSubscription(subscription)
      } else {
        setBroadcastSubscription(void null)
      }
    },
    [subscription]
  )
  return children
}