import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  EmNavigation,
  Platform
} from 'em-react-native';

export default class Test3 extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `参数：${navigation.getParam("name")}`
  });
  render() {
    const { navigation } = this.props;
    //通过state获取params
    let params = navigation.state.params;
    return (
      <View>
        <Text>带参数的页面内容</Text>
        <Text>带参数的页面内容</Text>
        <Text>带参数的页面内容</Text>
        <Text>参数内容: {JSON.stringify(params)}</Text>
        <Button title="返回首页" onPress={() => {
          EmNavigation.goBack(navigation)
        }} />
      </View>
    );
  }
}
