import pb from "@/api";
import useUserStore from "@/store/user";
import { TUser } from "@/types/users";
import { useEffect, useMemo, useState } from "react";

export const STATUS = {
  UNKNOWN: -1,
  UNAUTHED: 0,
  AUTHED: 1,
};

const useAuth = () => {
  const [status, setStatus] = useState(STATUS.UNKNOWN);
  const [user] = useState<TUser>(pb.authStore.model as TUser);
  const { user: storeUser, setUser } = useUserStore();

  useEffect(() => {
    setUser(user);
  }, [user]);

  useEffect(() => {
    const isValid = pb.authStore.isValid;
    if (isValid || user) setStatus(STATUS.AUTHED);
    else setStatus(STATUS.UNAUTHED);
  }, [user, pb]);

  const returnUser = useMemo(() => {
    if (storeUser) return storeUser;
    return user;
  }, [storeUser, user]);

  return { status, user: returnUser };
};

export default useAuth;
