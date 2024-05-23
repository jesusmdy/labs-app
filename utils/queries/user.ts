import pb from "@/api";
import { TUser } from "@/types/users";

interface IAuthWithPasswordValues {
  emailOrUsername: string,
  password: string
}

export const searchPeople = (search: string): Promise<TUser[]> => {
  return pb.send<TUser[]>('/api/services/user/search', {
    method: 'POST',
    query: { search }
  })
}

export const authWithPassword = (values: IAuthWithPasswordValues) => pb
  .collection("users")
  .authWithPassword(
    values.emailOrUsername, values.password
  )