import { Fragment, PropsWithChildren } from "react"
import BroadcastPostRealtimeHandler from "../broadcast/screen/view/handlers/realtime"
import RealtimeMessagesListener from "../conversation/realtime/messages"
import useAuth, { STATUS } from "@/hooks/useAuth"

export default function RealtimeHandlerWrappers({children}: PropsWithChildren) {
  const {status} = useAuth()
  const isLoggedIn = status === STATUS.AUTHED

  return (
    <Fragment>
      {
        isLoggedIn && (
          <Fragment>
            <RealtimeMessagesListener />
            <BroadcastPostRealtimeHandler />
          </Fragment>    
        )
      }
      {children}
    </Fragment>
  )
}