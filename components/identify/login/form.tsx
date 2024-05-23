import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import { Button, Snackbar, Text, TextInput } from "react-native-paper";
import { Controller, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { authWithPassword } from "@/utils/queries/user";
import { useState } from "react";
import { useRouter } from "expo-router";
import { KNOWN_ROUTES } from "@/utils/routes";

const formSchema = z.object({
  emailOrUsername: z.string().email(),
  password: z.string().min(8)
})

type TFormSchemeType = z.infer<typeof formSchema>

export default function LoginForm() {
  const [showError, setShowError] = useState(false)
  const router = useRouter()
  const form = useForm<TFormSchemeType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailOrUsername: "",
      password: ""
    }
  })

  const onSubmit = (values: TFormSchemeType) => {
    authWithPassword(values)
    .then(res => {
      router.replace(KNOWN_ROUTES.tabs.inbox)
    })
    .catch(e => {
      console.log(e)
      setShowError(true)
      setTimeout(
        () => setShowError(false),
        2000
      )
    })
    
  }

  return (
    <FormProvider {...form}>
      <View style={styles.box}>
        <Text style={styles.title}>Sign In</Text>
        <View style={styles.fields}>
          <Controller
            control={form.control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                mode="outlined"
                dense
                placeholder="Your email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
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
                mode="outlined"
                dense
                placeholder="Your password"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="visible-password"
              />
            )}
            name="password"
          />
        </View>
        <View style={styles.actions}>
          <Button
            mode="outlined"
            onPress={form.handleSubmit(onSubmit)}
            disabled={!form.formState.isValid}
          >
            Continue
          </Button>
        </View>
      </View>
      <Snackbar
        visible={showError}
        onDismiss={() => setShowError(false)}
      >
        <Text>There was an error in your request</Text>
      </Snackbar>
    </FormProvider>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  box: {
    width: "90%",
    margin: "auto",
    gap: 16
  },
  fields: {
    gap: 8
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end"
  }
});
