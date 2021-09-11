import React, { PureComponent } from 'react'
import {
  StyleSheet,
  View,
  Image,
  TouchableWithoutFeedback,
  NativeModules
} from 'react-native'
import { withNavigation } from 'react-navigation'
import rpx from '../utils/rpx.js'
import NavigationService from '../NavigationService'
import isIPad from '../utils/isIPad'
import { Container } from '../utils/hybrid'

class HeaderLeft extends PureComponent {
  goBack = () => {
    try {
      if (
        NavigationService.getTopLevelNavigator().state.nav.routes.length === 1
      ) {
        Container.close()
      } else {
        this.props.navigation.goBack()
      }
    } catch (e) {
      this.props.navigation.goBack()
    }
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => {
          this.goBack()
        }}
      >
        <View style={styles.titleBox}>
          {this.props.theme == 'w' ? (
            <Image
              style={styles.titleBack}
              source={require('../images/back-w.png')}
            />
          ) : (
            <Image
              style={styles.titleBack}
              source={require('../images/back.png')}
            />
          )}
        </View>
      </TouchableWithoutFeedback>
    )
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
  },
  titleBack: {
    width: 44.5,
    height: 27
  },
  titleClose: {
    color: '#fff',
    fontSize: rpx(32),
    marginLeft: rpx(24)
  }
})

export default withNavigation(HeaderLeft)
