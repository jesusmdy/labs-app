import Colors from "@/constants/Colors";
import { useBroadcastStoreSelectors } from "@/store/broadcast";
import { lightOrDark } from "@/utils/color";
import { useMemo } from "react";
import { useColorScheme } from "react-native";
import { NativeStackNavigationOptions } from "react-native-screens/lib/typescript/native-stack/types";

export default function useBroadcastHeaderOptions() {
  const { broadcast } = useBroadcastStoreSelectors()
  const defaultColorScheme = useColorScheme()

  const options = useMemo(
    () => {
      const title = broadcast ? broadcast.title : "Broadcast";
      const background = broadcast?.expand.icon ? broadcast.expand.icon.colors.background : void null
      const colorSheme = background ? lightOrDark(background) : defaultColorScheme
      return {
        title,
        headerShown: true,
        headerTintColor: Colors[colorSheme ?? "light"].text,
        statusBarColor: Colors[colorSheme ?? "light"].text,
        headerStyle: {
          backgroundColor: background,
        },
      } as NativeStackNavigationOptions
    },
    [broadcast]
  )

  return options
}