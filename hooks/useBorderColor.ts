import { useColorScheme } from "react-native";

export default function useBorderColor() {
  const colorScheme = useColorScheme()
  const color = colorScheme === "dark" ? "rgba(255,255,255,.10)" : "rgba(25,25,25,.10)"
  return color
}