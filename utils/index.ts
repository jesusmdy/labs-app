import { TChat } from "@/types/chats";
import { TUser } from "@/types/users";
import _ from "lodash";
import { ViewStyle } from "react-native";

export const getOtherMember = (members: TUser[], user: TUser) => {
  const otherMember = _.find(members, (member) => member.id != user.id);
  return otherMember;
};

export const getChatTitle = (
  chat: TChat | null,
  currentUser: TUser,
): string => {
  if (!chat) return "";
  if (chat.isGroup) return chat.title;
  else {
    const otherMember = getOtherMember(chat.users, currentUser);
    if (otherMember) return otherMember.name;
    else return "<Draft>";
  }
};

type TUserDetails = {
  name: string;
  username: string;
};

export const getChatUserDetails = (
  chat: TChat | null,
  currentUser: TUser,
): TUserDetails | null => {
  if (!chat) return null;
  if (chat.isGroup) return null;

  const otherMember = getOtherMember(chat.expand.members, currentUser);
  if (otherMember)
    return {
      name: otherMember.name,
      username: otherMember.username,
    };
  else return null;
};

export const getUserById = (users: TUser[], id: string) =>
  _.find(users, { id });

export const PAGES = 5;
export const BGCOLOR = ["#fdc08e", "#fff6b9", "#99d1b7", "#dde5fe", "#f79273"];
export const IMAGE_URIS = [
  "https://apod.nasa.gov/apod/image/1410/20141008tleBaldridge001h990.jpg",
  "https://apod.nasa.gov/apod/image/1409/volcanicpillar_vetter_960.jpg",
  "https://apod.nasa.gov/apod/image/1409/m27_snyder_960.jpg",
  "https://apod.nasa.gov/apod/image/1409/PupAmulti_rot0.jpg",
  "https://apod.nasa.gov/apod/image/1510/lunareclipse_27Sep_beletskycrop4.jpg",
];
export const thumbsUp = "\uD83D\uDC4D";
export const logoUrl =
  "https://raw.githubusercontent.com/callstack/react-native-pager-view/master/img/viewpager-logo.png";

export type CreatePage = {
  key: number;
  style: ViewStyle;
  imgSource: { uri: string };
};

export const createPage = (key: number): CreatePage => {
  return {
    key: key,
    style: {
      flex: 1,
      backgroundColor: BGCOLOR[key % BGCOLOR.length],
      alignItems: "center",
      padding: 20,
    },
    imgSource: { uri: IMAGE_URIS[key % BGCOLOR.length] || "" },
  };
};
