import { z } from "zod"

const fileSchema = z.object({
  assetId: z.string(),
  base64: z.string(),
  colors: z.object({
    background: z.string(),
    detail: z.string(),
    platform: z.string(),
    primary: z.string(),
    secondary: z.string(),
  }),
  duration: z.number(),
  exif: z.any(),
  file: z.any(),
  fileName: z.string(),
  fileSize: z.number(),
  height: z.number(),
  mimeType: z.string(),
  type: z.string(),
  uri: z.string(),
  width: z.number()
})

export const formSchema = z.object({
  content: z.string().max(500).optional(),
  media: z.array(z.any()).max(4).optional()
}).refine(
  (data) =>{
    if (
      (
        data.media
        && (data.media.length > 0 && (!data.content || data.content.length === 0))
      )
      || (
        data.content
        && (data.content.length > 0 && (!data.media || data.media.length === 0))
      )
      || (
        data.content && data.media
        && (data.media.length > 0 && data.content.length > 0)
      )
    ) return true
    return false
  },
  {
    message: "Content or media is required",
    path: ["content"]
  }
)