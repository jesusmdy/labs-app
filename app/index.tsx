import { Text, View } from "@/components/Themed";
import useAuth, { STATUS } from "@/hooks/useAuth";
import { Redirect, Stack } from "expo-router";
import { KNOWN_ROUTES } from "@/utils/routes";

export default function IndexScreen() {
  const { status } = useAuth();

  if (status === STATUS.UNKNOWN) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
  if (status === STATUS.AUTHED) {
    return <Redirect href={KNOWN_ROUTES.tabs.broadcast} />;
  }

  if (status === STATUS.UNAUTHED) {
    return <Redirect href={KNOWN_ROUTES.identify.login} />;
  }

  return <Stack />;
}
