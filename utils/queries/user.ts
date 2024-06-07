import pb from "@/api";
import { TUser } from "@/types/users";
import { IAssetResult } from "../file";
import { KNOWN_COLLECTIONS } from "../collections";

interface IAuthWithPasswordValues {
  emailOrUsername: string;
  password: string;
}

export const searchPeople = (search: string): Promise<TUser[]> => {
  return pb.send<TUser[]>("/api/services/user/search", {
    method: "POST",
    query: { search },
  });
};

export const authWithPassword = (values: IAuthWithPasswordValues) =>
  pb
    .collection("users")
    .authWithPassword(values.emailOrUsername, values.password);

export const updateUserPicture = (user: TUser, media?: IAssetResult) => {
  if (media) {
    const form = new FormData();
    form.append("avatar", {
      name: media.fileName,
      type: media.mimeType,
      uri: media.uri,
    } as any);
    return pb.collection(KNOWN_COLLECTIONS.users).update(user.id, form, {
      requestKey: null,
    });
  } else {
    return pb.collection(KNOWN_COLLECTIONS.users).update(
      user.id,
      {
        avatar: null,
      },
      {
        requestKey: null,
      },
    );
  }
};
