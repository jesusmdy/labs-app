import useBorderColor from "@/hooks/useBorderColor";
import { TChat } from "@/types/chats";
import { TMessage } from "@/types/messages";
import _ from "lodash";
import { Fragment } from "react";
import { FlatList, View } from "react-native";
import { Chip, Divider } from "react-native-paper";
import MessageItem from ".";
import { sizes } from "@/utils/spacing";
import useMD3Theme from "@/hooks/useMD3Theme";
import { formatDay } from "@/utils/time";

function DayLabel({ message }: { message: TMessage }) {
  const dayLabel = formatDay(message.created);
  const borderColor = useBorderColor();
  const theme = useMD3Theme();
  return (
    <Fragment>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginBottom: 8,
        }}
      >
        <Chip
          compact
          textStyle={{
            fontSize: sizes.defaultSizes.medium - 4,
            color: theme.colors.outline,
          }}
          style={{
            backgroundColor: "transparent",
          }}
        >
          {dayLabel}
        </Chip>
      </View>
      <Divider style={{ backgroundColor: borderColor }} />
    </Fragment>
  );
}

export function MessagesGroup({
  messages,
  chat,
}: {
  messages: TMessage[];
  chat: TChat;
}) {
  if (!messages) return void null;

  return (
    <View
      style={{
        marginTop: 16,
      }}
    >
      <DayLabel message={_.first(messages) as TMessage} />
      <FlatList
        data={messages}
        renderItem={({ item }) => <MessageItem message={item} chat={chat} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}
