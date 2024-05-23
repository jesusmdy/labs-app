import { TUser } from "@/types/users";
import { getFileUrl } from "@/utils/queries/media";
import { Ionicons } from "@expo/vector-icons";
import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Text } from "react-native-paper";

interface IUserItem {
  user: TUser,
  startContent?: ReactNode,
  endContent?: ReactNode
}

function UserAvatar({user}: Pick<IUserItem, "user">) {
  const size = 42
  if (user.avatar === "") {
    return (
      <Avatar.Icon
        size={size}
        icon={
          ({size, color}) => (
            <Ionicons
              size={size}
              color={color}
              name="person"
            />
          )
        }
      />
    )
  }
  return (
    <Avatar.Image
      source={{
        uri: getFileUrl(user, user.avatar)
      }}
      size={size}
    />
  )
}

export default function UserItem(
  {user, startContent, endContent}: IUserItem
) {
  return (
    <View style={styles.wrapper}>
      {startContent && startContent}
      <UserAvatar user={user} />
      <View style={styles.content}>
        <Text variant="bodyMedium">{user.name}</Text>
        <Text variant="titleSmall">@{user.username}</Text>
      </View>
      {endContent && endContent}
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8
  },
  content: {
    flex: 1
  }
})
