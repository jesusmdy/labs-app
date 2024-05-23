import useBorderColor from "@/hooks/useBorderColor";
import useColors from "@/hooks/useColors";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren, useState } from "react";
import { Controller, FormProvider, useForm, useFormContext, UseFormReturn } from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";
import { Button } from "react-native-paper";
import { z } from "zod";
import CameraField from "./media/camera";
import GalleryField from "./media/gallery";
import MediaPreview from "./media/preview";
import { formSchema } from "./schema";
import { IAssetResult } from "@/utils/file";

type formType = z.infer<typeof formSchema>

export interface PropsWithForm {
  form: UseFormReturn<formType>
}

function EditorWrapper (props: PropsWithChildren) {
  const {watch} = useFormContext()
  const media = watch("media")
  const hasMedia = media && media.length !== 0
  const colors = useColors()
  const borderColor = useBorderColor()
  const {children} = props;
  return (
    <View
      style={{
        ...styles.wrapper,
        borderColor,
        backgroundColor: colors.background,
        borderTopEndRadius: hasMedia ? 10 : void null,
        borderTopStartRadius: hasMedia ? 10 : void null,
      }}
    >
      {children}
    </View>
  )
}

export type TMessageSent = {
  id: string
  content: string,
  media: IAssetResult[]
}

export default function MessageEditor(
  {onSend}: {
    onSend: (message: TMessageSent) => Promise<any>
  }
) {
  const [loading, setLoading] = useState(false)
  const form = useForm<formType>({
    resolver: zodResolver(formSchema)
  })

  async function onSubmit(values: formType) {
    const messageItem = {
      id: String(Math.random()),
      content: values.content || "",
      media: values.media || []
    }
    try {
      onSend(messageItem)
        .then(
          () => {
            form.setValue("content", "", { shouldValidate: true })
            form.setValue("media", void null, { shouldValidate: true }) 
          }
        )
    } catch(e) {
      console.log(e)
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormProvider {...form}>
      <EditorWrapper>
        <MediaPreview />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >

          <CameraField />
          <Controller
            control={form.control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Start typing..."
                readOnly={loading}
                multiline
              />
            )}
            name="content"
          />
          <GalleryField />
          {
            form.formState.isValid && (
              <Button
                onPress={form.handleSubmit(onSubmit)}
                loading={loading}
                mode="text"
                compact
                style={{ marginRight: 6 }}
              >
                Send
              </Button>
            )
          }
        </View>
      </EditorWrapper>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 2,
    borderRadius: 30,
  },
  input: {
    flex: 1,
    paddingHorizontal: 4,
    marginTop: -4,
  }
})
