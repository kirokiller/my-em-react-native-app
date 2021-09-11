import React, { Component } from "react";
import {
    Text,
    View,
    Button,
    EmNavigation,
} from 'em-react-native';
import EmApi from 'em-react-native/lib/EmApi'

export default class Test4 extends Component {
    static navigationOptions = {
        title: "接口调用示例"
    };
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
    }
    render() {
        const { navigation } = this.props;
        return (
            <View>
                <Text>接口支持跨域，则直接调用：</Text>
                <Button title="获取跨域接口数据" onPress={() => {
                    EmApi.axios.post('https://zqfed.18.cn/api/example-cross', {foo: "foo"}).then((response) => {
                        this.setState({
                            data: response.data
                        });
                    }).catch((error) => {
                        console.log('call api error:', error);
                    });
                }} />
                <Text>---------------------------------------</Text>
                <Text>---------------------------------------</Text>
                <Text>在接口不支持跨域的情况下，脚手架通过 em-proxy 模块来帮助开发时接口的调用：（需先 npm run proxy 来启动代理服务）</Text>
                <Button title="通过 em-proxy 获取非跨域接口数据" onPress={() => {
                    EmApi.axios.post('http://localhost:8088/api/example', {bar: "bar"}).then((response) => {
                        this.setState({
                            data: response.data
                        });
                    }).catch((error) => {
                        console.log('call api error:', error);
                    });
                }} />
                <Text>---------------------------------------</Text>
                <Text>---------------------------------------</Text>
                <Text>数据: </Text>
                <Text>{JSON.stringify(this.state.data, false, 2)}</Text>
                <Button title="返回首页" onPress={() => {
                    EmNavigation.goBack(navigation)
                }} />
            </View>
        );
    }
}
