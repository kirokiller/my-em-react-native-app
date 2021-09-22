import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  Image,
  EmNavigation
} from 'em-react-native';

interface Props {
  navigation: any,
  screenProps?: any,
}

export default class Test1 extends Component<Props> {
  static navigationOptions = {
    title: "测试页面一"
  };
  render() {
    const { navigation } = this.props;
    const { screenProps } = this.props;
    console.log("🚀 ~ file: Test1.tsx ~ line 17 ~ Test1 ~ render ~ screenProps", screenProps)
    console.log("🚀 ~ file: Test1.tsx ~ line 16 ~ Test1 ~ render ~ navigation", navigation)
    return (
      <View>
        <Text>测试页面一</Text>
        <Text>测试页面一</Text>
        <Text>测试页面一</Text>
        <Text>显示一张图片</Text>
        <Button title="to Test5" onPress={() => {
          navigation.navigate('Test5')
        }} />
        <Image source={require('../images/test.png')} style={{ width: 100, height: 100 }} />
        <Button title="返回首页" onPress={() => {
          EmNavigation.goBack(navigation)
        }} />
        <Button title="回到最初" onPress={() => {
          screenProps.parentNvigation.goBack();
        }} />
      </View>
    );
  }
}
