import { BLUR_AMMOUNT } from "@/utils/blur";
import { BlurView, BlurViewProps } from "@react-native-community/blur";
import { useColorScheme } from "react-native";

export default function CustomBlurView({ children, ...rest }: BlurViewProps) {
  const colorScheme = useColorScheme();
  return (
    <BlurView
      blurType={colorScheme ?? "light"}
      blurAmount={BLUR_AMMOUNT}
      {...rest}
    >
      {children}
    </BlurView>
  );
}
