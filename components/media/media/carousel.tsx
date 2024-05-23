import { View, Text, useWindowDimensions, FlatList } from 'react-native'
import React from 'react'
import { IMedia } from ".."
import PagerView from "react-native-pager-view"
import _ from "lodash"

export default function MediaCarousel(props: IMedia) {
  const {height} = useWindowDimensions()
  return (
    <View
      style={{
        height,
      }}
    >
      <PagerView
        initialPage={0}
        style={{
          flex: 1,
        }}
      >
        {
          _.map(
            props.mediaList,
            (item, index) => (
              <View
                key={index}
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                  borderWidth: 1
                }}
              >
                <Text>{item.file}</Text>
                {/* <MediaViewer {...props} media={item} /> */}
              </View>
            )
          )
        }
      </PagerView>
    </View>
  )
}