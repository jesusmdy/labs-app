import { View, StyleSheet, TextInput, FlatList } from "react-native";
import React, { useEffect, useState } from "react";
import useBorderColor from "@/hooks/useBorderColor";
import useColors from "@/hooks/useColors";
import { useDebounce, useToggle } from "@uidotdev/usehooks";
import { Button, Card } from "react-native-paper";
import { searchPeople } from "@/utils/queries/user";
import { TUser } from "@/types/users";
import UserItem from "@/components/users/list/item";
import { startConversation } from "@/utils/queries/chats";
import { useConversationStoreSelectors } from "@/store/conversation";
import { useRouter } from "expo-router";
import { KNOWN_ROUTES } from "@/utils/routes";
import pb from "@/api";
import { KNOWN_COLLECTIONS } from "@/utils/collections";
import { TChat } from "@/types/chats";

function Input(
  {value, setValue}: {
    value: string,
    setValue: (value: string) => void
  }
) {

  const borderColor = useBorderColor();
  const colors = useColors();
  return (
    <TextInput
      placeholder="Search"
      autoCorrect={false}
      autoComplete="username"
      value={value}
      onChangeText={setValue}
      autoFocus
      style={{
        ...styles.searchInput,
        backgroundColor: colors.background,
        borderColor,
        color: colors.text,
      }}
      placeholderTextColor={colors.text}
    />
  )
}

function StartConversationButton(
  {user}: {
    user: TUser
  }
) {
  const [loading, toggleLoading] = useToggle()
  const setChat = useConversationStoreSelectors().setChat
  const router = useRouter()

  async function handleStartConversation() {
    toggleLoading()
    try {
      const conversation = await startConversation(user.id)
      const expandedConversation = await pb.collection(KNOWN_COLLECTIONS.chats).getOne(
        conversation.id,
        {
          expand: "members, icon"
        }
      )
      setChat(expandedConversation as TChat)
      router.replace(KNOWN_ROUTES.conversation.chat)
    } catch(e) {
       console.log(e)
    } finally {
      toggleLoading()
    }
  }
  return (
    <Button
      compact
      onPress={handleStartConversation}
      loading={loading}
    >
      Start conversation
    </Button>
  )
}

export default function NewConversationForm() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState<TUser[]>([])
  const searchTerm = useDebounce(value, 500)

  function doSearch(search: string) {
    searchPeople(search)
      .then(setResults)
      .catch(console.log)
  }

  useEffect(() => {
    if (searchTerm !== "") {
      doSearch(searchTerm)
    } else {
      setResults([])
    }
  }, [searchTerm]);

  return (
    <View style={styles.wrapper}>
      <Input value={value} setValue={setValue} />
      {
        results.length > 0 && (
          <Card mode="contained">
            <Card.Content>
              <FlatList
                data={results}
                renderItem={
                  ({item}) => (
                    <UserItem
                      user={item}
                      endContent={
                        <StartConversationButton user={item} />
                      }
                    />
                  )
                }
                keyExtractor={(item) => item.id}
              />
            </Card.Content>
          </Card>
        )
      }
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: "92%",
    margin: "auto",
    paddingVertical: 16,
    gap: 16
  },
  searchInput: {
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
});
