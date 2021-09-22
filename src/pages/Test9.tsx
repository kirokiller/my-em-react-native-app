/**
 * emrn-common components组件库测试
 * 
 */
import React, { Component } from 'react'
import { Button, Text, View, Animated, StyleSheet, ScrollView } from 'react-native'
import EmSwitch from 'emrn-common/components/EmSwitch'
import EmActionSheet from 'emrn-common/components/EmActionSheet'
import ParallaxScrollView from 'emrn-common/components/ParallaxScrollView'
import StickTable from 'emrn-common/components/StickyTable'
import StickHeader from 'emrn-common/components/StickyHeader'
import { SafeAreaView } from 'react-navigation'
import { rpx } from 'emrn-common'

interface Props {

}

interface State {
  switchValue: boolean
}

export default class Test10 extends Component<Props, State> {
  scrollAnimatedValue: Animated.Value
  constructor(props: Props) {
    super(props)
    this.state = {
      switchValue: false,
    }
    this.scrollAnimatedValue = new Animated.Value(0)
  }

  onChangeSwitch = () => {
    // EmSwitch
    // switchStyle: { warpStyle,bgStyle,circleStyle }
    // 通过warpStyle,bgStyle,circleStyle 调整大小、颜色（动画位移宽度固定，不支持宽设置）
    // 两个动画效果（1:背景Opacity 0->1   2:circle从左到右位移）
    this.setState({
      switchValue: !this.state.switchValue
    })
  }

  showActionSheet = () => {
    // 不支持自定义样式==, 非ScrollView不支持滚动多数据显示
    // 组件声明文件定义错误selectValue, 应为selectedValue
    const options = {
      title: 'myTitle',
      items: [
        { text: 'text1', value: '1' },
        { text: 'text1', value: '2' },
        { text: 'text1', value: '3' },
        { text: 'text1', value: '4' },
        { text: 'text1', value: '5' },
      ],
      selectValue: '1',
      onSelect: (value: any, item: any, index: number) => {
        console.log(value, item, index)
      }
    }
    EmActionSheet(options)
  }

  render() {
    const { switchValue } = this.state;
    return (
      <SafeAreaView style={sytles.container}>
        <Animated.ScrollView
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: this.scrollAnimatedValue } } }],
            { useNativeDriver: true }
          )}
        >
          <View style={{ marginVertical: rpx(12), alignItems: 'center' }}>
            <EmSwitch
              value={switchValue}
              onValueChange={this.onChangeSwitch}
            />
          </View>
          <Button title="show AcionSheet" onPress={this.showActionSheet} />
          <View style={sytles.fillContent}></View>
        </Animated.ScrollView>
      </SafeAreaView>
    )
  }
}

const sytles = StyleSheet.create({
  container: {
    flex: 1
  },
  fillContent: {
    height: 900,
    backgroundColor: 'yellow'
  }
})
