import { ICollection } from "./collection";
import { TMedia } from "./media";
import { TUser } from "./users";

export interface IBroadcast extends ICollection {
  author: string;
  description: string;
  header: string;
  icon: string;
  title: string;
  isAuthor?: boolean;
  subscribers: number;
  expand: {
    icon: TMedia;
    author: TUser;
  };
}

export type TBroadcast = IBroadcast;

export interface IBroadcastPost extends ICollection {
  author: string;
  content: string;
  expand: {
    author: TUser;
    media?: TMedia[];
    origin: IBroadcast;
  };
  media: string[];
  origin: string;
  replying: string;
  repost: boolean;
}

export interface IBroadcastSubscription extends ICollection {
  broadcast: string;
  user: string;
  expand: {
    user: TUser;
    broadcast: TBroadcast;
  };
}
