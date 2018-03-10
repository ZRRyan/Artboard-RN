import React, { Component } from 'react';
import { Text } from 'react-native';

export default class Discover extends Component {

    //设置顶部导航栏的内容
    static navigationOptions = ({navigation, screenProps}) => ({
        //左侧标题
        headerTitle: '发现'
    });

    render() {
        return (
            <Text>Hello world!</Text>
        );
    }
}