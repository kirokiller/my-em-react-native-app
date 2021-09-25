import React, { Component } from "react";
import {
  Text,
  View,
  Button,
  Image,
  EmNavigation,
} from 'em-react-native';
import EmChart from 'em-react-native/components/EmChart'

interface Porps {
  navigation: any
}

export default class Test2 extends Component<Porps> {
  static navigationOptions = {
    headerTitle: '测试页面二 - 图表'
  };

  _onPress = (data: any) => {
    console.log("🚀 ~ file: Test2.tsx ~ line 21 ~ Test2 ~ data", data)
  }
  render() {
    const { navigation } = this.props;
    const option = {
      title: {
        text: '这是图表标题',
        textStyle: {
          color: 'red',
          fontSize: 16
        },
        left: 20,
        top: 20,
        show: true
      },
      tooltip: {},
      legend: {
        data: ['销量数据图']
      },
      xAxis: {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
      },
      yAxis: {},
      series: [{
        name: '销量数据图',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }]
    };


    return (
      <View>
        <Text>测试页面二 - Echarts</Text>
        <EmChart option={option} height={300} onPress={this._onPress} />
        <Button title="返回首页" onPress={() => {
          EmNavigation.goBack(navigation)
        }} />
      </View>
    );
  }
}
