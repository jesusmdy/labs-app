import { ImagePickerAsset } from "expo-image-picker";
import _ from "lodash";
import { getColors, ImageColorsResult } from "react-native-image-colors";
import * as ImagePicker from "expo-image-picker";

export interface IAssetResult extends ImagePickerAsset {
  colors: ImageColorsResult | undefined;
  file: File;
}

export async function parseAssetList(
  files: ImagePickerAsset[],
): Promise<IAssetResult[]> {
  return await Promise.all([
    ...files.map(async (asset) => {
      const colors =
        asset.type === "image" ? await getColors(asset.uri) : void null;
      const request = await fetch(asset.uri);
      const blob = await request.blob();
      const file = new File([blob], asset.fileName as string, {
        type: blob.type,
      });
      return {
        ...asset,
        colors,
        file,
      };
    }),
  ]);
}

interface ISelectFile {
  options: ImagePicker.ImagePickerOptions;
}

export const mediaTypeOptions = ImagePicker.MediaTypeOptions;
export async function selectFileFromGallery(
  props: ISelectFile,
): Promise<IAssetResult[]> {
  try {
    const result = await ImagePicker.launchImageLibraryAsync(props.options);
    if (result.assets && result.assets.length > 0) {
      const assets = await parseAssetList(
        _.map(result.assets, (asset) => {
          if (props.options.allowsEditing) {
            const fileName =
              `${new Date().valueOf().toString()}.${asset.mimeType?.split("/")[1]}`.trim();
            return {
              ...asset,
              fileName,
              type: "image",
            };
          }
          return asset;
        }),
      );
      return assets;
    } else throw new Error("No media selected");
  } catch (e) {
    return [];
  }
}
