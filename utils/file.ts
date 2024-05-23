import { ImagePickerAsset } from "expo-image-picker";
import _ from "lodash";
import { getColors, ImageColorsResult } from "react-native-image-colors";

export interface IAssetResult extends ImagePickerAsset {
  colors: ImageColorsResult | undefined,
  file: File
}

export async function parseAssetList(
  files: ImagePickerAsset[]
): Promise<IAssetResult[]> {
  return await Promise.all(
    [
      ...files.map(
        async (asset) => {
          const colors = asset.type === "image" ? await getColors(asset.uri) : void null
          const request = await fetch(asset.uri)
          const blob = await request.blob()
          const file = new File(
            [blob],
            asset.fileName as string,
            {
              type: blob.type
            }
          )
          return {
            ...asset,
            colors,
            file
          }
        }
      )
    ]
  )
}