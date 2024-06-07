import { TBroadcast } from "@/types/broadcast";
import { TUser } from "@/types/users";

export function checkOwnership(broadcast: TBroadcast, user: TUser | undefined) {
  if (!user) return false;
  return broadcast.author === user.id;
}

export function insertOwnership(
  broadcast: TBroadcast,
  user: TUser | undefined,
): TBroadcast {
  return {
    ...broadcast,
    isAuthor: checkOwnership(broadcast, user),
  };
}

export function parseBroadcasts(
  broadcasts: TBroadcast[],
  user: TUser | undefined,
) {
  return broadcasts.map((broadcast) => insertOwnership(broadcast, user));
}

export const broadcastFilterTabs = [
  {
    label: "Everything",
    value: "everything",
  },
  {
    label: "Following",
    value: "following",
  },
  {
    label: "Lists",
    value: "list",
  },
];
