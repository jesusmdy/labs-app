import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import LoginForm from "@/components/identify/login/form";

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
