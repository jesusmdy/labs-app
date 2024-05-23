import { Platform } from "react-native";

export default function usePlatform() {
  const isIos = Platform.OS === "ios"
  const isAndroid = Platform.OS === "android"
  return { isAndroid, isIos }
}