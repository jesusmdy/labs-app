import { ICollection } from "./collection";

interface IUser extends ICollection {
  avatar: string;
  id: string;
  name: string;
  username: string;
  virified: boolean;
}

export type TUser = IUser;
