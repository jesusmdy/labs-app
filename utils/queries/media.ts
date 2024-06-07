import pb from "@/api";
import { TMedia } from "@/types/media";
import { FileOptions, RecordModel } from "pocketbase";
import { IAssetResult } from "../file";
import { KNOWN_COLLECTIONS } from "../collections";

export const getMediaUrl = (media: TMedia) => {
  return pb.files.getUrl(media, media.file);
};

export const getFileUrl = (
  collection: RecordModel,
  file: string,
  options?: FileOptions,
) => {
  return pb.files.getUrl(collection, file, options);
};

export const createMedia = (media: IAssetResult): Promise<TMedia> => {
  const form = new FormData();
  form.append("file", {
    name: media.fileName,
    type: media.mimeType,
    uri: media.uri,
  } as any);
  form.append("width", String(media.width));
  form.append("height", String(media.height));
  form.append("colors", JSON.stringify(media.colors));
  form.append("filesize", String(media.fileSize));
  form.append("type", String(media.type));

  return pb.collection(KNOWN_COLLECTIONS.media).create(form, {
    requestKey: null,
  });
};
