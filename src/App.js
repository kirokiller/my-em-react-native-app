import React, { Component } from 'react'
import { Easing, Animated, EmNavigation, YellowBox } from 'em-react-native'

import HeaderLeft from "emrn-common/components/EmTitleLeft";
import HeaderRight from "emrn-common/components/EmTitleRight";
import isIPad from 'emrn-common/utils/isIPad'
import rpx from 'emrn-common/utils/rpx'
import NavigationService from 'emrn-common/navigation/NavigationService'
import 'emrn-common/settings/Text'
import Theme from 'emrn-common/styles/theme'
import routes from './routes'

import customTheme from './styles/theme'


YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader',
  'Class RCTCxxModule',
  'VirtualizedList',
  'Warning: Each',
  'Remote debugger'
])

let MainStack = null
Theme.extend(customTheme)

class App extends Component {
  constructor(props) {
    super(props)
    const theme = props.theme || 'w'
    Theme.setTheme(theme);
    MainStack = EmNavigation.createEmNavigator(routes, {
      initialRouteName: props.page || 'Level2', //可以通过启动参数设置默认首页
      defaultNavigationOptions: {
        headerStyle: {
          backgroundColor: theme == 'w' ? '#ea5504' : '#1c1c1c',
          height: isIPad ? 30 : 44,
          borderBottomWidth: 0,
          elevation: 0
        },
        headerTitleStyle: {
          height: rpx(46),
          lineHeight: rpx(46),
          fontSize: rpx(32),
          fontWeight: 'bold',
          color: '#fff',
          flex: 1,
          fontFamily: 'PingFang SC',
          textAlign: 'center',
          transform: [{ translateY: isIPad ? -10 : 0 }]
        },
        headerTitleAllowFontScaling: true,
        headerLeft: <HeaderLeft theme={theme} />,
        headerRight: <HeaderRight theme={theme} />,
        headerTitleContainerStyle: {
          flex: 1
        },
        headerLeftContainerStyle: {},
        headerRightContainerStyle: {}
      },
      transitionConfig: () => ({
        transitionSpec: {
          duration: 350,
          easing: Easing.out(Easing.poly(4)),
          timing: Animated.timing
        },
        screenInterpolator: (sceneProps) => {
          const { layout, position, scene } = sceneProps
          const { index } = scene
          const width = layout.initWidth
          const translateX = position.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [width, 0, 0]
          })
          const opacity = position.interpolate({
            inputRange: [index - 1, index - 0.99, index],
            outputRange: [0, 1, 1]
          })
          return { opacity, transform: [{ translateX }] }
        }
      })
    })
  }

  componentWillUnmount () {
    NavigationService.removeTopLevelNavigator()
  }

  render () {
    return (
      <MainStack
        ref={(navigatorRef) => {
          NavigationService.setTopLevelNavigator(navigatorRef)
        }}
      />
    )
  }
}

export default App
