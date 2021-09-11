import React, { Component } from "react";
import { View, Animated, StyleSheet, Easing } from "react-native";
import { rpx } from "emrn-common";
import Theme from 'emrn-common/styles/theme'

interface Props {

}

interface State {

}

export default class MyTest extends Component<Props, State> {
  theme: string
  styles: any
  animatedRorate: Animated.Value
  animatedScrollY: Animated.Value
  refScrollView: any


  constructor(props: Props) {
    super(props)
    this.state = {
    }
    this.theme = Theme.getTheme()
    this.animatedRorate = new Animated.Value(0)
    this.animatedScrollY = new Animated.Value(0)
    this.styles = getCss(this.theme);
  }

  componentDidMount() {
    this.spin()
  }

  spin = () => {
    this.animatedRorate.setValue(0)
    Animated.timing(this.animatedRorate, {
      toValue: 1,
      duration: 4000,
      easing: Easing.linear
    }).start(() => this.spin())
  }

  render() {
    return (
      <View
        style={this.styles.container}
      >
        <Animated.Image
          source={Theme.getValue('$reactIcon', this.theme)}
          style={[
            this.styles.animateImage,
            {
              transform: [{
                rotate: this.animatedRorate.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg']
                })
              }]
            }
          ]}
        />
      </View>
    )
  }
}

function getCss(theme: string) {
  return StyleSheet.create({
    container: {
      flex: 1,
      width: '100%'
    },
    animateImage: {
      position: "absolute",
      marginTop: '50%',
      alignSelf: 'center',
      width: rpx(250),
      height: rpx(250),
    }
  })
}