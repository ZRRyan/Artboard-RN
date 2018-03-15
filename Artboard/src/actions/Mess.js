import React, {Component} from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';


export default class Mess extends Component {

    //设置顶部导航栏的内容
    static navigationOptions = ({navigation, screenProps}) => ({
        //左侧标题
        headerTitle: '聊天'
    });

    render() {
        return (
            <View ></View>
        );
    }
}
