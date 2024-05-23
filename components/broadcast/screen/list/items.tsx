import { useBroadcastStoreSelectors } from "@/store/broadcast"
import { View, Text, FlatList } from "react-native"
import BroadcastItem from "./item"

export default function BroadcastList() {
  const {broadcastList} = useBroadcastStoreSelectors()

  if (broadcastList.length === 0) {
    return (
      <View>
        <Text>You are not following any broadcast.</Text>
        <Text>Follow some broadcasts to see them here.</Text>
        <Text>Or create your own broadcast</Text>
      </View>
    )
  }
  return (
    <FlatList
      data={broadcastList}
      renderItem={
        ({item}) => <BroadcastItem broadcast={item} />
      }
      scrollEnabled
      keyExtractor={item => item.id}
    />
  )
}