import { StyleSheet, TextInput } from "react-native";

import { View } from "@/components/Themed";
import { Snackbar, Text } from "react-native-paper";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authWithPassword } from "@/utils/queries/user";
import { useState } from "react";
import { useRouter } from "expo-router";
import { KNOWN_ROUTES } from "@/utils/routes";
import useBorderColor from "@/hooks/useBorderColor";
import useMD3Theme from "@/hooks/useMD3Theme";
import { Button } from "react-native-ui-lib";
import { CircleDashed } from "lucide-react-native";
import { Ionicons } from "@expo/vector-icons";

const formSchema = z.object({
  emailOrUsername: z.string().email(),
  password: z.string().min(8),
});

type TFormSchemeType = z.infer<typeof formSchema>;

export default function LoginForm() {
  const [showError, setShowError] = useState(false);
  const router = useRouter();
  const borderColor = useBorderColor();
  const theme = useMD3Theme();

  const form = useForm<TFormSchemeType>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (values: TFormSchemeType) => {
    authWithPassword(values)
      .then((res) => {
        router.replace(KNOWN_ROUTES.tabs.broadcast);
      })
      .catch((e) => {
        console.log(e);
        setShowError(true);
        setTimeout(() => setShowError(false), 2000);
      });
  };

  const inputStyle = {
    ...styles.input,
    borderColor,
    color: theme.colors.outline,
  };

  return (
    <FormProvider {...form}>
      <View style={styles.box}>
        <View style={styles.icon}>
          <CircleDashed size={170} color={theme.colors.primaryContainer} />
          <Ionicons
            name={form.formState.isValid ? "chatbubble" : "chatbubble-outline"}
            color={
              form.formState.isValid
                ? theme.colors.primary
                : theme.colors.primaryContainer
            }
            size={90}
            style={styles.innerIcon}
          />
        </View>
        <Text variant="headlineSmall">Continue with your account</Text>
        <View style={styles.fields}>
          <Controller
            control={form.control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Your email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                style={inputStyle}
                placeholderTextColor={theme.colors.outline}
              />
            )}
            name="emailOrUsername"
          />
          <Controller
            control={form.control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                placeholder="Your password"
                onBlur={onBlur}
                onChangeText={onChange}
                autoComplete="password"
                value={value}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                style={inputStyle}
                placeholderTextColor={theme.colors.outline}
              />
            )}
            name="password"
          />
        </View>
        <View style={{ marginTop: 16 }}>
          <Button
            onPress={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isValid}
            label="Continue"
            borderRadius={8}
          />
        </View>
      </View>
      <Snackbar visible={showError} onDismiss={() => setShowError(false)}>
        <Text>There was an error in your request</Text>
      </Snackbar>
    </FormProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  box: {
    width: "90%",
    margin: "auto",
    gap: 16,
  },
  fields: {
    gap: 8,
  },
  input: {
    borderWidth: 2,
    padding: 16,
    borderRadius: 8,
  },
  icon: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 32,
    alignContent: "center",
    position: "relative",
  },
  innerIcon: {
    position: "absolute",
    top: 38,
  },
});
