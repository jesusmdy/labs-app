import { Platform } from "react-native";

export const BLUR_AMMOUNT = Platform.select({
  ios: 25,
  android: 30,
});
