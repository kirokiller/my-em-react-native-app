
import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'

interface Props {

}

interface State {
  inputValue1: string,
  inputValue2: string
}

export default class Test10 extends Component<Props> {
  render() {
    return (
      <SafeAreaView
        style={styles.container}
      >
        {/* <ScrollableTabView
          style={{}}
          initialPage={0}
          scrollWithoutAnimation={true}
          renderTabBar={() => <ScrollableTabBar />}
        >
          <Text tabLabel='Tab #1'>Tab #1</Text>
          <Text tabLabel='Tab #2'>Tab #2</Text>
        </ScrollableTabView> */}
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})