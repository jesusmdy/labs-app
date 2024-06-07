import { useMemo } from "react";
import { StyleSheet, ButtonProps, Button as NativeButton } from "react-native";
import { Button as PaperButton, Text } from "react-native-paper";

interface IButton extends ButtonProps {
  title: string;
  size?: "small" | "medium" | "large";
}

function useSizes(size: IButton["size"]): {
  paddingVertical: number;
  paddingHorizontal: number;
} {
  const sizes = useMemo(() => {
    switch (size) {
      case "small":
        return {
          paddingVertical: 8,
          paddingHorizontal: 4,
        };
      case "medium":
        return {
          paddingVertical: 8,
          paddingHorizontal: 4,
        };
      case "large":
        return {
          paddingVertical: 18,
          paddingHorizontal: 16,
        };
      default:
        return {
          paddingVertical: 8,
          paddingHorizontal: 4,
        };
    }
  }, [size]);
  return sizes;
}

export default function Button(props: IButton) {
  const { title, size = "small" } = props;
  const { paddingVertical, paddingHorizontal } = useSizes(size);

  const buttonStyles = {
    ...styles.button,
    paddingVertical,
    paddingHorizontal,
  };
  return (
    <PaperButton style={buttonStyles} onPress={() => {}}>
      <Text>{title}</Text>
    </PaperButton>
  );
}

const styles = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: "#f00",
  },
});
