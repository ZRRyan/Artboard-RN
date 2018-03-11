import React, { Component } from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import BroadcastHeaderTab from '../components/BroadcastHeaderTab'

export default class Broadcast extends Component {

    //设置顶部导航栏的内容
    static navigationOptions = ({navigation, screenProps}) => ({
        //左侧标题
        // headerTitle: '广场'
        header: null
    });

    constructor(props) {
        super(props);
        this.state = {
            budge: 0
        };
    }


    titleBtnClick(budge) {
        this.setState({
            budge: budge
        })
    }

    render() {

        return (
            <View>
                <BroadcastHeaderTab callback={(budge) => {this.titleBtnClick(budge)}}></BroadcastHeaderTab>
            </View>
        );
    }
}



