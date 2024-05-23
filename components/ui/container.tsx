import { View, StyleSheet } from 'react-native'
import React, { PropsWithChildren } from 'react'

export default function Container({children}: PropsWithChildren) {
  return (
    <View style={style.container}>
      {children}
    </View>
  )
}

const style = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 16
  }
})
