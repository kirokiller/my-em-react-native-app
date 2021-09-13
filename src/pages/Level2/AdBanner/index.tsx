import React, { Component } from 'react'
import { Image, Text, View, StyleSheet } from 'react-native'
import Theme from 'emrn-common/styles/theme'

interface Props {

}

interface State {

}


export default class AdBanner extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {

    }
  }
  render() {
    return (
      <View>
        <Image
          source={Theme.getValue("$adImg")}
          style={styles.adImg}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  adImg: {
    resizeMode: 'stretch',
  }
})
