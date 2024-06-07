import useAuth from "@/hooks/useAuth";
import useMD3Theme from "@/hooks/useMD3Theme";
import useUserStore from "@/store/user";
import { TUser } from "@/types/users";
import {
  IAssetResult,
  mediaTypeOptions,
  selectFileFromGallery,
} from "@/utils/file";
import { createMedia, getFileUrl } from "@/utils/queries/media";
import { updateUserPicture } from "@/utils/queries/user";
import { sizes } from "@/utils/spacing";
import { Ionicons } from "@expo/vector-icons";
import { useToggle } from "@uidotdev/usehooks";
import _ from "lodash";
import { Fragment, useMemo } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { Avatar, Menu } from "react-native-paper";
import { ActionSheet, Dialog, PanningProvider } from "react-native-ui-lib";

interface IUserAvatar {
  user: TUser;
  size?: number;
}

export function UserAvatar({ user, size = 48 }: IUserAvatar) {
  const avatarUrl = useMemo(() => getFileUrl(user, user.avatar), [user]);

  return (
    <Fragment>
      {avatarUrl ? (
        <Avatar.Image source={{ uri: avatarUrl }} size={size} />
      ) : (
        <Avatar.Icon
          size={size}
          icon={({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          )}
        />
      )}
    </Fragment>
  );
}

export default function AvatarModule() {
  const [open, toggleOpen] = useToggle();
  const { user } = useAuth();
  const { setUser } = useUserStore();
  const theme = useMD3Theme();

  async function updateProfilePicture(media?: IAssetResult) {
    try {
      toggleOpen();
      const updatedUser = await updateUserPicture(user, media);
      setUser(updatedUser as TUser);
    } catch (e) {
      console.log(e);
      toggleOpen();
    }
  }

  async function handleSelectPicture() {
    try {
      const files = await selectFileFromGallery({
        options: {
          allowsEditing: true,
          base64: true,
          aspect: [1, 1],
          mediaTypes: mediaTypeOptions.Images,
        },
      });
      if (files && files.length > 0) {
        await updateProfilePicture(files[0]);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <Fragment>
      <TouchableOpacity style={styles.wrapper} onPress={() => toggleOpen()}>
        <UserAvatar user={user} size={56} />
      </TouchableOpacity>
      <ActionSheet
        visible={open}
        onDismiss={() => {}}
        cancelButtonIndex={3}
        destructiveButtonIndex={2}
        showCancelButton
        onModalDismissed={() => toggleOpen(false)}
        options={[
          {
            label: "Change profile picture",
            onPress: () => handleSelectPicture(),
          },
          {
            label: "Remove",
            onPress: () => updateProfilePicture(),
          },
          {
            label: "Cancel",
            onPress: () => toggleOpen(false),
          },
        ]}
      />
    </Fragment>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
  },
});
