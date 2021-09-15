import Theme from 'emrn-common/styles/theme'
import rpx from "emrn-common/utils/rpx"
import React, { Component } from 'react'
import { CardData, BtnTexts } from './index';
import { Text, View, StyleSheet, TouchableWithoutFeedback, Image } from 'react-native'


interface Props extends CardData {
  onPress?: (btnText: BtnTexts) => void
}

interface State {

}

export default class Card extends Component<Props> {
  styles: any
  constructor(props: Props) {
    super(props)
    this.state = {

    }
    this.styles = getCss()
  }
  static defaultProps = {
    isBtnDisable: false,
    showTag: false,
    onPress: () => { },
  }

  render() {
    const {
      title,
      desc,
      btnText,
      onPress
    } = this.props;
    const { styles } = this;
    const btnDisable = btnText === BtnTexts.unSuitable || btnText === BtnTexts.received
    const showTag = btnText === BtnTexts.receiveFree;
    return (
      <View style={styles.container}>
        <View style={styles.leftPannel}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.desc}>{desc}</Text>
        </View>
        <TouchableWithoutFeedback
          onPress={() => { onPress && onPress(btnText) }}
          disabled={btnDisable}
        >
          <View style={styles.btn}>
            <Text style={[styles.btnText, btnDisable && styles.disableBtnText]}>{btnText}</Text>
          </View>
        </TouchableWithoutFeedback>
        {showTag && <Image
          style={styles.tag}
          source={Theme.getValue('$yifuhe')}
          resizeMode='stretch'
        />}
      </View>
    )
  }
}
function getCss() {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: rpx(30),
      paddingVertical: rpx(70),
      borderRadius: rpx(14),
      backgroundColor: Theme.getValue('$color40_1'),
      shadowColor: '#000',
      shadowOffset: { width: 1, height: 1 },
      shadowOpacity: 0.5,
      elevation: 2
    },
    leftPannel: {
      flex: 1,
    },
    title: {
      marginBottom: rpx(35),
      fontSize: rpx(30),
      fontWeight: "500",
      color: Theme.getValue('$color15_1'),
    },
    desc: {
      fontSize: rpx(28),
      color: Theme.getValue('$color16'),
    },
    btn: {
      width: rpx(180),
      height: rpx(80),
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: rpx(50),
      backgroundColor: '#fff',
    },
    btnText: {
      fontSize: rpx(28),
      color: Theme.getValue('$color21_1')
    },
    disableBtnText: {
      color: Theme.getValue('$color17')
    },
    tag: {
      position: 'absolute',
      top: rpx(10),
      right: rpx(5),
      width: rpx(80),
      height: rpx(80),
    }
  })
}
