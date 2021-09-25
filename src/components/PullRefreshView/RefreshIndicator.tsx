import React, { Component, PureComponent } from 'react'
import {
  Text,
  StyleSheet,
  View,
  Platform,
  Image,
  StyleProp,
  ViewStyle
} from 'react-native'
import Theme from 'emrn-common/styles/theme'

interface Props {
  style?: StyleProp<ViewStyle>
  height?: number
  indicatorText?: string
}
interface State {}

export default class RefreshIndicator extends Component<Props, State> {
  refScroll: any
  styles: any
  theme: string
  static defaultProps = {
    indicatorText: '数据载入中...',
    height: 44
  }

  constructor(props: Props) {
    super(props)
    this.theme = Theme.getTheme()
    this.styles = getCss(this.theme)
  }

  componentDidMount() {}

  render() {
    const { styles, theme } = this
    const { indicatorText, height, style } = this.props
    return (
      <View style={[styles.container, style, { height }]}>
        <Image
          style={styles.logo}
          source={
            this.theme === 'b' ? require('./logo-b.png') : require('./logo.png')
          }
          fadeDuration={0}
          resizeMode="stretch"
        />
        <Text style={styles.text}>{indicatorText}</Text>
      </View>
    )
  }
}

function getCss(theme: string) {
  return StyleSheet.create({
    container: {
      height: 44,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    logo: {
      marginTop: -1,
      marginRight: 8,
      width: 16,
      height: 19
    },
    text: {
      fontSize: 13,
      lineHeight: 18.5,
      color: Theme.getValue('$color17_5')
    }
  })
}
