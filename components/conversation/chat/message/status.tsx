import useAuth from "@/hooks/useAuth";
import useIsMessageSender from "@/hooks/useIsMessageSender";
import useMD3Theme from "@/hooks/useMD3Theme";
import { TMessage } from "@/types/messages";
import { sizes } from "@/utils/spacing";
import { Ionicons } from "@expo/vector-icons";

interface IMessageStatus {
  message: TMessage;
}

export default function MessageStatus({ message }: IMessageStatus) {
  const { user } = useAuth();
  const isSender = useIsMessageSender(user, message);
  const theme = useMD3Theme();

  if (!isSender) return void null;

  if (isSender && !message.sent) {
    return (
      <Ionicons
        name="time-outline"
        size={sizes.defaultSizes.medium}
        color={theme.colors.outline}
      />
    );
  }
  return (
    <Ionicons
      name="checkmark-circle-outline"
      size={sizes.defaultSizes.medium}
      color={theme.colors.outline}
    />
  );
}
