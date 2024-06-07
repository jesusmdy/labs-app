import React, { Fragment } from "react";
import * as ImagePicker from "expo-image-picker";
import { useToggle } from "@uidotdev/usehooks";
import _ from "lodash";
import { parseAssetList } from "@/utils/file";
import { useFormContext } from "react-hook-form";
import useMD3Theme from "@/hooks/useMD3Theme";
import { Paperclip } from "lucide-react-native";
import { sizes } from "@/utils/spacing";
import { TouchableOpacity } from "react-native";
import { ActivityIndicator } from "react-native-paper";

export default function GalleryField() {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [loading, toggleLoading] = useToggle(false);
  const form = useFormContext();
  const theme = useMD3Theme();

  async function handleGalleryCamera() {
    if (status) {
      toggleLoading();
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          quality: 1,
          allowsMultipleSelection: true,
          selectionLimit: 10,
          base64: true,
        });
        if (!result.canceled) {
          const images = await parseAssetList(result.assets);
          form.setValue(
            "media",
            _.concat(
              images,
              (() => {
                return [];
              })(),
            ),
            {
              shouldDirty: true,
              shouldValidate: true,
              shouldTouch: true,
            },
          );
        }
      } catch (e) {
        console.log(e);
      } finally {
        toggleLoading();
      }
    } else {
      requestPermission().then(handleGalleryCamera);
    }
  }

  return (
    <Fragment>
      {loading ? (
        <ActivityIndicator
          size={sizes.defaultSizes.xLarge}
          color={theme.colors.primary}
        />
      ) : (
        <TouchableOpacity onPress={handleGalleryCamera} disabled={loading}>
          <Paperclip
            size={sizes.defaultSizes.xLarge}
            color={theme.colors.primary}
          />
        </TouchableOpacity>
      )}
    </Fragment>
  );
}
