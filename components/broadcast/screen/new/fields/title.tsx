import useColors from "@/hooks/useColors"
import useMD3Theme from "@/hooks/useMD3Theme"
import React from 'react'
import { Controller, useFormContext } from "react-hook-form"
import { StyleSheet } from "react-native"
import { TextField } from "react-native-ui-lib"

export default function TitleField() {
  const theme = useMD3Theme()
  const colors = useColors()
  const form = useFormContext()
  return (
    <Controller
      control={form.control}
      rules={{
        required: true,
      }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextField
          placeholder="Broadcast name"
          style={styles.input}
          color={colors.text}
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          autoFocus
          fieldStyle={
            {
              ...styles.field,
              borderColor: theme.colors.backdrop
            }
          }
        />
      )}
      name="title"
    />
  )
}

const styles =StyleSheet.create({
  input: {
  },
  field: {
    borderBottomWidth: 1,
    paddingVertical: 4
  }
})
