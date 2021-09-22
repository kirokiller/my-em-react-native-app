import { rpx } from 'emrn-common'
import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'


export default class index extends Component {
  render() {
    return (
      <View style={[styles.card]}>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  card: {
    minHeight: rpx(100),
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    elevation: 2
  }
})
