
import { Theme } from 'emrn-common'
import React, { Component } from 'react'
import { Text, View, SafeAreaView, StyleSheet } from 'react-native'
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view'
import LinearGradient from 'react-native-linear-gradient';
import { rpx } from 'emrn-common';
interface Props {

}

export default class Test10 extends Component<Props> {

  render() {
    const min = 0.2;
    const average = 0.5;
    const max = 0.8
    return (
      <SafeAreaView
        style={styles.container}
      >
        <View style={{ height: rpx(100) }} />
        <View style={{}}>
          <View style={[styles.trangle, { top: -rpx(20), left: '0%' }]} />
          <View style={styles.lineBoxWrap}>
            <LinearGradient
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              colors={['#3480E3', '#A06AEA', '#E0451D']}
            >
              <View style={styles.lineBox}></View>
            </LinearGradient>
          </View>
        </View>

      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lineBoxWrap: {
    overflow: "hidden",
    borderRadius: rpx(15),
    marginHorizontal: rpx(30),
  },
  lineBox: {
    height: rpx(30),
  },
  trangle: {
    position: 'absolute',
    width: 0,
    height: 0,
    borderTopWidth: rpx(20),
    borderLeftWidth: rpx(20),
    borderRightWidth: rpx(20),
    borderBottomWidth: rpx(0),
    // borderTopColor: 'blue',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
  }
})