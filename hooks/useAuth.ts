import pb from "@/api"
import { TUser } from "@/types/users"
import { useEffect, useState } from "react"

export const STATUS = {
  UNKNOWN: -1,
  UNAUTHED: 0,
  AUTHED: 1,
}

const useAuth = () => {
  const [status, setStatus] = useState(STATUS.UNKNOWN)
  const [user,] = useState<TUser>(pb.authStore.model as TUser)

  useEffect(
    () => {
      const isValid = pb.authStore.isValid
      if (isValid) setStatus(STATUS.AUTHED)
      else setStatus(STATUS.UNAUTHED)
    },
    []
  )

  return { status, user }
}

export default useAuth