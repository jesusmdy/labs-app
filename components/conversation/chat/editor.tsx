import MessageEditor, { TMessageSent } from "@/components/editor/editor";
import { TChat } from "@/types/chats";
import { IAssetResult } from "@/utils/file";
import { createMedia } from "@/utils/queries/media";
import { sendMessage } from "@/utils/queries/messages";
import { PropsWithChildren } from "react";
import { StyleSheet, View } from "react-native";

function EditorWrapper (props: PropsWithChildren) {
  const {children} = props;
  return (
    <View style={styles.wrapper}>
      {children}
    </View>
  )
}

export default function ConversationEditor({chat}: {chat:TChat}) {

  async function uploadMediaList(mediaList: IAssetResult[]): Promise<string[]> {
    return Promise.all(
      [...mediaList.map(createMedia)]
    ).then(
      (mediaArray) => mediaArray.map(item => item.id)
    )
  }

  async function handleSend(message: TMessageSent) {
    let media = [] as string[]
    if (message.media && message.media.length > 0) {
      try {
        media = await uploadMediaList(message.media)
      } catch(e) {
        console.log(e)
      }
    }
    return await sendMessage({
      id: "",
      content: message.content,
      media: media,
      inboxId: chat.id
    })
  }

  return (
    <EditorWrapper>
      <MessageEditor
        onSend={handleSend}
      />
    </EditorWrapper>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8
  },
})
