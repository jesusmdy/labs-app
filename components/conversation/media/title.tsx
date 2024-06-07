import { Text } from "react-native";
import { IMediaView } from ".";
import { shadow } from ".";
import { useMemo } from "react";
import useAuth from "@/hooks/useAuth";

export default function MediaTitle({ media }: IMediaView) {
  const { user } = useAuth();
  const label = useMemo(() => {
    if (media.uploader === user.id) return "You";
    if (media.expand?.uploader) return media.expand?.uploader.name;
  }, [media]);
  return <Text style={{ ...shadow, flex: 1 }}>{label}</Text>;
}
