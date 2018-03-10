import React, { Component } from 'react';
import { Text, StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class BroadList extends Component {

    //设置顶部导航栏的内容
    static navigationOptions = ({navigation, screenProps}) => ({
        //左侧标题
        headerTitle: '广场'
    });

    render() {
        return (

            <Text>Hello world!</Text>
        );
    }
}
