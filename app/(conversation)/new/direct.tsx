import { View, StyleSheet } from 'react-native'
import React from 'react'
import NewConversationForm from "@/components/conversation/new/form"
import { Link } from "expo-router"
import { KNOWN_ROUTES } from "@/utils/routes"
import { Button, Card } from "react-native-paper"
import { Ionicons } from "@expo/vector-icons"
import useColors from "@/hooks/useColors"
import useBorderColor from "@/hooks/useBorderColor"

export default function NewConversationScreen() {
  const colors = useColors()
  const borderColor = useBorderColor()
  return (
    <View style={styles.wrapper}>
      <Card mode="outlined" style={{ backgroundColor: colors.background, borderColor}}>
        <Card.Content style={{ paddingVertical: 4, paddingHorizontal: 4 }}>
          <View style={styles.actions}>
            <Link href={KNOWN_ROUTES.conversation.new.group}>
              <Button
                compact
                icon={
                  ({size, color}) => (
                    <Ionicons size={size} color={color} name="people" />
                  )
                }
                style={styles.action}
                mode="text"
              >
                New group
              </Button>
            </Link>
          </View>
          <NewConversationForm />

        </Card.Content>
      </Card>
    </View>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    padding: 16
  },
  actions: {
    margin: 16,
    marginBottom: 0,
  },
  action: {
    borderRadius: 8,
  }
})
