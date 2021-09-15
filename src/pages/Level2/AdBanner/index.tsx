import React, { Component } from 'react'
import { Image, View, StyleSheet } from 'react-native'
import Theme from 'emrn-common/styles/theme'
import rpx from "emrn-common/utils/rpx";

interface Props {

}

interface State {

}


export default class AdBanner extends Component<Props, State> {
  styles: any
  constructor(props: Props) {
    super(props)
    this.state = {

    }
    this.styles = getCss()
  }
  render() {
    const { styles } = this;
    return (
      <View style={styles.container}>
        <Image
          source={Theme.getValue("$adImg")}
          style={styles.adImg}
          resizeMode='stretch'
        />
      </View>
    )
  }
}


function getCss() {
  return StyleSheet.create({
    container: {
      marginBottom: rpx(20),
    },
    adImg: {
      height: rpx(200)
    }
  })
}