import { TMessage } from "@/types/messages";
import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";
import { useMemo } from "react";

export interface IMessagePreviewContent {
  content: string;
  icon?: (typeof Ionicons)["name"];
}

function formatPlural(number: number, word: string): string | undefined {
  if (!number) return void null;
  return `${number} ${word}${number > 1 ? "s" : ""}`;
}

function getMediaLabel(message: TMessage): string {
  if (message.expand?.media) {
    const counter = _.countBy(message.expand.media, "type");
    const strings = [];
    if (counter.image) strings.push(formatPlural(counter.image, "Image"));
    if (counter.video) strings.push(formatPlural(counter.video, "Video"));
    return strings.join(",");
  }
  return "Media";
}

export default function useGetLastMessageContent(
  lastMessage?: TMessage,
): IMessagePreviewContent | undefined {
  function getMessageContent(lastMessage: TMessage): string {
    if (lastMessage.content === "" && lastMessage.media.length === 0) {
      return "Message unavailable";
    } else {
      if (lastMessage.content === "" && lastMessage.media.length > 0) {
        return getMediaLabel(lastMessage);
      }
      return _.truncate(
        String(lastMessage.content).slice(0, lastMessage.content.indexOf("\n")),
        { length: 30 },
      );
    }
  }

  function getMessageMediaIcon(
    lastMessage: TMessage,
  ): IMessagePreviewContent["icon"] | undefined {
    if (lastMessage.content === "" && lastMessage.media.length === 0)
      return "information-circle-outline";

    if (lastMessage.media.length === 1) {
      const media = _.first(lastMessage.expand?.media);
      if (media) {
        if (media.type === "image") return "image-outline";
        if (media.type === "video") return "videocam-outline";
        else return "help-circle-outline";
      } else return "images-outline";
    } else if (lastMessage.media.length > 1) {
      const mediaList = _.get(lastMessage, "expand.media");
      if (mediaList) {
        const isEveryImage = _.every(mediaList, (m) => m.type === "image");
        const isEveryVideo = _.every(mediaList, (m) => m.type === "video");
        if (isEveryImage) return "image-outline";
        if (isEveryVideo) return "videocam-outline";
        else return "images-outline";
      } else return "images-outline";
    }
  }

  const content = useMemo((): IMessagePreviewContent | undefined => {
    if (!lastMessage) return void null;
    return {
      content: getMessageContent(lastMessage),
      icon: getMessageMediaIcon(lastMessage),
    };
  }, [lastMessage]);
  return content;
}
