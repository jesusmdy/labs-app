import useMD3Theme from "@/hooks/useMD3Theme";
import { ImageBackground, StyleSheet } from "react-native";
import _ from "lodash";
import IconSelectorButton from "./icon.selector";
import { useFormContext } from "react-hook-form";
import { Fragment } from "react";
import { View } from "react-native-ui-lib";

export default function IconField() {
  const theme = useMD3Theme()
  const {watch} = useFormContext()
  const icon = watch("icon")

  return (
    <Fragment>
      {
        icon
          ? (
            <ImageBackground
              imageStyle={styles.imageStyles}
              source={{uri: icon.uri}}
              style={styles.iconField}
            >
              <IconSelectorButton />
            </ImageBackground>
          )
          : (
            <View
              style={styles.iconField}
              backgroundColor={theme.colors.primaryContainer}
            >
              <IconSelectorButton />
            </View>
          )
      }
    </Fragment>
  )
}

const styles = StyleSheet.create({
  iconField: {
    width: 50,
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  imageStyles: {
    borderRadius: 8
  }
})
