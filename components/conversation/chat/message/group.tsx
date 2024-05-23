import useBorderColor from "@/hooks/useBorderColor"
import { TChat } from "@/types/chats"
import { TMessage } from "@/types/messages"
import _ from "lodash"
import { Fragment } from "react"
import { FlatList, View } from "react-native"
import { Chip, Divider } from "react-native-paper"
import MessageItem from "."

function DayLabel(
  {message}: {
    message: TMessage
  }
) {
  const dayLabel = new Date(message.created).toLocaleDateString("en-US", {
    day: "2-digit",
    month: "long"
  })
  const borderColor = useBorderColor()
  return (
    <Fragment>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 8
        }}
      >
        <Chip
          textStyle={{ fontSize: 12 }}
          compact
        >
          {dayLabel}
        </Chip>
      </View>
      <Divider style={{ backgroundColor: borderColor }} />
    </Fragment>
  )
}

export function MessagesGroup(
  {
    messages, chat
  }: {
    messages: TMessage[],
    chat: TChat
  }
) {

  if (!messages) return void null

  return (
    <View
      style={{
        marginTop: 16
      }}
    >
      <DayLabel message={_.first(messages) as TMessage} />
      <FlatList
        data={messages}
        renderItem={
          ({item}) => <MessageItem message={item} chat={chat} />
        }
        keyExtractor={(item) => item.id}
      />
    </View>
  )
}