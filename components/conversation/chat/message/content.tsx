import useAuth from "@/hooks/useAuth";
import { IMessageItemComponent } from ".";
import useIsMessageSender from "@/hooks/useIsMessageSender";
import useMD3Theme from "@/hooks/useMD3Theme";
import { Text } from "react-native-paper";
import { View } from "react-native";
import { sizes } from "@/utils/spacing";
import _ from "lodash";
import { useShadowColor } from "@/hooks/useShadowColor";

export default function Content(props: IMessageItemComponent) {
  const { message } = props;
  const { user } = useAuth();
  const isSender = useIsMessageSender(user, message);
  const theme = useMD3Theme();
  const shadow = useShadowColor();

  if (_.isEmpty(message.content)) return void null;

  return (
    <View
      style={{
        ...shadow,
        marginVertical: sizes.defaultSizes.small / 2,
        maxWidth: sizes.maxWidth as never,
        paddingVertical: sizes.defaultSizes.medium / 2,
        paddingHorizontal: sizes.defaultSizes.medium,
        borderRadius: sizes.defaultSizes.medium - 4,
        backgroundColor: isSender
          ? theme.colors.primaryContainer
          : theme.colors.surface,
      }}
    >
      <Text
        variant="bodyMedium"
        style={{
          color: isSender
            ? theme.colors.onPrimaryContainer
            : theme.colors.onBackground,
        }}
      >
        {message.content}
      </Text>
    </View>
  );
}
