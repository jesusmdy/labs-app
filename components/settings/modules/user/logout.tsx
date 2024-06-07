import pb from "@/api";
import useMD3Theme from "@/hooks/useMD3Theme";
import useUserStore from "@/store/user";
import { KNOWN_ROUTES } from "@/utils/routes";
import { sizes } from "@/utils/spacing";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Button } from "react-native-ui-lib";

export default function LogoutModule() {
  const theme = useMD3Theme();
  const { setUser } = useUserStore();
  const router = useRouter();
  const handleLogout = async () => {
    pb.authStore.clear();
    setUser();
    router.replace(KNOWN_ROUTES.identify.login);
  };
  return (
    <Button
      label="Sign out"
      labelStyle={{ flex: 1 }}
      style={{ marginTop: sizes.defaultSizes.small }}
      color={theme.colors.primary}
      onPress={handleLogout}
      iconOnRight
      link
      iconSource={() => (
        <Ionicons
          name="log-out-outline"
          size={sizes.defaultSizes.large}
          color={theme.colors.primary}
        />
      )}
    />
  );
}
