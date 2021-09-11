import React, { PureComponent } from 'react'
import { StyleSheet, View } from 'react-native'
import { withNavigation } from 'react-navigation'
import rpx from '../utils/rpx.js'
import isIPad from '../utils/isIPad'
class HeaderRight extends PureComponent {
  render() {
    return <View style={styles.titleBox} />
  }
}

const styles = StyleSheet.create({
  titleBox: {
    width: rpx(280),
    height: isIPad ? 30 : 44,
    transform: [{ translateY: isIPad ? -10 : 0 }],
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    paddingLeft: rpx(24)
  }
})

export default withNavigation(HeaderRight)
