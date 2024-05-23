import Container from "@/components/ui/container"
import BroadcastHeader from "@/components/broadcast/screen/header"
import BroadcastList from "@/components/broadcast/screen/list/items"
import BroadcastListProvider from "@/components/broadcast/screen/provider"
import { View } from "react-native-ui-lib"
import { sizes } from "@/utils/spacing"

export default function BroadcastScreen() {
  return (
    <BroadcastListProvider>
      <BroadcastHeader />
      <BroadcastList />
    </BroadcastListProvider>
  )
}