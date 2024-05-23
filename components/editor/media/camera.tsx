import React from 'react'
import { IconButton } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"
import * as ImagePicker from 'expo-image-picker';

export default function CameraField() {
  async function handleGalleryCamera() {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 10,
    });
    console.log(result)
  }
  return (
    <IconButton
      size={20}
      onPress={handleGalleryCamera}
      mode="contained"
      disabled
      icon={
        ({size, color}) => (
          <Ionicons size={size} color={color} name="camera" />
        )
      }
    />
  )
}