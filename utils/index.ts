import { TChat } from "@/types/chats";
import { TUser } from "@/types/users";
import _ from "lodash";

export const getOtherMember = (members: TUser[], user: TUser) => {
  const otherMember = _.find(members, (member) => member.id != user.id);
  return otherMember;
}

export const getChatTitle = (chat: TChat | null, currentUser: TUser): string => {
  if (!chat) return ''
  if (chat.isGroup) return chat.title;
  else {
    const otherMember = getOtherMember(chat.users, currentUser)
    if (otherMember) return otherMember.name
    else return '<Draft>'
  }
}

type TUserDetails = {
  name: string,
  username: string
}

export const getChatUserDetails = (chat: TChat | null, currentUser: TUser): TUserDetails | null => {
  if (!chat) return null
  if (chat.isGroup) return null

  const otherMember = getOtherMember(chat.expand.members, currentUser)
  if (otherMember) return {
    name: otherMember.name,
    username: otherMember.username
  }
  
  else return null
}

export const getUserById = (users: TUser[], id: string) => _.find(users, { id })
