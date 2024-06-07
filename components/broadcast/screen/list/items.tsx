import { useBroadcastStoreSelectors } from "@/store/broadcast";
import { FlatList } from "react-native";
import BroadcastItem from "./item";
import BroadcastHeader from "../header";
import EmptyBroadcastList from "./empty";
import { sizes } from "@/utils/spacing";

export default function BroadcastList() {
  const { broadcastList } = useBroadcastStoreSelectors();

  return (
    <FlatList
      data={broadcastList}
      renderItem={({ item }) => <BroadcastItem broadcast={item} />}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={BroadcastHeader}
      ListEmptyComponent={<EmptyBroadcastList />}
      contentContainerStyle={{ gap: sizes.defaultSizes.small }}
      stickyHeaderIndices={[0]}
      scrollEnabled
      bounces={false}
    />
  );
}
