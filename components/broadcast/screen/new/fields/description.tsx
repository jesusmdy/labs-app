import useMD3Theme from "@/hooks/useMD3Theme";
import { Controller, useFormContext } from "react-hook-form"
import { StyleSheet } from "react-native";
import { TextField } from "react-native-ui-lib";

export default function DescriptionField() {
  const form = useFormContext()
  const theme = useMD3Theme()
  return (
    <Controller
      control={form.control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          onChangeText={onChange}
          onBlur={onBlur}
          value={value}
          placeholder="Brief description"
          fieldStyle={
            {
              ...styles.field,
              borderColor: theme.colors.backdrop,
            }
          }
        />
      )}
      name="description"
    />
  )
}

const styles =StyleSheet.create({
  input: {
  },
  field: {
    borderBottomWidth: 1,
    paddingVertical: 4,
  }
})
