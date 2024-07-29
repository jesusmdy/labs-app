import { sizes } from "@/utils/spacing";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

export default function SearchButton() {
  return (
    <TouchableOpacity
      style={{
        width: sizes.defaultSizes.largeX2,
        height: sizes.defaultSizes.largeX2,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Ionicons name="search" size={sizes.defaultSizes.large} />
    </TouchableOpacity>
  );
}
