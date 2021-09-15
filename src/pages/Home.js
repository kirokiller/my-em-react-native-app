import React, { Component } from 'react'
import {
  Text,
  View,
  Button,
  StyleSheet,
  Platform,
  EmNavLink,
  EmNavigation,
  _Version_,
  injectProps
} from 'em-react-native'
import EmApi from 'em-react-native/lib/EmApi'

const { request } = EmApi
const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
  web: 'Press ctrl + f5 to force reload. \n'
})
const runInfo =
  Platform.OS === 'web'
    ? 'To run on device, run command: npm run android(or ios)'
    : 'To run on browser, run command: npm run web'

export default class Home extends Component {
  static navigationOptions = {
    title: '首页'
  }
  constructor(props) {
    super(props)
    injectProps(props)
    this.state = {
      data: {}
    }
  }
  componentDidMount() {
    //this.getData();
  }
  getData() {
    request({
      url: `http://ceshi.securities.eastmoney.com:7279/test-EmRnApi`
    }).then(res => {
      console.log(res)
      this.setState({
        data: res
      })
    })
  }
  render() {
    const { navigation } = this.props
    let data = this.state.data
    return (
      <View>
        <View style={pageStyle.content}>
          <Text style={pageStyle.contentText}>
            Welcome to Eastmoney React Native!!!!
          </Text>
          <Text style={pageStyle.contentText}>
            em-react-native：{_Version_}
          </Text>
          <Text style={pageStyle.contentText}>
            To get started, edit src/App.js
          </Text>
          <Text style={pageStyle.contentText}>{instructions}</Text>
          <Text style={pageStyle.contentText}>{runInfo}</Text>
        </View>
        <Button
          title="测试页面一（组件跳转）"
          onPress={() => {
            EmNavigation.navigate('Test1', null, navigation)
          }}
        />
        <Button
          title="测试页面二（图表示例）"
          onPress={() => {
            EmNavigation.navigate('Test2', null, navigation)
          }}
        />
        <Button
          title="带参数测试页（组件跳转参数）"
          onPress={() => {
            EmNavigation.navigate('Test3', { name: '张三' }, navigation)
          }}
        />
        <Button
          title="自定义跳转参数"
          onPress={() => {
            EmNavigation.navigate('Test3', { name: '李四' }, navigation)
          }}
        />
        <Button
          title="接口调用（含跨域接口）"
          onPress={() => {
            EmNavigation.navigate('Test4', null, navigation)
          }}
        />
        <Button
          title="与App交互"
          onPress={() => {
            EmNavigation.navigate('Test5', null, navigation)
          }}
        />
      </View>
    )
  }
}

const pageStyle = StyleSheet.create({
  content: {
    height: 200,
    justifyContent: 'center'
  },
  contentText: {
    textAlign: 'center',
    margin: 2,
    color: 'green'
  }
})
