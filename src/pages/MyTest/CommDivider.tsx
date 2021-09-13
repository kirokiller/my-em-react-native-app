import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Theme from 'emrn-common/styles/theme'

interface Props {
  height?: number
  color?: string
}

export default class CommDivider extends Component<Props> {
  theme: string
  constructor(props: Props) {
    super(props)
    this.state = {

    }
    this.theme = Theme.getTheme();
  }
  static defaultProps = {
    height: StyleSheet.hairlineWidth,
  }
  render() {
    return (
      <View />
    )
  }
}
