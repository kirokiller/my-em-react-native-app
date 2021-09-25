/**
 * RN核心组件测试
 */
import { Theme } from 'emrn-common'
import { rpx } from 'emrn-common'
import React, { Component } from 'react'
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  RefreshControl,
  Alert,
} from 'react-native'
import { ScrollView } from 'react-navigation'
import CommDivider from '../../components/CommDivider'
import { singlePx } from '../../utils'
import TabsPage from './TabsPage'
import ShowdownCard from './ShowdownCard'

interface Props {

}

interface State {
  inputValue1: string,
  inputValue2: string,
  refreshing: boolean,
}

export default class Tesst8 extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      inputValue1: '',
      inputValue2: '',
      refreshing: false,
    }
  }

  _onPressWitHitSlop = () => {

    console.log('onPress')

    // hitSlop: Insets;
    // interface Insets {
    //   top?: number;
    //   left?: number;
    //   bottom?: number;
    //   right?: number;
    // }

    // 示例中将该属性设置在TouchableOpacity中时出现,
    // 在仅设置hitSlop的top、bottom的情况下出现点击闪一下，并且不能触发onPress事件?


    // 关于RN中的触摸事件捕获机制 “冒泡” 和 “下沉” 两个方向的事件处理
    // 了解相关RN中触摸事件API

    // 现象：被TouchableOpacity包裹的View组件无法响应onMoveShouldSetResponder、onResponderGrant，独立View组件则可以响应
    // 猜想：TouchableOpacity实际上就是onStartShouldSetResponderCapture做了事件拦截捕获?


    // 关于View布局 // 不要在一个设置高度的View中去设置一个大于它的高度的子View（尝试设置了backgroundColor | 布局样式， 在ios和android上的表现效果还不尽相同）
    // 疑问：View嵌套布局，设置container 的height对内部View无法约束其高度? padding却能够生效, 下面的兄弟View布局出现在container真实高度下面
    // 解决：参考collapsable属性 【Android】(IOS?)
    // 如果一个 View 只用于布局它的子组件，则它可能会为了优化而从原生布局树中移除。 把此属性设为 false 可以禁用这个优化，以确保对应视图在原生结构中存在。
  }

  _onChangeText1: (text: string) => void = text => {
    this.setState({
      inputValue1: text
    })
  }

  _renderTabPage = () => {
    /**
     * react native 奇葩的样式覆盖规则
     * borderColor 样式覆盖规则（需要用到样式覆盖的样式属性尽量拆开来写）
     */
    return <TabsPage />
  }

  _renderShowdownCard = () => {
    /**
     * 阴影样式兼容性测试
     */
    return (
      <View style={{ marginHorizontal: rpx(24) }}>
        <ShowdownCard />
      </View>
    )
  }

  _onRefresh = () => {
    this.setState({
      refreshing: true
    })
    setTimeout(() => {
      this.setState({
        refreshing: false
      })
    }, 1000);
  }

  render() {
    const { refreshing } = this.state
    return (
      <View>
        <View style={[styles.touchContainer]}>
          <TouchableOpacity
            hitSlop={{ top: 10, bottom: 200, left: 0, right: 0 }}
            onPress={this._onPressWitHitSlop}
          >
            <View
              style={[styles.row, styles.pinkBg, { height: 50 }]}
              hitSlop={{ top: 10, bottom: 200, left: 0, right: 0 }}
              onMoveShouldSetResponder={(e) => {
                console.log('onMoveShouldSetResponder')
                return true
              }}
              onResponderGrant={e => {
                console.log('onResponderGrant')
              }}
            >
              <Text>hitSlop</Text>
            </View>
          </TouchableOpacity>
        </View>
        {this._renderTabPage()}
        {this._renderShowdownCard()}
        <CommDivider />
        <View style={{ marginTop: rpx(50) }}>
          <Text>下面的元素</Text>
        </View>
        <TextInput
          style={styles.input}
          clearButtonMode="always" // ios
          returnKeyType="search" // android | ios
          placeholder="input address"
          // autoFocus={true}
          // maxLength={16}
          underlineColorAndroid="transparent" // android
          // onFocus={() => {}} 
          onChangeText={this._onChangeText1}
          // onChange={({ nativeEvent: { eventCount, target, text } }) => {}}
          onSubmitEditing={() => { }}
        />
        <Text>以下为ScrollView滚动元素</Text>
        <CommDivider />
        <ScrollView
          // keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={this._onRefresh} />
          }
        >
          <View>
            <TextInput
              style={styles.input}
              clearButtonMode="always" // ios
              returnKeyType="search" // android | ios
              placeholder="input name"
              // autoFocus={true}
              // maxLength={16}
              underlineColorAndroid="transparent" // android
              // onFocus={() => {}} 
              onChangeText={() => { }}
              // onChange={({ nativeEvent: { eventCount, target, text } }) => {}}
              onSubmitEditing={() => { }}
            />
            <View style={styles.fillContent}>
              <Text>ScrollContent</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  touchContainer: {
    height: 100,
    // backgroundColor: 'blue',
    paddingVertical: 10,
  },
  row: {
    alignItems: 'center'
  },
  pinkBg: {
    backgroundColor: 'pink'
  },
  fillContent: {
    height: 981,
    backgroundColor: 'pink'
  },
  input: {
    height: rpx(60),
    marginHorizontal: rpx(30),
    marginVertical: rpx(30),
    paddingHorizontal: rpx(20),
    paddingVertical: rpx(0),
    borderRadius: rpx(30),
    // borderWidth: rpx(1),
    borderWidth: singlePx(),
    backgroundColor: Theme.getValue('$color6'),
    // borderColor: Theme.getValue('$color6'),
    borderColor: 'red',

  },
})
