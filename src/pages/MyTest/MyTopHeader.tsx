import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Swiper from 'react-native-swiper'
import rpx from 'emrn-common/utils/rpx'
import Theme from 'emrn-common/styles/theme'

interface Props {

}

interface State {

}

export default class MyTopHeader extends Component<Props, State> {
  styles: any

  constructor(props: Props) {
    super(props)
    this.state = {

    }
    this.styles = getCss(Theme.getTheme())
  }

  render() {
    return (
      <View style={this.styles.topHeader}>
        <Swiper
          loop={false}
          autoplay={false}
          height={rpx(380)}
        >
          <View style={this.styles.card}><Text>swiper1</Text></View>
          <View style={this.styles.card}><Text>swiper2</Text></View>
        </Swiper>
      </View>
    )
  }
}

function getCss(theme: string) {
  return StyleSheet.create({
    topHeader: {

    },
    card: {
      flex: 1,
      backgroundColor: 'yellow',
    }
  });
}
