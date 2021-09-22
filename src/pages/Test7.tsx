/**
 * 滚动文字
 */
import React, { Component } from 'react'
import { Text, View, ScrollView, StyleSheet, Animated, Easing } from 'react-native'
import { getReactContainerWidth } from 'emrn-common/utils/container'
import EmTabs from 'emrn-common/components/EmTabs'
import { LayoutChangeEvent } from 'react-native'

interface Props {

}

interface State {
  tabIndex: number,
  textWidth: number
}
const width = getReactContainerWidth()
const tabs = [{ text: '录播' }, { text: '直播' }]
export default class Test7 extends Component<Props, State> {
  animatedValue: any
  animatedValue2: any
  textWidth: number
  constructor(props: Props) {
    super(props)
    this.state = {
      tabIndex: 0,
      textWidth: 0,
    }
    this.animatedValue = new Animated.Value(0)
    this.animatedValue2 = new Animated.Value(0)
    this.textWidth = 0;
  }

  componentDidMount() {
    console.log('didMount')
  }

  startAnimated = () => {
    Animated.loop(Animated.timing(this.animatedValue, {
      toValue: - (width - 12 * 2) - this.textWidth,
      duration: 6000,
      useNativeDriver: true,
      easing: Easing.linear
    })).start()
  }
  startAnimated2 = () => {
    Animated.loop(Animated.timing(this.animatedValue2, {
      toValue: - (width - 12 * 2) - this.textWidth,
      duration: 6000,
      useNativeDriver: true,
      easing: Easing.linear
    })).start()
  }

  render() {
    console.log('screen width:', width)
    return (
      <View>
        <View style={{ paddingHorizontal: 12 }}>
          <View style={{ backgroundColor: 'pink' }}
            onLayout={({ nativeEvent: { layout: { width } } }) => {
              console.log("🚀 外层View onLayout", width)
            }}
          >
            <ScrollView
              horizontal
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              onLayout={({ nativeEvent: { layout: { width } } }: LayoutChangeEvent) => {
                console.log("🚀 ScrollView onLayout", width)
              }}
              onContentSizeChange={(contentWidth, contentHeight) => {
                console.log("🚀 ScrollView contentWidth", contentWidth)
              }}
            >
              <View style={{ width: width - 12 * 2 }} />
              <Animated.Text
                onLayout={({ nativeEvent: { layout: { width } } }: LayoutChangeEvent) => {
                  console.log("🚀 内层 Animated.Text onLayout", width)
                  this.textWidth = width
                  this.startAnimated()
                }}
                style={

                  [{
                    transform: [{ translateX: this.animatedValue }]
                  }]
                }
                numberOfLines={1}
              >
                11111111111222222
              </Animated.Text>
            </ScrollView>
          </View>
        </View>
        {/* <View style={{ paddingHorizontal: 12 }}>
          <View style={{ backgroundColor: 'pink', flexDirection: 'row' }}>
            <View style={{ width: width - 12 * 2 }} />
            <Animated.Text
              onLayout={({ nativeEvent: { layout: { width } } }: LayoutChangeEvent) => {
                console.log("🚀 内层 Animated.Text onLayout", width)
                this.textWidth = width
                this.startAnimated2()
              }}
              style={
                [{
                  transform: [{ translateX: this.animatedValue }]
                }]
              }
              numberOfLines={1}
            >
              11111111111222222333333333333334444444444444444455555555555555666666666666666
            </Animated.Text>
          </View>
        </View> */}
        <EmTabs tabs={tabs} onChange={(index) => {
          this.setState({
            tabIndex: index
          })
        }} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  padding: {
    width,
  },
  text: {
    position: 'absolute'
  }
})


