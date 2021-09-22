// 测试多路由组件
import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createBottomTabNavigator } from 'react-navigation'
import Test1 from './Test1';
import Test2 from './Test2';

const AuthenticationNavigator = createBottomTabNavigator({
  SignIn: {
    screen: Test1,
  },
  ForgotPassword: {
    screen: Test2,
  },
});

interface Props {
  navigation: any
}

export default class AuthenticationScreen extends React.Component<Props> {
  static router = AuthenticationNavigator.router;

  render() {
    return (
      <AuthenticationNavigator
        screenProps={{
          parentNvigation: this.props.navigation
        }}
      />
    );
  }
}
