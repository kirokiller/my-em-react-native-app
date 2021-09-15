import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Theme from 'emrn-common/styles/theme'
import rpx from "emrn-common/utils/rpx";

interface Props {
  title: string
}

interface State {

}

export default class CommSection extends Component<Props, State> {
  styles: any
  constructor(props: Props) {
    super(props)
    this.state = {

    }
    this.styles = getCss()
  }
  render() {
    const { title } = this.props;
    const { styles } = this;
    return (
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.titleText}>{title}</Text>
        </View>
        {this.props.children}
      </View>
    )
  }
}

function getCss() {
  return StyleSheet.create({
    container: {
      marginBottom: rpx(20),
      paddingHorizontal: rpx(15),
      paddingVertical: rpx(30),
      backgroundColor: Theme.getValue("$color5"),
    },
    titleContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: rpx(30),
    },
    titleText: {
      fontSize: rpx(32),
      fontWeight: "500",
      color: Theme.getValue('$color15_1'),
    }
  })
}
