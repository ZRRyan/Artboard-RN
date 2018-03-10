import React, { Component } from 'react';
import { Text } from 'react-native';

export default class Me extends Component {
    //设置顶部导航栏的内容
    static navigationOptions = ({navigation, screenProps}) => ({
        //左侧标题
        header: null
    });

    render() {
        return (
            <Text>Hello world!</Text>
        );
    }
}