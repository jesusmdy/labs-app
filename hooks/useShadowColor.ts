import { ViewStyle } from "react-native";
import useBorderColor from "./useBorderColor";

export function useShadowColor() {
  const borderColor = useBorderColor();
  const shadow: ViewStyle = {
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 1.41,
    shadowOpacity: 0.2,
    shadowColor: borderColor,
    elevation: 2,
  };
  return shadow;
}
