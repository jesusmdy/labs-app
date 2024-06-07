import { View, FlatList, Image } from "react-native";
import { useFormContext } from "react-hook-form";
import { IAssetResult } from "@/utils/file";
import { IconButton } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";
import _ from "lodash";
import { sizes } from "@/utils/spacing";

function MediaItem({ media }: { media: IAssetResult }) {
  const { watch, setValue } = useFormContext();
  const mediaList = watch("media");

  const handleDelete = () => {
    const filteredMediaList = _.filter(
      mediaList,
      (asset) => asset.assetId !== media.assetId,
    );
    setValue("media", filteredMediaList, { shouldValidate: true });
  };

  return (
    <View style={{ position: "relative" }}>
      <Image
        style={{
          borderRadius: 6,
        }}
        source={{ uri: media.uri }}
        width={100}
        height={100}
      />
      <IconButton
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          backgroundColor: "rgba(25,25,25,0.50)",
        }}
        onPress={handleDelete}
        size={10}
        icon={({ size, color }) => (
          <Ionicons size={20} color="#fff" name="close-outline" />
        )}
      />
    </View>
  );
}

export default function MediaPreview() {
  const { watch } = useFormContext();
  const media = watch("media");

  if (!media || media.length === 0) return void null;

  return (
    <FlatList
      data={media}
      renderItem={({ item }) => <MediaItem media={item} />}
      contentContainerStyle={{
        paddingBottom: sizes.defaultSizes.small,
        gap: 5,
      }}
      keyExtractor={(item) => item.assetId}
      horizontal
    />
  );
}
