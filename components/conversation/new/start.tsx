import { Link, useRouter } from "expo-router";
import { KNOWN_ROUTES } from "@/utils/routes";
import { Button } from "react-native-ui-lib";

export default function StartConversationButton() {
  const router = useRouter();
  const onPress = () => router.push(KNOWN_ROUTES.conversation.new.direct);
  return <Button label="Create" size="small" link onPress={onPress} />;
}
