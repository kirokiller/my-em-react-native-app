import React, { Component } from 'react'
import { View, ScrollView, StyleProp, ViewStyle, Animated } from 'react-native'
import RefreshIndicator from './RefreshIndicator'
import { IndicatorText } from './constants'

interface Props {
  style?: StyleProp<ViewStyle>
  inStyle?: StyleProp<ViewStyle>
  refreshEnabled?: boolean
  autoRefresh: boolean // 首次挂载是否自动刷新
  refreshFunc?: () => void
  onSuccess?: (data: any) => void
  onFail?: (error: any) => void
  indicatorText: string
}
interface State {
  translateY: Animated.Value
  indicatorText: string
}

const indicatorHeight = 44

export default class PullRefreshView extends Component<Props, State> {
  refScroll: any
  isRefreshing = false
  static defaultProps = {
    autoRefresh: true,
    refreshEnabled: false,
    indicatorText: '数据载入中...'
  }

  constructor(props: Props) {
    super(props)
    this.state = {
      translateY: new Animated.Value(-indicatorHeight),
      indicatorText: props.indicatorText || IndicatorText.pulling
    }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.indicatorText != this.props.indicatorText) {
      this.setState({
        indicatorText: nextProps.indicatorText || IndicatorText.pulling
      })
    }
  }

  componentDidMount() {
    const { autoRefresh } = this.props
    if (autoRefresh) {
      setTimeout(() => {
        this.refresh()
      }, 0)
    }
  }

  // 暴露出去的刷新方法
  refresh() {
    if (this.isRefreshing) return
    this.isRefreshing = true
    this.scrollToRefreshIndicator(this.callRefreshFunc)
  }

  // 暴露出去的完成刷新方法
  finishRefresh() {
    setTimeout(() => {
      this.resetRefreshIndicator()
      this.isRefreshing = false
    }, 1000)
  }

  callRefreshFunc = async () => {
    const { refreshFunc, onSuccess, onFail } = this.props
    if (!refreshFunc) return // 如果没有传refreshFunc，则需手动调finishRefresh
    try {
      const res = await refreshFunc()
      onSuccess && onSuccess(res)
    } catch (e) {
      onFail && onFail(e)
    } finally {
      this.finishRefresh()
    }
  }

  scrollToRefreshIndicator(callback: any) {
    const { refreshEnabled } = this.props
    if (refreshEnabled) {
      this.refScroll &&
        this.refScroll.scrollTo({
          x: 0,
          y: 0,
          animated: true
        })
    } else {
      Animated.timing(this.state.translateY, {
        toValue: 0,
        useNativeDriver: true,
        duration: 250
      }).start(callback)
    }
  }

  resetRefreshIndicator(animated = true) {
    const { refreshEnabled } = this.props
    if (refreshEnabled) {
      this.refScroll &&
        this.refScroll.scrollTo({
          x: 0,
          y: indicatorHeight,
          animated
        })
    } else {
      Animated.timing(this.state.translateY, {
        toValue: -indicatorHeight,
        useNativeDriver: true,
        duration: 250
      }).start()
    }
  }

  setIndicatorText(indicatorText: IndicatorText) {
    this.setState({
      indicatorText
    })
  }

  onScroll = ({ nativeEvent }: { nativeEvent: any }) => {
    if (nativeEvent.contentOffset.y <= 0) {
      this.setIndicatorText(IndicatorText.release)
    } else {
      this.setIndicatorText(IndicatorText.pulling)
    }
  }

  onScrollEndDrag = ({ nativeEvent }: { nativeEvent: any }) => {
    const y = nativeEvent.contentOffset.y
    if (y <= 5) {
      this.setIndicatorText(IndicatorText.refresh)
      this.callRefreshFunc()
    } else if (y > 0 && y <= indicatorHeight) {
      this.resetRefreshIndicator()
    }
  }

  render() {
    const { refreshEnabled } = this.props
    const { translateY, indicatorText } = this.state
    return refreshEnabled ? (
      <ScrollView
        {...this.props}
        scrollEventThrottle={1}
        onScroll={this.onScroll}
        onScrollEndDrag={this.onScrollEndDrag}
        ref={ref => (this.refScroll = ref)}
      >
        <RefreshIndicator
          height={indicatorHeight}
          indicatorText={indicatorText}
        />
        <View>{this.props.children}</View>
      </ScrollView>
    ) : (
      <View style={{ backgroundColor: 'transparent', overflow: 'hidden' }}>
        <Animated.View style={{ transform: [{ translateY: translateY }] }}>
          <RefreshIndicator
            height={indicatorHeight}
            indicatorText={indicatorText}
            style={this.props.inStyle}
          />
          <View>{this.props.children}</View>
        </Animated.View>
      </View>
    )
  }
}
