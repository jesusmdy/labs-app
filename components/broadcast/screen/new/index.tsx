import useBorderColor from "@/hooks/useBorderColor";
import useMD3Theme from "@/hooks/useMD3Theme";
import { KNOWN_ROUTES } from "@/utils/routes";
import { sizes } from "@/utils/spacing";
import { useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Button, View } from "react-native-ui-lib";
import IconField from "./fields/icon";
import TitleField from "./fields/title";
import { z } from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import DescriptionField from "./fields/description";
import { useBroadcastStoreSelectors } from "@/store/broadcast";
import { createMedia } from "@/utils/queries/media";
import { createBroadcast } from "@/utils/queries/broadcast";
import { useToggle } from "@uidotdev/usehooks";

const formSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().optional(),
  icon: z.any().optional()
})

export type formType = z.infer<typeof formSchema>

export default function NewBroadcastForm() {
  const [loading, toggleLoading] = useToggle()
  const { setBroadcast } = useBroadcastStoreSelectors()
  const insets = useSafeAreaInsets()
  const borderColor = useBorderColor()
  const router = useRouter()

  const methods = useForm<formType>({
    resolver: zodResolver(formSchema)
  })

  async function onSubmit(values: formType) {
    try {
      toggleLoading()
      let createdIcon;
      if (values.icon) {
        createdIcon = await createMedia(values.icon)
      }
      const createdBroadcast = await createBroadcast({
        title: values.title,
        description: values.description || "",
        icon: createdIcon ? createdIcon.id : ""
      })
      setBroadcast(createdBroadcast)
      router.replace(KNOWN_ROUTES.broadcast.view)
    } catch (err) {
      console.log(err)
      alert("Can not create this broadcast. Try again")
    } finally {
      toggleLoading()
    }

  }

  return (
    <FormProvider {...methods}>
      <View style={{...styles.wrapper, marginBottom: insets.bottom}}>
        <View style={styles.content}>
          <View style={styles.infoFields}>
            <IconField />
            <View style={{ flex: 1 }}>
              <TitleField />
            </View>
          </View>
          <View
            style={{
              paddingHorizontal: sizes.defaultPadding
            }}
          >
            <DescriptionField />
          </View>
        </View>
        <View style={{...styles.footer, borderColor}}>
          <Button
            link
            label="Cancel"
            onPress={() => router.push(KNOWN_ROUTES.tabs.broadcast)}
            disabled={loading}
          />
          <Button
            link
            label="Save"
            disabled={!methods.formState.isValid}
            onPress={methods.handleSubmit(onSubmit)}
            loading={loading}
          />
        </View>
      </View>
    </FormProvider>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  content: {
    flex: 1,
    gap: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: sizes.defaultPadding,
    borderTopWidth: 1,
    height: sizes.defaultToolbar,
    alignItems: "center"
  },
  infoFields: {
    padding: sizes.defaultPadding,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
})
