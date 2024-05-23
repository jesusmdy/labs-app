import { IconButton } from "react-native-paper"
import useMD3Theme from "@/hooks/useMD3Theme"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker'
import { useFormContext } from "react-hook-form"
import { useToggle } from "@uidotdev/usehooks"
import { parseAssetList } from "@/utils/file"
import _ from "lodash"

export default function IconSelectorButton() {
  const [loading, toggleLoading] = useToggle()
  const theme = useMD3Theme()
  const {setValue, watch} = useFormContext()
  const icon = watch("icon")

  async function handleIconSelection() {
    if (icon) {
      return setValue("icon", void null, {
        shouldValidate: true
      })
    }
    try {
      toggleLoading()
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1,1],
        base64: true,
      });
      if (result.assets && result.assets.length > 0) {
        const assets = await parseAssetList(
          _.map(
            result.assets,
            (asset) => ({
              ...asset,
              fileName: `
                ${new Date().valueOf().toString()}.${asset.mimeType?.split("/")[1]}
              `.trim(),
              type: "image"
            })
          )
        )
        const asset = _.first(assets)
        console.log(asset)
        setValue("icon", asset, {
          shouldDirty: true,
          shouldTouch: true,
          shouldValidate: true
        })
      }
    } catch(e) {
      console.log(e)
    } finally {
      toggleLoading()
    }
  }
  return (
    <IconButton
      iconColor={theme.colors.primary}
      onPress={handleIconSelection}
      loading={loading}
      icon={({size, color}) => (
        <Ionicons
          size={size}
          color={
            icon
              ? "#fff"
              : color
          }
          name={
            icon
              ? "trash"
              : "camera"
          }
        />
      )}
    />
  )
}