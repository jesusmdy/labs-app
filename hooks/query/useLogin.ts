import pb from "@/api";
import useSWR from "swr";

export default function useLogin() {
  const {data, mutate} = useSWR(
    '/users/login',
    () => pb.collection("users").authWithPassword
  )

  return { data, mutate }
}