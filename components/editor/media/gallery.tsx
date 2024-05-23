import React, { Fragment } from 'react'
import { IconButton } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker';
import { useToggle } from "@uidotdev/usehooks";
import _ from "lodash";
import { parseAssetList } from "@/utils/file";
import { useFormContext } from "react-hook-form";

export default function GalleryField() {
  const [status, requestPermission] = ImagePicker.useCameraPermissions();
  const [loading, toggleLoading] = useToggle(false)
  const form = useFormContext()
  const media = form.watch("media")

  async function handleGalleryCamera() {
    if (status) {
      toggleLoading()
      try {
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          quality: 1,
          allowsMultipleSelection: true,
          selectionLimit: 10,
          base64: true
        });
        if (!result.canceled) {
          const images = await parseAssetList(result.assets)
          form.setValue(
            "media",
            _.concat(
              images,
              (() => {
                if (media !== undefined && Array(media).length > 0) return media
                return []
              })()
            ),
            {
              shouldDirty: true,
              shouldValidate: true,
              shouldTouch: true
            }
          )
        }
      } catch (e) {
        console.log(e)
      } finally {
        toggleLoading()
      }
    } else {
      requestPermission().then(handleGalleryCamera)
    }
  }

  return (
    <Fragment>
      <IconButton
        size={20}
        onPress={handleGalleryCamera}
        loading={loading}
        icon={
          ({size, color}) => (
            <Ionicons size={size} color={color} name="image-outline" />
          )
        }
      />
    </Fragment>
  )
}