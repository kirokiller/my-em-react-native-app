import React, { Component } from 'react'
import { Text, View, StyleSheet, Image } from 'react-native'
import Theme from 'emrn-common/styles/theme'
import rpx from "emrn-common/utils/rpx";

interface Props {

}

interface State {

}

export default class MyLevel2 extends Component {
  constructor(props: Props) {
    super(props)
    this.state = {

    }
  }

  renderCard() {
    return (
      <View style={styles.card}>
        <View>
          <Text>Card</Text>
        </View>
        <View>
          
        </View>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>我的Level-2</Text>
        </View>
          {this.renderCard()}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Theme.getValue("$color5"),
    paddingHorizontal: rpx(24),
    paddingVertical: rpx(48),
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: rpx(48),
  },
  titleText: {
    fontSize: rpx(32),
    fontWeight: "500",
    color: Theme.getValue('$color15_1'),
  },
  card: {
    borderWidth: rpx(1),
    borderColor: 'red',
    borderRadius: rpx(14),
  }
})

