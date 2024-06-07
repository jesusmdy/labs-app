import { View, Text } from "react-native";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import MessageEditor, { TMessageSent } from "@/components/editor/editor";
import { sizes } from "@/utils/spacing";
import { TBroadcast } from "@/types/broadcast";
import { createBroadcastPost } from "@/utils/queries/broadcast";
import { IAssetResult } from "@/utils/file";
import { createMedia } from "@/utils/queries/media";
import useMD3Theme from "@/hooks/useMD3Theme";
import useBorderColor from "@/hooks/useBorderColor";

interface IBroadcastEditorWrapper {
  broadcast: TBroadcast;
}

export default function BroadcastEditorWrapper({
  broadcast,
}: IBroadcastEditorWrapper) {
  const insets = useSafeAreaInsets();
  const theme = useMD3Theme();
  const borderColor = useBorderColor();

  async function uploadMediaList(mediaList: IAssetResult[]): Promise<string[]> {
    return Promise.all([...mediaList.map(createMedia)]).then((mediaArray) =>
      mediaArray.map((item) => item.id),
    );
  }

  async function handleSend(message: TMessageSent) {
    let media = [] as string[];
    if (message.media && message.media.length > 0) {
      try {
        media = await uploadMediaList(message.media);
      } catch (e) {
        console.log(e);
      }
    }
    return await createBroadcastPost({
      content: message.content,
      media: media,
      broadcastId: broadcast.id,
    });
  }

  if (!broadcast.isAuthor) return void null;

  return (
    <View
      style={{
        paddingBottom: insets.bottom,
        paddingHorizontal: sizes.defaultPadding,
        paddingTop: sizes.defaultPadding / 2,
        backgroundColor: theme.colors.surface,
        borderTopWidth: 1,
        borderColor,
      }}
    >
      <MessageEditor onSend={handleSend} />
    </View>
  );
}
