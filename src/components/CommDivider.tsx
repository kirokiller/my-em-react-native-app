import React, { Component } from 'react'
import { View, StyleSheet } from 'react-native'
import Theme from 'emrn-common/styles/theme'

interface Props {
  theme?: string
  direction?: 'X' | 'Y'
  // 高度
  height?: number
  marginLR?: number
  color?: string
}

//分割线
export default class CommDivider extends Component<Props> {
  theme: string
  height: number
  marginLR: number
  color: string
  constructor(props: Props) {
    super(props)
    this.theme = this.props.theme ?? Theme.getTheme()
    this.height = this.props.height ?? StyleSheet.hairlineWidth
    this.marginLR = this.props.marginLR ?? 0
    this.color = this.props.color ?? Theme.getValue('$color10', this.theme)
  }

  render() {
    let styles = getCss(this.theme, this.height, this.marginLR, this.color)
    let vertical = this.props.direction == 'Y'
    return <View style={vertical ? styles.yBorder : styles.xBorder} />
  }
}

function getCss(
  theme: string,
  height: number,
  marginLR: number,
  color: string
) {
  return StyleSheet.create({
    xBorder: {
      height: height,
      alignSelf: 'stretch',
      backgroundColor: color,
      marginLeft: marginLR,
      marginRight: marginLR
    },
    yBorder: {
      width: height,
      alignSelf: 'stretch',
      backgroundColor: color,
      marginTop: marginLR,
      marginBottom: marginLR
    }
  })
}
