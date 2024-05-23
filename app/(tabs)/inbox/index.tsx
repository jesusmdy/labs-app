import { StyleSheet } from 'react-native';

import { View } from '@/components/Themed';
import ChatList from "@/components/tabs/inbox/chat/list";
import InboxHandler from "@/components/tabs/inbox/handler";
import InboxHeader from "@/components/tabs/inbox/header";

export default function InboxTabScreen() {
  return (
    <InboxHandler>
      <View style={styles.container}>
        <InboxHeader />
        <ChatList />
      </View>
    </InboxHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent"
  },
});
