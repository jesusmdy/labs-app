import { FC, Fragment, useMemo } from "react"
import { IChatItemComponentProps } from "./item"
import { getOtherMember } from "@/utils"
import { Avatar } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"
import { getFileUrl, getMediaUrl } from "@/utils/queries/media"
import useMD3Theme from "@/hooks/useMD3Theme"

interface IIcon extends IChatItemComponentProps {
  size?: number
}

export const Icon: FC<IIcon> = ({chat, user, size = 40}) => {
  const {colors} = useMD3Theme()

  const url = useMemo(() => {
    if (chat.isGroup) {
      if (chat.expand.icon !== undefined) return getMediaUrl(chat.expand.icon)
    } else {
      const otherMember = getOtherMember(
        chat.expand.members,
        user
      )
      if (otherMember && otherMember.avatar) return getFileUrl(otherMember, otherMember.avatar)
    }
    
  }, [chat])
  
  return (
    <Fragment>
      {
        url
          ? <Avatar.Image source={{ uri: url }} size={size} />
          : (
            <Avatar.Icon
              color={colors.outline}
              style={{
                backgroundColor: colors.surfaceDisabled
              }}
              icon={
                ({color, size}) => (
                  <Ionicons
                    name={
                      chat.isGroup
                        ? "people"
                        : "person"
                    }
                    color={color}
                    size={size}
                  />
                )
              }
              size={size}
            />
          )
      }
    </Fragment>
  )
}