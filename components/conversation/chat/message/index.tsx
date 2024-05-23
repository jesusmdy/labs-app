import { StyleSheet, View } from "react-native"
import { TChat } from "@/types/chats"
import { TMessage } from "@/types/messages"
import { Card, Text } from "react-native-paper"
import useAuth from "@/hooks/useAuth"
import { formatMessageTime } from "@/utils/message"
import usePlatform from "@/hooks/usePlatform"
import useIsMessageSender from "@/hooks/useIsMessageSender"
import useBubbleColors from "@/hooks/useBubbleColors"
import useBorderColor from "@/hooks/useBorderColor"
import _ from "lodash"
import Media from "@/components/conversation/chat/message/media"

interface IMessageItem {
  chat: TChat,
  message: TMessage
}

interface IMessageItemComponent extends Pick<IMessageItem, "message"> {
  isSender: boolean
}

function Content(props: IMessageItemComponent) {
  const {message} = props;
  const {user} = useAuth()
  const isSender = useIsMessageSender(user, message)
  const borderColor = useBorderColor()

  if (_.isEmpty(message.content)) return void null

  return (
    <Card
      mode={
        isSender
          ? "outlined"
          : "contained"
      }
      style={{
        padding: 0, maxWidth: "80%",
        borderColor
      }}
    >
      <Card.Content style={{ paddingVertical: 8, paddingHorizontal: 12 }}>
        <Text>{message.content}</Text>
      </Card.Content>
    </Card>
  )
}

function Created(props: IMessageItemComponent) {
  const {message} = props;
  const time = formatMessageTime(message)
  return (
    <Text variant="labelSmall">{time}</Text>
  )
}

export default function MessageItem(props: IMessageItem) {
  const {message} = props;
  const {user} = useAuth()

  const isSender = useIsMessageSender(user, message)

  return (
    <View
      style={{
        ...styles.wrapper,
        alignItems: isSender ? "flex-end" : "flex-start"
      }}
    >
      <Content message={message} isSender={isSender} />
      <Media message={message} />
      <Created message={message} isSender={isSender} />
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    marginVertical: 8
  }
})
