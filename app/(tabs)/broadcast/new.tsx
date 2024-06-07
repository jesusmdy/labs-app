import MessageEditor from "@/components/editor/editor";
import useMD3Theme from "@/hooks/useMD3Theme";
import { BLUR_AMMOUNT } from "@/utils/blur";
import { sizes } from "@/utils/spacing";
import { BlurView } from "@react-native-community/blur";
import { Fragment } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  View,
  useColorScheme,
} from "react-native";
import { Text } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NewBroadcastModal() {
  const insets = useSafeAreaInsets();
  async function handleSend(data: any) {}
  const colorScheme = useColorScheme();
  const theme = useMD3Theme();
  return (
    <Fragment>
      <View style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text>Modal</Text>
        </View>
      </View>
      <BlurView
        blurAmount={BLUR_AMMOUNT}
        blurType={colorScheme ?? "light"}
        style={{
          padding: sizes.defaultPadding,
          paddingBottom: insets.bottom,
        }}
      >
        <MessageEditor onSend={handleSend} />
      </BlurView>
    </Fragment>
  );
}
