import useBorderColor from "@/hooks/useBorderColor";
import { zodResolver } from "@hookform/resolvers/zod";
import { PropsWithChildren, useState } from "react";
import {
  Controller,
  FormProvider,
  useForm,
  UseFormReturn,
} from "react-hook-form";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { z } from "zod";
import GalleryField from "./media/gallery";
import MediaPreview from "./media/preview";
import { formSchema } from "./schema";
import { IAssetResult } from "@/utils/file";
import { sizes } from "@/utils/spacing";
import { TouchableOpacity } from "react-native-ui-lib/src/incubator";
import useMD3Theme from "@/hooks/useMD3Theme";
import { Ionicons } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-gesture-handler";

type formType = z.infer<typeof formSchema>;

export interface PropsWithForm {
  form: UseFormReturn<formType>;
}

function EditorWrapper({ children }: PropsWithChildren) {
  return (
    <KeyboardAvoidingView enabled behavior="height">
      {children}
    </KeyboardAvoidingView>
  );
}

export type TMessageSent = {
  id: string;
  content: string;
  media: IAssetResult[];
};

export default function MessageEditor({
  onSend,
}: {
  onSend: (message: TMessageSent) => Promise<any>;
}) {
  const [loading, setLoading] = useState(false);
  const form = useForm<formType>({
    resolver: zodResolver(formSchema),
  });

  const borderColor = useBorderColor();
  const theme = useMD3Theme();

  async function onSubmit(values: formType) {
    const messageItem = {
      id: String(Math.random()),
      content: values.content || "",
      media: values.media || [],
    };
    try {
      onSend(messageItem).then(() => {
        form.setValue("content", "", { shouldValidate: true });
        form.setValue("media", void null, { shouldValidate: true });
      });
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  }

  const inputStyles = {
    ...styles.input,
    color: theme.colors.onSurface,
    backgroundColor: theme.colors.surface,
    borderColor,
  };

  const isDisabled = !form.formState.isValid;

  return (
    <FormProvider {...form}>
      <EditorWrapper>
        <MediaPreview />
        <View style={styles.inputWrapper}>
          <GalleryField />
          <Controller
            control={form.control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                style={inputStyles}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                placeholder="Start typing..."
                placeholderTextColor={theme.colors.onSurfaceVariant}
                readOnly={loading}
                multiline
              />
            )}
            name="content"
          />
          <TouchableOpacity
            onPress={form.handleSubmit(onSubmit)}
            disabled={isDisabled}
          >
            <Ionicons
              name="send"
              size={sizes.defaultSizes.xLarge}
              color={isDisabled ? theme.colors.backdrop : theme.colors.primary}
            />
          </TouchableOpacity>
        </View>
      </EditorWrapper>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  wrapper: {},
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    gap: sizes.defaultSizes.small,
  },
  input: {
    flex: 1,
    paddingHorizontal: sizes.defaultPadding,
    paddingVertical: sizes.defaultPadding / 2,
    paddingTop: sizes.defaultPadding / 2,
    borderWidth: 1,
    borderRadius: sizes.defaultBorderRadiuses.large,
  },
});
